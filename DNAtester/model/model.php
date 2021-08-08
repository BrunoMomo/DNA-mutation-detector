<?php 
require_once 'conexion.php';
Class Datos extends Conexion {
	#Registro de consulta
		public function regTestModelo($jsonDNArefBD, $jsonDNAcomBD){
			$tabla1 = 'dnaref';
			$tabla2 = 'dnacom';
			$pdo_conection = Conexion::conectar();
			$stmt1 = $pdo_conection->prepare("INSERT INTO $tabla1(dnaref_dnaref, dnaref_datetimereg) VALUES (:dna_ref, Now())");
			$stmt1->bindParam(":dna_ref", json_encode($jsonDNArefBD["dna_ref"]), PDO::PARAM_STR);
			if ($stmt1->execute()) {
				$LAST_ID = $pdo_conection->lastInsertId();
				foreach ($jsonDNAcomBD as $row) {
					$stmt2 = $pdo_conection->prepare("INSERT INTO $tabla2(dnacom_dna, dnacom_id_dnaref, dnacom_hmutation, dnacom_datetimereg) VALUES (:dna_ref, :id_dnaref, :hmutation, :datetimereg)");
					$stmt2->bindParam(":dna_ref", json_encode($row["dna"]), PDO::PARAM_STR);
					$stmt2->bindParam(":id_dnaref", $LAST_ID, PDO::PARAM_STR);
					$stmt2->bindParam(":hmutation", $row["hmutation"], PDO::PARAM_STR);
					$stmt2->bindParam(":datetimereg", $row["datetime"], PDO::PARAM_STR);
					$stmt2->execute();
					$stmt2 = null;
				}
				return 'success';
			} else {
				return 'error1';
			}
			$stmt1 = null;
		}
	#Registro de consultas
		public function obtenerconsultas(){
			$tabla1 = 'dnaref';
			$tabla2 = 'dnacom';
			$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla1 INNER JOIN $tabla2 ON $tabla1.id_dnaref = $tabla2.dnacom_id_dnaref");
			$stmt->execute();
			if ($stmt->execute()) {
				return $stmt->fetchAll();
			} else {
				return "error";
			}
			$stmt = null;
		}
}