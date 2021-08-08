<?php
include '../model/model.php';
$respuesta = '';
if ( isset($_POST["arrDNArefBD"]) && isset($_POST["arrDNAcomBD"]) ) {
	$jsonDNArefBD = json_decode($_POST["arrDNArefBD"], true);
	$jsonDNAcomBD = json_decode($_POST["arrDNAcomBD"], true);
	$respuesta = Datos::regTestModelo($jsonDNArefBD, $jsonDNAcomBD);
}
header('Content-type: application/json; charset=utf-8');
echo $respuesta;
exit();