<header>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<!-- Bootstrap -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
	<!-- jQuery -->
		<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<!-- css -->
		<link rel="stylesheet" type="text/css" href="assets/style.css">
	<!-- js -->
		<script type="text/javascript" src="assets/main.js"></script>
	<!-- Font Awesome -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<!-- Title -->
		<title>Detector de mutaciones de ADN</title>
</header>
<body>
	<h1 class="h1-title-wellcome">Bienvenido</h1>
	<h2 class="h2-subtitle"><i class="fas fa-dna"></i> Detector de mutaciones</h2>
	<div class="container adncomparison">
		<form class="formDNAref">
			<div class="row form-group input-group-lg">
				<div class="col-md-8">
					<label for="inputDNAreferente">Referencia de ADN</label>
					<input type="text" class="form-control inputDNA" id="inputDNAreferente" name="inputDNAreferente" placeholder="Secuencia DNA" aria-describedby="sizing-addon1">
				</div>
			</div>
			<div class="row form-group input-group-lg">
				<div class="col-md-4">
					<button type="button" class="btn btn-lg btn-primary" id="btnDNArefReady" disabled><i class="fas fa-arrow-right"></i> Listo</button>
				</div>
			</div>
		</form>
		<form class="formDNAcomparison" style="display: none;">
			<div class="row form-group input-group-lg">
				<div class="col-md-6">
					<label for="divDNAref">Referencia de ADN</label>
					<div class="divDNAref">
						
					</div>
				</div>
				<!-- <div class="col-md-4">
					<button type="button" class="btn btn-lg btn-secondary" id="btnDNAeditRef"><i class="fas fa-edit"></i> Volver</button>
				</div> -->
			</div>
			<div class="row form-group input-group-lg divRowDNAcomparison">
				<div class="col-md-8">
					<label for="textareaDNAcomparison">Secuencias de comparación</label>
					<textarea type="text" class="form-control textareaDNA" id="textareaDNAcomparison" name="textareaDNAcomparison" placeholder="Escriba las secuencias ADN para detectar mutaciones" aria-describedby="sizing-addon1"></textarea> 
				</div>
			</div>
			<div class="row form-group input-group-lg divRowBtnDNAcomparison">
				<div class="col-md-4">
					<button type="button" class="btn btn-lg btn-primary" id="btnDNAgetComparison" disabled><i class="fas fa-dna"></i> Comprobar</button>
				</div>
			</div>
		</form>
		<form class="formDNAresponse" id="formDNAresponse" style="display: none;">
			<div class="row form-group input-group-lg">
				<div class="col-md-8">
					<label for="divResponseComparison">Secuencias analizadas:</label>
					<div class="form-control divResponseComparison" id="divResponseComparison"></div>
				</div>
			</div>
			<div class="row form-group input-group-lg">
				<div class="col-md-4">
					<button type="submit" class="btn btn-lg btn-primary" id="btnDNAsave" disabled><i class="fas fa-save"></i> Guardar y salir</button>
				</div>
				<div class="col-md-4">
					<button type="button" class="btn btn-lg btn-secondary" id="btnDNAeditComparison"><i class="fas fa-edit"></i> Volver</button>
				</div>
				<div class="col-md-4">
					<a href="javascript:void(0)" onclick="window.location.reload()">
						<button type="button" class="btn btn-lg btn-secondary" id="btnDNArestart"><i class="fas fa-redo-alt"></i> Reiniciar</button>
					</a>
				</div>
			</div>
		</form>
	</div>
</body>
