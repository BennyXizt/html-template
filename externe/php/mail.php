<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

header('Content-Type: application/json');

$mail = new PHPMailer(true);

$authUsername = 'you@example.com';
$authPassword = 'password';
$authHost = 'smtp.gmail.com';

$name = $_POST['name'] ?? 'Test Name';
$subject = $_POST['subject'] ?? 'Test mail';
$email = $_POST['email'] ?? $authUsername;
$message = $_POST['message'] ?? 'Test Message';
$sendTo = 'send@example.com';

$mail->isSMTP();
$mail->Host       = $authHost;
$mail->SMTPAuth   = true;
$mail->Username   = $authUsername;
$mail->Password   = $authPassword;
$mail->SMTPSecure = 'tls';
$mail->Port       = 587;

$mail->setFrom($authUsername, $name);
$mail->addReplyTo($email, $name); 
$mail->addAddress($sendTo);

$mail->Subject = $subject;
$mail->Body    = $message;

try {
    $mail->send();
    echo json_encode(['status' => 'ok']);
} catch (\PHPMailer\PHPMailer\Exception $e) {
    echo json_encode(['status' => 'error', 'error' => $mail->ErrorInfo]);
}