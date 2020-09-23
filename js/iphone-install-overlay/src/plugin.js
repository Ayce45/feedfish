'use strict';
var iPhoneInstallOverlay = (function(document, localStorage) {
  var defaultConfig = {
    showOnReload: true,
    appIconURL: '',
    spritesURL: '',
    blurElement: '',
    appName: 'FeedFish',
    addText: 'Add to Home Screen',
    previewText: 'Preview in browser'
  }

  var isiPhoneSafari = navigator.userAgent && !navigator.userAgent.match('CriOS') && navigator.userAgent.match(/iPhone/i);
  var isAndroid = navigator.userAgent.match(/Android/i) == "Android";

  var isModeFullscreen = 'standalone' in window.navigator && window.navigator.standalone !== true;
  var isModeFullscreenA = !matchMedia('(display-mode: standalone)').matches;

if (isiPhoneSafari) {
  var DOM_TEMPLATE = "\
  <div class=\"add-to-home\">\
    <div class = \"text-right browser-preview f12\" ng-click=\"main.iPhoneNotFullscreen=false\">{previewText}</div>\
    <div class = \"logo-name-container\" style=\"background-image:url({appIconURL})\">\
      {appName}\
    </div>\
    <div class = \"homescreen-text\">To install tap\
      <div class = \"icon-addToHome sprite-mobile\" style=\"background-image:url({spritesURL})\"></div> and choose\
      <br /> {addText}\
    </div>\
    <div class = \"icon-homePointer sprite-mobile\"  style=\"background-image:url({spritesURL})\"></div>\
  </div>\
  ";
} else if (isAndroid) {
  var DOM_TEMPLATE = "\
  <div class=\"add-to-home\">\
    <div class = \"text-right browser-preview f12\" ng-click=\"main.iPhoneNotFullscreen=false\">{previewText}</div>\
    <div style =\"transform: scale(1, -1);\">\
    <div class = \"icon-homePointer icon-homePointerA sprite-mobile\"  style=\"background-image:url({spritesURL})\"></div>\
    </div>\
    <div class = \"logo-name-container\" style=\"background-image:url({appIconURL})\">\
    {appName}\
    </div>\
    <div class = \"homescreen-text\">To install tap\
      <div class = \"icon-burger sprite-mobile\" style=\"background-image:url({spritesURL})\"></div> and choose\
      <br /> {addText}\
    </div>\
  </div>\
  ";
} else {
  var DOM_TEMPLATE = "\
  <div class=\"add-to-home\">\
    <div class = \"text-right browser-preview f12\" ng-click=\"main.iPhoneNotFullscreen=false\">{previewText}</div>\
    <div style =\"transform: scale(1, -1);\">\
    <div class = \"icon-homePointer icon-homePointerA sprite-mobile\"  style=\"background-image:url({spritesURL})\"></div>\
    </div>\
    <div class = \"logo-name-container\" style=\"background-image:url({appIconURL})\">\
    TEST ONLY\
    </div>\
    <div class = \"homescreen-text\">To install tap\
      <div class = \"icon-burger sprite-mobile\" style=\"background-image:url({spritesURL})\"></div> and choose\
      <br /> {addText}\
    </div>\
  </div>\
  ";
}

  function showOverlay() {
    document.querySelector(".add-to-home").style.display = 'block';
    document.querySelector(defaultConfig.blurElement).classList.add('blur');
    document.querySelector(".swal2-container").classList.add('blur')
  }

  function hideOverlay() {
    if (!defaultConfig.showOnReload) {
      localStorage.setItem('overlayStatus', 'hidden');
    }
    document.querySelector(".add-to-home").style.display = 'none';
    document.querySelector(defaultConfig.blurElement).classList.remove('blur');
    document.querySelector(".swal2-container").classList.remove('blur')
  }

  function replaceString(obj, str) {
    var retStr = str;
    Object.keys(obj).forEach(function(key) {
      var regexPattern = '{' + key + '}';
      retStr = retStr.replace(new RegExp(regexPattern, 'g'), obj[key]);
    });
    return retStr;
  }

  function initDom(config) {
    var dom = replaceString(config, DOM_TEMPLATE);
    var wrapper = document.createElement('div');
    wrapper.innerHTML = dom;
    document.body.appendChild(wrapper);
    if (isiPhoneSafari && isModeFullscreen) {
      if (!defaultConfig.showOnReload && localStorage.getItem('overlayStatus') === 'hidden') {
        return;
      }
      showOverlay(config);
    } else if (isAndroid && isModeFullscreenA) {
      if (!defaultConfig.showOnReload && localStorage.getItem('overlayStatus') === 'hidden') {
        return;
      }
      showOverlay(config);
    }
  }

  function addMetaTag() {
    const metaDom = document.createElement('meta');
    metaDom.name = 'apple-mobile-web-app-capable';
    metaDom.content = 'yes';
    document.getElementsByTagName('head')[0].appendChild(metaDom);
  }

  function initClickEvents() {
    document.querySelector(".add-to-home .browser-preview").addEventListener("click", hideOverlay);
  }

  return {
    init: function() {
      var config = arguments.length <= 0 || arguments[0] === undefined ? defaultConfig : arguments[0];
      if (!config.blurElement) {
        console.error('Blur Element is required in config');
        return;
      }
      addMetaTag();
      initDom(Object.assign(defaultConfig, config));
      initClickEvents();
    },
    hideOverlay: hideOverlay,
    showOverlay: showOverlay
  }
})(document, localStorage);
