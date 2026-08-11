<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Read JSON input
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Sanitize input fields
    $name = strip_tags(trim($data["name"] ?? ""));
    $email = filter_var(trim($data["email"] ?? ""), FILTER_VALIDATE_EMAIL);
    $message = strip_tags(trim($data["message"] ?? ""));

    // Validate inputs
    if (empty($name) || !$email || empty($message)) {
        http_response_code(400);
        echo json_encode(["error" => "Please fill in all fields correctly."]);
        exit;
    }

    // Email recipient
    $to = "thekriyak@gmail.com";
    $subject = "New Portfolio Message from $name";
    
    // Email body content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Setup headers to prevent spam flag
    $headers = "From: webmaster@prakashkumar.info\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo json_encode(["message" => "Message sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to send email. Please try again later."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
}
?>
