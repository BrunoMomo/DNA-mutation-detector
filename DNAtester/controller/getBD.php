<?php
include '../model/model.php';
$respuesta = Datos::obtenerconsultas();
header('Content-type: application/json; charset=utf-8');
echo json_encode($respuesta);
exit();