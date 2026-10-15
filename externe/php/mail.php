<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

header('Content-Type: application/json');

$envPath = __DIR__ . '/../../.env';

if (is_file($envPath) && is_readable($envPath)) {
    $env = parse_ini_file($envPath);
} else {
    echo json_encode(['status' => 'error', 'error' => 'mail.php -> .env not found']);
    exit;
}

$authUsername   = $env['SMTP_USERNAME'];
$authPassword   = $env['SMTP_PASSWORD'];
$authHost       = $env['SMTP_HOST'] ?? 'smtp.gmail.com';
$authPort       = $env['SMTP_PORT'] ?? 587;
$authSecure     = $env['SMTP_SECURE'] ?? 'tls';
$authCharset    = $env['SMTP_CHARSET'] ?? 'UTF-8';
$sendTo         = $env['SMTP_SEND_TO'];

error_log(print_r($_POST, true));

$name         = trim($_POST['name'] ?? '') ?: (trim(($_POST['fname'] ?? '') . ' ' . ($_POST['lname'] ?? '')) ?: 'Test Name');
$from         = trim($_POST['email'] ?? '') ?: $authUsername;
$subject      = trim($_POST['subject'] ?? '') ?: 'Get in Touch - ' . $from;

$templatePart = trim($_POST['template-part'] ?? '');

if ($templatePart !== '') {
    if (!preg_match('/\A[a-zA-Z0-9_-]+\z/', $templatePart)) {
        http_response_code(400);
        exit(json_encode(['status' => 'error', 'error' => 'mail.php -> Invalid template']));
    }

    $templatePath = __DIR__ . '/phpmailer/template-parts/' . $templatePart . '.php';

    if (!is_file($templatePath) || !is_readable($templatePath)) {
        http_response_code(400);
        exit(json_encode(['status' => 'error', 'error' => 'mail.php -> Template ['. $templatePart .'.php] in template-parts not found']));
    }

    $templateData = [
        'name'    => $name,
        'from'    => $from,
        'subject' => $subject,
        'fields'  => $_POST,
    ];

    $message = renderTemplate($templatePath, $templateData);
} else $message = trim($_POST['message'] ?? '') ?: 'Test Message';

$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->Host       = $authHost;
$mail->SMTPAuth   = true;
$mail->Username   = $authUsername;
$mail->Password   = $authPassword;
$mail->SMTPSecure = $authSecure;
$mail->Port       = $authPort;
$mail->CharSet    = $authCharset;

if (filter_var($from, FILTER_VALIDATE_EMAIL)) {
    $mail->addReplyTo($from, $name);
}

$mail->setFrom($authUsername, $name);
$mail->addAddress($sendTo);

if ($templatePart !== '') {
    $mail->isHTML(true);
}

$mail->Subject = $subject;
$mail->Body    = $message;

if ($templatePart !== '') {
    $mail->AltBody = trim(strip_tags($message));
}

try {
    $mail->send();
    echo json_encode(['status' => 'ok']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'error' => $mail->ErrorInfo]);
}

function renderTemplate(string $templatePath, array $data): string
{
    extract($data, EXTR_SKIP);

    ob_start();

    try {
        require $templatePath;
        return ob_get_clean();
    } catch (\Throwable $e) {
        ob_end_clean();
        throw $e;
    }
}