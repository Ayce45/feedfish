<?php
include('connect.php');

$date = $_REQUEST['date'];
$user = $_REQUEST['user'];

$sql = "INSERT INTO feed SET date='$date', user='$user'";
$db->query($sql);
?>