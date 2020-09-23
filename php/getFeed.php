<?php
include('connect.php');

$sql = "SELECT * FROM feed ORDER BY date DESC";
$reponse =$db->query($sql);
$rep="[";
while($donnee = $reponse->fetch())
{
    if($rep != "["){
        $rep .=",";
    }

    $rep .= '{"id":"' .$donnee["id"].'",';  
    $rep .= '"date":"' .$donnee["date"].'",'; 
    $rep .='"user":"'.$donnee["user"]. '"}';

}
$rep .="]";

$reponse->closeCursor();
echo $rep;
?>