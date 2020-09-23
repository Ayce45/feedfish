<script>
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
    creerRequete();
    var url = "getFeed.php";        
    requete.open("GET",url,true);    
    requete.onreadystatechange = isFeed;   
    requete.send(null);

    function isFeed() {
        var date = new Date().toISOString().slice(0, 10).replace('T', ' ');
        var feed = JSON.parse(requete.responseText);
        if(feed[0].date == date) {
            document.getElementById('p').innerHTML = "true";
        } else {
            document.getElementById('p').innerHTML = "false";
        }
    }
</script>
<html>
    <body>
        <p id='p'></p>
</body>

</html>