<?php
require_once 'config.php';

mb_internal_encoding('UTF-8');  // Set internal encoding to UTF-8, just in case

if (!empty($_POST)) {

    // Let's check the recaptcha first
    $recaptchaResponse = $_POST['g-recaptcha-response'];
    $recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaResponse}";
    $verify = json_decode(file_get_contents($recaptchaUrl));
    if (!$verify->success) {
      error_log("Failed to send email due to a failed captcha validation");
      echo '<div class="alert alert-danger alert-dismissible fade show" role="alert">
      Recaptcha failed. Please try again.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
      exit;
    }

    // Let's define the fields and do some basic sanitization. More sanitization is done later.
    $senderName = htmlspecialchars(trim($_POST["emailSenderName"] ?? ''), ENT_QUOTES, 'UTF-8');
    $senderName = mb_substr($senderName, 0, 63);
    $email = filter_var(trim($_POST["emailSenderMail"] ?? ''), FILTER_SANITIZE_EMAIL);
    $email = mb_substr($email, 0, 63);
    $subject = htmlspecialchars(trim($_POST["emailSubject"] ?? ''), ENT_QUOTES, 'UTF-8');
    $subject = mb_substr($subject, 0, 255);
    $message = htmlspecialchars(trim($_POST["emailBody"] ?? ''), ENT_QUOTES, 'UTF-8');
    $message = mb_substr($message, 0, 2048);

    // Let's make sure there are no empty values (again)
    if (empty($senderName) || empty($email) || empty($subject) || empty($message)) {
      error_log("Failed to send email due to empty values in one or more fields");
      echo '<div class="alert alert-danger alert-dismissible fade show" role="alert">
      All fields are required. Please fill out the form completely.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>';
      exit; 
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      error_log("Failed to send email due to a failed email validation");
      echo '<div class="alert alert-danger alert-dismissible fade show" role="alert">
      Invalid email address. Please provide a valid email.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
      exit;
    }

    // Assign a value to the important variables
    $myMail = "alejandro@gonzalezrogel.com";
    $body = "Name: $senderName\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $myMail" . "\r\n" .
    "Reply-To: $email" . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

    // Let us sanitize the input even more!
    $body = str_replace("\n.", "\n..", $body);  // This is a common trick to prevent email injection attacks in old email servers.
    
    $bad_chars = ["\r", "\n", '%0A', '%0D'];
    $subject = str_ireplace($bad_chars, '', $subject);
    $body = str_ireplace($bad_chars, '', $body);

    $match = "/(from\:|to\:|bcc\:|cc\:|content\-type\:|mime\-version\:|subject\:|x\-mailer\:|reply\-to\:|\%0a|\%0b)/i";
    if(preg_match($match, $subject) || preg_match($match, $body)) {
      error_log("Found weird characters that should not be there...!Subject: $subject, Body: $body");
        echo '<div class="alert alert-danger alert-dismissible fade show" role="alert">
        Invalid characters detected. Please check your input.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
        exit;
    }
    // OTHER SANITIZATION IDEAS: Using FILTER_SANITIZE_FULL_SPECIAL_CHARS, albeit I believe it is redundant here.

    /* mail() has some limitations, such as that the email may be marked as spam,
     but it should work since I'm always sending the message to my server.
     And injections...https://doganoo.medium.com/mail-injection-in-php-attacks-and-prevention-cbc7bfe7ca98 */
     if (mail($myMail, $subject, $body, $headers)) {
      error_log("Email sent!");
        echo '<div class="alert alert-success alert-dismissible fade show" role="alert">
        Message sent successfully!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
      exit;
    } else {
      error_log("Unknown problem when sending the email!");
      error_log("Sender: $senderName, Email: $email, Subject: $subject, Body: $body, Headers: $headers");
        echo '<div class="alert alert-danger alert-dismissible fade show" role="alert">
        Something went wrong. Please try again later.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
      exit;
    }
} else {
  error_log("Failed to send email. POST empty!");
  echo '<div class="alert alert-danger alert-dismissible fade show" role="alert">
  Something went wrong. Please try again later.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>';
  exit;
}
?>