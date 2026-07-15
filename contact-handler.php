<?php
/**
 * THE PERFUME TAILOR — Contact form mailer
 * Place this file on any PHP host alongside the HTML pages.
 */

// ─── Config ──────────────────────────────────────────────────────────────────
define('TO_EMAIL',   'hello@theperfumetailor.com'); // change to real address
define('TO_PHONE',   '+919619733733');
define('SITE_NAME',  'The Perfume Tailor');
define('ALLOWED_ORIGIN', ''); // leave blank to allow same-origin only

// ─── CORS / headers ──────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
if (ALLOWED_ORIGIN) header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); echo json_encode(['ok' => false, 'error' => 'Method not allowed']); exit;
}

// ─── CSRF / honeypot ─────────────────────────────────────────────────────────
if (!empty($_POST['website'])) { // honeypot field — bots fill it, humans don't
    echo json_encode(['ok' => true]); exit; // silent success to fool bots
}

// ─── Sanitise inputs ─────────────────────────────────────────────────────────
function clean(string $v): string {
    return htmlspecialchars(strip_tags(trim($v)), ENT_QUOTES, 'UTF-8');
}

$name     = clean($_POST['name']     ?? '');
$phone    = clean($_POST['phone']    ?? '');
$email    = clean($_POST['email']    ?? '');
$interest = clean($_POST['interest'] ?? '');
$message  = clean($_POST['message']  ?? '');

// ─── Validation ──────────────────────────────────────────────────────────────
$errors = [];
if (strlen($name)  < 2)  $errors[] = 'Please enter your name.';
if (strlen($phone) < 7)  $errors[] = 'Please enter a valid phone number.';
if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Please enter a valid email.';

if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'errors' => $errors]);
    exit;
}

// ─── Rate-limiting (simple session-based, 3 submissions per hour) ─────────────
session_start();
$now = time();
$_SESSION['submissions'] = array_filter(
    $_SESSION['submissions'] ?? [],
    fn($t) => $now - $t < 3600
);
if (count($_SESSION['submissions']) >= 3) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Too many submissions. Please call us directly.']);
    exit;
}
$_SESSION['submissions'][] = $now;

// ─── Build email ─────────────────────────────────────────────────────────────
$subject = SITE_NAME . ' — New consultation request from ' . $name;

$body = "New consultation request\n";
$body .= str_repeat('─', 48) . "\n\n";
$body .= "Name:       $name\n";
$body .= "Phone:      $phone\n";
$body .= "Email:      " . ($email ?: '(not provided)') . "\n";
$body .= "Interest:   $interest\n\n";
$body .= "Message:\n$message\n\n";
$body .= str_repeat('─', 48) . "\n";
$body .= "Sent from: " . SITE_NAME . " website\n";
$body .= "Time: " . date('d M Y, H:i') . " IST\n";

// WhatsApp-friendly quick-reply link
$wa_msg  = urlencode("Hi! I'd love to find my perfect perfume. My name is $name and I'm interested in: $interest. Could you help me choose the right fragrance? 🌸");
$wa_link = "https://api.whatsapp.com/send/?phone=" . ltrim(TO_PHONE, '+') . "&text=Hi%20!%20I%27m%20looking%20to%20order%20a%20new%20perfume.&type=phone_number&app_absent=0";
$body   .= "WhatsApp quick-reply: $wa_link\n";

$headers  = "From: noreply@theperfumetailor.com\r\n";
$headers .= "Reply-To: " . ($email ?: TO_EMAIL) . "\r\n";
$headers .= "X-Mailer: PHP/" . PHP_VERSION . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ─── Send ─────────────────────────────────────────────────────────────────────
$sent = mail(TO_EMAIL, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true, 'message' => 'Thank you, ' . $name . '. We\'ll be in touch within one working day.']);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail could not be sent. Please call us directly on +91 96197 33733.']);
}
