/*!
 * jQuery CLI
 * Simulating a command line interface with jQuery
 *
 * @version : 1.0.0
 * @author : Paulo Nunes (http://syndicatefx.com)
 * @demo : https://codepen.io/syndicatefx/pen/jPxXpz
 * @license: MIT
 */

/*!* 
 * jQuery Text Typer plugin
 * https://github.com/gr8pathik/jquery-texttyper
*/

var user = sessionStorage.getItem('user');
var feedFlag;
var lastFeed;
var userLastFeed;
var lastWater;
var userLastWater;
var WaterFlag;
var water;
var feed;
var feedUser = [];
var topFeedUser = [];
var waterUser = [];
var topWaterUser = [];
var whoUserFeed;
var listUserFeed = [];
var listUserWater = [];

function creerRequete() {
  try {
    requete = new XMLHttpRequest();
  } catch (essaimicrosoft) {
    try {
      requete = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (autremicrosoft) {
      try {
        requete = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (echec) {
        requet = null;
      }
    }
  }
  if (requete == null)
    alert("Impossible de créer l'objet requete !");
}

(function (e) { "use strict"; e.fn.textTyper = function (t) { var n = { typingClass: "typing", beforeAnimation: function () { }, afterAnimation: function () { }, speed: 1, nextLineDelay: 400, startsFrom: 0, repeatAnimation: false, repeatDelay: 4e3, repeatTimes: 1, cursorHtml: '<span class="cursor">|</span>' }, r = e.extend({}, n, t); this.each(function () { var t = e(this), n = 1, i = "typingCursor"; var s = t, o = s.length, u = []; while (o--) { u[o] = e.trim(e(s[o]).html()); e(s[o]).html("") } t.init = function (e) { var n = r.beforeAnimation; if (n) n(); t.animate(0) }; t.animate = function (o) { var a = s[o], f = r.typingClass, l = r.startsFrom; e(a).addClass(f); var c = setInterval(function () { var f = r.cursorHtml; f = e("<div>").append(e(f).addClass(i)).html(); e(a).html(u[o].substr(0, l) + f); l++; if (u[o].length < l) { clearInterval(c); o++; if (s[o]) { setTimeout(function () { e(a).html(u[o - 1]); t.animate(o) }, r.nextLineDelay) } else { e(a).find("." + i).remove(); if (r.repeatAnimation && (r.repeatTimes == 0 || n < r.repeatTimes)) { setTimeout(function () { t.animate(0); n++ }, r.repeatDelay) } else { var h = r.afterAnimation; if (h) h() } } } }, r.speed) }; t.init() }); return this } })(jQuery)

// Let's do it!!
$(document).ready(function () {
  $('.command').hide();
  $('input[type="text"]').focus();
  $('#home').addClass('open');
  $('#home').textTyper({
    speed: 1,
    afterAnimation: function () {
      $('.command').fadeIn();
      $('input[class="commandinput"]').val('');

      (async function getUsername() {
        const { value: username } = await Swal({
          title: 'Your username',
          input: 'text',
          allowEscapeKey: false,
          allowOutsideClick: false,
          onOpen: function () {
            $('input[class="swal2-input"]').val(user);
            $('input[class="swal2-input"]').focus();
          },
          onClose: function () {
            getInfo();
            setTimeout(function () { $('.commandinput')[0].focus(); }, 100);
          },
          onBeforeOpen: function () {
            iPhoneInstallOverlay.init({ blurElement: '.body', appIconURL: 'js/iphone-install-overlay/src/images/app.png', spritesURL: 'js/iphone-install-overlay/src/images/mobile-sprite.png', showOnReload: false, appName: 'FeedFish' });
          },
          inputValidator: (value) => {
            if (!value) {
              return 'You need to write something!';
            } else if (value.length > 8) {
              return '10 characters limit';
            }
          }
        })
        sessionStorage.setItem('user', username);
        user = sessionStorage.getItem('user');
      })()

    },
  });

  // get array of section ids, that exist in DOM
  var sectionArray = [];
  // We are using <section> here, you can use <div> or <article> if you want
  $('section').each(function (i, e) {
    //you can use e.id instead of $(e).attr('id')
    sectionArray.push($(e).attr('id'));
  });

  // Debug
  //console.log(sectionArray);

  // Command Input------------------------------

  $('input[type="text"]').keyup(function (e) {

    if (e.which == 13) {// ENTER key pressed

      $('.command').hide();
      var destination = $('input[type="text"]').val();
      destination = destination.toLowerCase();

      if (destination == 'feed' && !feedFlag) {
        addFeed();
      } else if (destination == 'feed') {
        destination = 'alreadyFeed';
      }

      if (destination == 'water' && !waterFlag) {
        addWater();
      } else if (destination == 'water') {
        destination = 'alreadyWater';
      }

      if (destination == 'home')
        getInfo();
        home();

      if (destination == 'topfeed')
        setTop();

      if (destination == 'topwater')
        setTop();

      if (destination == 'listfeed')
        setListFeed();

      if (destination == 'listwater')
        setListWater();

      if (destination.slice(0, 7) == 'whofeed') {
        if (destination.slice(8, 18) == '') {
          destination = 'whofeed';
        } else {
          setWhoFeed(destination.slice(8, 18));
          destination = 'whofeedD'
        }
      }
      if (destination == 'send') {
        var message = $('textarea')[0].value
        if (message != "") {         
          creerRequete();
          var url = "php/sendmail.php?message=" + message + '&user=' + user; ;
          requete.open("POST", url, true);
          requete.send(null);
        } else {
          destination = 'errorsend';
        }
      }

      if (destination == 'cancel') {
        destination = 'home';
      }

      // Display section with id == destination and hide all others
      $('section[id="' + destination + '"]').addClass('open').siblings().removeClass('open');

      // If destination does not match our array of section ids, display error section
      if ($.inArray(destination, sectionArray) == -1) {
        $('#error').addClass('open');
        $('#error').siblings().removeClass('open');
      }

      // All sections with class .open init textTyper
      $('.open').textTyper({
        speed: 1,
        afterAnimation: function () {
          $('.command').fadeIn();
          $('input[type="text"]').focus();
          $('input[type="text"]').val('');
        }
      });

    }// end if ENTER key pressed

  });// end keyup function

  // End Command Input-----------------------------
});

function addFeed() {
  if (!feedFlag) {
    creerRequete();
    date = new Date().toISOString().slice(0, 10).replace('T', ' ');
    var url = "php/addFeed.php?user=" + user + "&date=" + date;
    requete.open("GET", url, false);
    requete.send(null);
  }
}

function addWater() {
  if (!waterFlag) {
    creerRequete();
    date = new Date().toISOString().slice(0, 10).replace('T', ' ');
    var url = "php/addWater.php?user=" + user + "&date=" + date;
    requete.open("GET", url, false);
    requete.send(null);
  }
}

function isFeed() {
  date = new Date().toISOString().slice(0, 10).replace('T', ' ');
  feed = JSON.parse(requete.responseText);
  if (feed[0].date == date) {
    feedFlag = true;
  } else {
    feedFlag = false;
  }
  getFeed()
}

function getIsFeed() {
  creerRequete();
  var url = "php/getFeed.php";
  requete.open("GET", url, false);
  requete.onreadystatechange = isFeed;
  requete.send(null);
}


function getIsWater() {
  if (new Date(date) - new Date(water[0].date) < 2592000000) {
    waterFlag = true;
  } else {
    waterFlag = false;
  }
  home();
}

function getFeed() {
  lastFeed = feed[0].date
  userLastFeed = feed[0].user;
  getWater();
}

function getWater() {
  creerRequete();
  var url = "php/getWater.php";
  requete.open("GET", url, false);
  requete.onreadystatechange = water;
  requete.send(null);
}

function water() {
  water = JSON.parse(requete.responseText);
  lastWater = water[0].date
  userLastWater = water[0].user;
  getIsWater()
}

function home() {
  if (feedFlag) {
    $('mark')[0].innerHTML = 'The fish is not hungry';
  } else {
    $('mark')[0].innerHTML = 'The fish is <red style="color: red;">hungry</red>, please feed me !';
  }
  if (waterFlag) {
    $('mark')[1].innerHTML = 'The water does not need to change it';
  } else {
    $('mark')[1].innerHTML = 'The water is <red style="color: red;">disgusting</red>, please change the water !';
  }
  $('strong')[0].innerHTML = '🍽️The fish was fed the ' + lastFeed + ' by ' + userLastFeed;
  $('strong')[1].innerHTML = '🌊The water was change the ' + lastWater + ' by ' + userLastWater;
}

function getInfo() {
  getIsFeed();
}

function setTop() {

  for (var i in feed) {
    feedUser.push(feed[i].user);
  }

  for (var i in water) {
    waterUser.push(water[i].user);
  }

  topFeedUser = getTop(feedUser);
  topWaterUser = getTop(waterUser);

  $('strong')[6].innerHTML = topFeedUser[0];
  $('strong')[7].innerHTML = topFeedUser[1];
  $('strong')[8].innerHTML = topFeedUser[2];
  $('strong')[9].innerHTML = topFeedUser[3];
  $('strong')[10].innerHTML = topFeedUser[4];

  $('strong')[11].innerHTML = topWaterUser[0];
  $('strong')[12].innerHTML = topWaterUser[1];
  $('strong')[13].innerHTML = topWaterUser[2];
  $('strong')[14].innerHTML = topWaterUser[3];
  $('strong')[15].innerHTML = topWaterUser[4];
}

function getTop(user) {
  var top = [[], []];
  var final = [];
  for (i = 0; i < user.length; i++) {
    var test = false;
    for (j = 0; j <= top[0].length; j++) {
      if (user[i] === top[0][j]) {
        test = true;
      }
    }
    if (!test) {
      top[0].push(user[i]);
      top[1].push(1);
    }
    else {
      top[1][top[0].indexOf(user[i])]++;
    }
  }
  do {
    var cpt = 0;
    var flag = -1;
    for (k = 0; k < top[0].length; k++) {
      if (top[1][k] > cpt) {
        cpt = top[1][k];
        flag = k;
      }
    }
    final.push(top[0][flag]);
    top[0].splice(flag, 1);
    top[1].splice(flag, 1);

  } while (top[0].length > 0);
  return final;
}

function setWhoFeed(date) {
  day = date.slice(0, 2);
  month = date.slice(3, 5)
  year = date.slice(6, 10)
  dbdate = year + '-' + month + '-' + day;
  for (var i in feed) {
    if (feed[i].date == dbdate) {
      whoUserFeed = feed[i].user;
    }
  }
  if (whoUserFeed == undefined) {
    $('strong')[16].innerHTML = 'nobody fed the fish the ' + date;
  } else {
    $('strong')[16].innerHTML = whoUserFeed + ' has fed the fish the ' + date;
  }
}

function setListFeed() {
  $('date')[0].innerHTML = feed[0].date;
  $('date')[1].innerHTML = feed[1].date;
  $('date')[2].innerHTML = feed[2].date;
  $('date')[3].innerHTML = feed[3].date;
  $('date')[4].innerHTML = feed[4].date;

  for (var y in feed) {
    listUserFeed[y] = feed[y].user;
    n = 10 - feed[y].user.length;
    i = 0;
    while (i < n) {
      listUserFeed[y] += '&nbsp;';
      i++;
    }
  }

  $('user')[0].innerHTML = listUserFeed[0];
  $('user')[1].innerHTML = listUserFeed[1];
  $('user')[2].innerHTML = listUserFeed[2]
  $('user')[3].innerHTML = listUserFeed[3];
  $('user')[4].innerHTML = listUserFeed[4];
}

function setListWater() {
  $('date')[5].innerHTML = water[0].date;
  $('date')[6].innerHTML = water[1].date;
  $('date')[7].innerHTML = water[2].date;
  $('date')[8].innerHTML = water[3].date;
  $('date')[9].innerHTML = water[4].date;

  for (var y in water) {
    listUserWater[y] = water[y].user;
    n = 10 - water[y].user.length;
    i = 0;
    while (i < n) {
      listUserWater[y] += '&nbsp;';
      i++;
    }
  }

  $('user')[5].innerHTML = listUserWater[0];
  $('user')[6].innerHTML = listUserWater[1];
  $('user')[7].innerHTML = listUserWater[2];
  $('user')[8].innerHTML = listUserWater[3];
  $('user')[9].innerHTML = listUserWater[4];
}