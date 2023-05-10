<!DOCTYPE HTML>
<html>
<head>
    <title>Inicio</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device width, initial-escale=1.0">
    <link href="http://localhost/Restaurant/CSS/estiloresto.css" rel="stylesheet" type="text/css">
    <link rel="icon" type="imagenes/logo1.png" href="imagenes/logo1.png">
</head>

<body>
    <header class="header">
        <div class="container logo-nav-container">
            <a href="http://localhost/Restaurant/index.html" id="logo">GROUP2</a>

            <nav class="nav">
                <ul>
                    <li><a href="http://localhost/Restaurant/index.html">Inicio</a></li>
                    <li><a href="http://localhost/Restaurant/Menu.html">Menu</a>
                        <ul>
                            <li><a href="http://localhost/Restaurant/Menu.html#entradas">Entradas</a></li>
                            <li><a href="http://localhost/Restaurant/Menu.html#plato-principal">Plato principal</a></li>
                            <li><a href="http://localhost/Restaurant/Menu.html#postre">Postres</a></li>
                            <li><a href="http://localhost/Restaurant/Menu.html#bebida">Bebidas</a></li>
                        </ul>
                    </li>
                    <li><a href="http://localhost/Restaurant/Locales.html">Locales</a></li>
                    <li><a href="http://localhost/Restaurant/contacto.html">Contacto</a></li>
                    <li><a href="http://localhost/Restaurant/Novedades.html">Novedades</a></li>
                </ul>
            </nav>
        </div>
    </header>

<?php

 // aqui se pasan los valores de las variables desde el formulario HTML

$nombre     =  $_POST['nombre'];
//$domicilio  =  $_POST['domicilio'];
//$localidad  =  $_POST['localidad'];
$telefono   =  $_POST['telefono'];
$mail       =  $_POST['mail'];
$comentario =  $_POST['comentario'];


// $conocio = $_POST['conocio'];
// $donde = $_POST['donde'];


 // zona de test


//echo $nombre;
//echo $domicilio; 
// echo $localidad;
//echo $telefono;
//echo $mail; 
//echo $comentario;
// echo $conocio;
// echo $donde; 


$header = 'From: ' . $mail . " \r\n"; 
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n"; 
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain"; 

//echo $header; 
// $mensaje = "Este mensaje fue enviado por " . $nombre . ",
 // de la empresa " . $empresa . " \r\n"; 
// $mensaje .= "Su e-mail es: " . $mail . " \r\n"; 
// $mensaje .= "Mensaje: " . $_POST['mensaje'] . " \r\n";
 // $mensaje .= "Enviado el " . date('d/m/Y', time()); 
// $para = 'ejemplo@mail.com';
 // $asunto = 'Asunto del mail recibido'; 
// mail($para, $asunto, utf8_decode($mensaje), $header);


// echo 'Mensaje enviado correctamente'; 

 
// Reemplazar las xx de infogrupoxx por enumerro de grupo
// Ejemplo, debe quedar como infogrupo01 
// Este nombre de usuario despues habra que darlo de alta en el servidor
// de correo.En ese caso Mercury
// y tambien en el cliente de correo en este  caso Thuderbird

$para = "infogrupo02@localhost";
$asunto = "Contacto en Nombre sitio";
$mensaje = "Nombre: ".$nombre."\nTeléfono: ".$telefono."\nE-mail: ".$mail."\nComentario: ".$comentario;

//
// cuando esta funcionado sacamos los echo o les ponemos //
//

// echo $para; 
//  echo $asunto;
// echo $mensaje; 
// echo $header;



mail($para,$asunto,$mensaje,$header);

?>

<div id="envio">
<img src="../imagenes/madero.jpg">
<h3> Su e-mail se ha enviado correctamente </h3>
</div>

</body>

</html>