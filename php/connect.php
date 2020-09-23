<?php
try {
    $db = new PDO('mysql:host=localhost', 'root', '');
    $db->query("SET NAMES 'utf8'");
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
