<?php
$messageUser = $_REQUEST['message'];
$user = $_REQUEST['user'];

$message = 'Hey administrator ' . $user . ' send you a message : <br>' . $messageUser;
require_once('PHPMailer/src/PHPMailer.php');
require_once('PHPMailer/src/SMTP.php');

$mail = new PHPMailer\PHPMailer\PHPMailer;
$mail->IsSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->Port = 465;
$mail->SMTPAuth = true;

$mail->Username = 'servicemail.ppe@gmail.com';
$mail->Password = 'Azerty45';
$mail->SMTPSecure = 'ssl';
$mail->From = 'servicemail.ppe@gmail.com';
$mail->FromName = 'FeedFish';
$mail->AddAddress('evan.j@hotmail.fr'); 
$mail->IsHTML(TRUE);

$mail->Subject = '[REPORT]';
$mail->Body = $message;

if(!$mail->Send()) {
    echo "Le message n'a pas pu être envoyer.";
    echo 'Mailer Error: ' . $mail->ErrorInfo;
    exit;
}
?>