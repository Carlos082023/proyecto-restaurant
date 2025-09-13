<?php
// Configuración de cabeceras para respuesta JSON
header('Content-Type: application/json');

// Validar que la solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Validar y sanitizar datos de entrada
$nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$telefono = filter_input(INPUT_POST, 'telefono', FILTER_SANITIZE_STRING);
$asunto = filter_input(INPUT_POST, 'asunto', FILTER_SANITIZE_STRING);
$mensaje = filter_input(INPUT_POST, 'mensaje', FILTER_SANITIZE_STRING);

// Validar campos obligatorios
if (empty($nombre) || empty($email) || empty($mensaje)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Por favor, complete todos los campos obligatorios']);
    exit;
}

// Validar formato de email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'El formato del email no es válido']);
    exit;
}

// Configurar destinatario y asunto
$para = "reservas@grupo2.com";
$asunto_email = "Nuevo mensaje de contacto: " . ($asunto ?: "Consulta general");

// Construir el cuerpo del mensaje
$cuerpo_mensaje = "Nuevo mensaje de contacto desde el sitio web:\n\n";
$cuerpo_mensaje .= "Nombre: " . $nombre . "\n";
$cuerpo_mensaje .= "Email: " . $email . "\n";
$cuerpo_mensaje .= "Teléfono: " . ($telefono ?: "No proporcionado") . "\n";
$cuerpo_mensaje .= "Asunto: " . ($asunto ?: "Consulta general") . "\n\n";
$cuerpo_mensaje .= "Mensaje:\n" . $mensaje . "\n\n";
$cuerpo_mensaje .= "Enviado el: " . date('d/m/Y H:i:s');

// Configurar cabeceras del email
$cabeceras = "From: " . $email . "\r\n";
$cabeceras .= "Reply-To: " . $email . "\r\n";
$cabeceras .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$cabeceras .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Intentar enviar el correo
if (mail($para, $asunto_email, $cuerpo_mensaje, $cabeceras)) {
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.']);
}
?>