var arrDNAsymbols = 'ACGT,'.split('')
var positionFirstComma = 0
var fistCommaHasTaken = false
var inputDNArowSize = 0
var inputDNAprevRowSize = 0
var inputDNAcurrentRowSize = 0
const inputDNArowSizeMin = 4
var inputReferenciaValid = false
var numDiferencias = 1
var vardatetime = ''
/*
	Variables
	Arrego de símbolos permitidos en el input DNA
	Posición de la primera coma(,)
	Memoria de presencia de la primera coma(,)
	Tamaño de la primera secuencia del arreglo final
	Memoria del tamaño del string
	Tamaño del string actual
	Mínimo de N para matriz de secuencia
	Validez del DNA de referencia
	Número de diferencias para considerar una mutación.
	Variable de fecha
*/
/* Función que detecta mutaciones */
function hasMutation(dna,dnaref){
	var arrDNAcomp = dna.split(',')
	var arrDNAref = dnaref.split(',')
	/* Tamaño de N */
	var arrSize = arrDNAref.length
	/* Obtención de Secciones para comparar Horizontal, Vertical y en Diagonales */
	var arrDNAcomp_horizontal = new Object()
	var arrDNAcomp_vertical = new Object()
	var arrDNAcomp_obliqueA = new Object()
	var arrDNAcomp_obliqueB = new Object()
	for (var i = 0; i < arrSize; i++) {
		arrDNAcomp_horizontal[i] = arrDNAcomp[i].split('')
	}// Horizontal
	for (var i = 0; i < arrSize; i++) {
		arrDNAcomp_vertical[i] = []
		for (var j = 0; j < arrSize; j++) {
			arrDNAcomp_vertical[i][j] = arrDNAcomp_horizontal[j][arrSize - i - 1] 
		}
	}// Vertical
	var newSize = 2*arrSize - 1
	for (var i = 0; i < newSize; i++) {
		arrDNAcomp_obliqueA[i] = []
		var newI = arrSize - i - 1
		var newJ = 0
		for (var j = newI; j < newSize - i; j++) {
			if (j >= 0 && j < arrSize) {
				arrDNAcomp_obliqueA[i][j] = arrDNAcomp_horizontal[j][newJ]
			}
			newJ++
		}
	}// Oblique A
	for (var i = 0; i < newSize; i++) {
		while (arrDNAcomp_obliqueA[i][0] == null) {
			arrDNAcomp_obliqueA[i].shift()
		}
		if (arrDNAcomp_obliqueA[i].length < inputDNArowSizeMin) {
			delete arrDNAcomp_obliqueA[i]
		}
	}//remueve valores "null" y secuencias menores al tamaño mínimo
	for (var i = 0; i < newSize; i++) {
		arrDNAcomp_obliqueB[i] = []
		var newI = arrSize - i - 1
		var newJ = 0
		for (var j = newI; j < newSize - i; j++) {
			if (j >= 0 && j < arrSize) {
				arrDNAcomp_obliqueB[i][j] = arrDNAcomp_vertical[newJ][j]
			}
			newJ++
		}
	}// Oblique B
	for (var i = 0; i < newSize; i++) {
		while (arrDNAcomp_obliqueB[i][0] == null) {
			arrDNAcomp_obliqueB[i].shift()
		}
		if (arrDNAcomp_obliqueB[i].length < inputDNArowSizeMin) {
			delete arrDNAcomp_obliqueB[i]
		}
	}//remueve valores "null" y secuencias menores al tamaño mínimo
	/* Obtención de Secciones de ADN referente */
	var arrDNAref_horizontal = new Object()
	var arrDNAref_vertical = new Object()
	var arrDNAref_obliqueA = new Object()
	var arrDNAref_obliqueB = new Object()
	for (var i = 0; i < arrSize; i++) {
		arrDNAref_horizontal[i] = arrDNAref[i].split('')
	}// Horizontal
	for (var i = 0; i < arrSize; i++) {
		arrDNAref_vertical[i] = []
		for (var j = 0; j < arrSize; j++) {
			arrDNAref_vertical[i][j] = arrDNAref_horizontal[j][arrSize - i - 1] 
		}
	}// Vertical
	for (var i = 0; i < newSize; i++) {
		arrDNAref_obliqueA[i] = []
		var newI = arrSize - i - 1
		var newJ = 0
		for (var j = newI; j < newSize - i; j++) {
			if (j >= 0 && j < arrSize) {
				arrDNAref_obliqueA[i][j] = arrDNAref_horizontal[j][newJ]
			}
			newJ++
		}
	}// Oblique A
	for (var i = 0; i < newSize; i++) {
		while (arrDNAref_obliqueA[i][0] == null) {
			arrDNAref_obliqueA[i].shift()
		}
		if (arrDNAref_obliqueA[i].length < inputDNArowSizeMin) {
			delete arrDNAref_obliqueA[i]
		}
	}//remueve valores "null" y secuencias menores al tamaño mínimo del ADN referente
	for (var i = 0; i < newSize; i++) {
		arrDNAref_obliqueB[i] = []
		var newI = arrSize - i - 1
		var newJ = 0
		for (var j = newI; j < newSize - i; j++) {
			if (j >= 0 && j < arrSize) {
				arrDNAref_obliqueB[i][j] = arrDNAref_vertical[newJ][j]
			}
			newJ++
		}
	}// Oblique B
	for (var i = 0; i < newSize; i++) {
		while (arrDNAref_obliqueB[i][0] == null) {
			arrDNAref_obliqueB[i].shift()
		}
		if (arrDNAref_obliqueB[i].length < inputDNArowSizeMin) {
			delete arrDNAref_obliqueB[i]
		}
	}//remueve valores "null" y secuencias menores al tamaño mínimo del ADN referente
	/* COMPROBACIÓN DE MUTACIÓN */
	/*
		Resultado, 3 estados posibles:
			null: La secuenciaNxN no tine punto de comparación (No se cumple el requisito: "Más de una secuencia de 4 letras iguales")
			false: La secuenciaNxN no ha mutado: "Es igual"
			true: La secuenciaNxN ha mutado: "Hay al menos n diferencias"/ "n" definida al inicio (numDiferencias).
	*/
	var responseMutation = null
	var seqDerived = false
	var mutation = false
	var countDifferences = 0
	for (var i = 0; i < arrSize; i++) {
		var countSimilarities = 0
		for (var j = 0; j < arrSize; j++) {
			if (countSimilarities == inputDNArowSizeMin) {
				seqDerived = true
				responseMutation = false
			}
			if (arrDNAcomp_horizontal[i][j] == arrDNAref_horizontal[i][j]) {
				countSimilarities++
			} else {
				countDifferences++
			}
		}
	} // Comparación en horizontal
	for (var i = 0; i < arrSize; i++) {
		var countSimilarities = 0
		for (var j = 0; j < arrSize; j++) {
			if (countSimilarities == inputDNArowSizeMin) {
				seqDerived = true
				responseMutation = false
			}
			if (arrDNAcomp_vertical[i][j] == arrDNAref_vertical[i][j]) {
				countSimilarities++
			}
		}
	} // Comparación en vertical
	for (var i = 0; i < arrSize; i++) {
		var countSimilarities = 0
		for (var j = 0; j < arrSize; j++) {
			if (countSimilarities == inputDNArowSizeMin) {
				seqDerived = true
				responseMutation = false
			}
			if (arrDNAcomp_obliqueA[i] && arrDNAcomp_obliqueB[i][j]) {
				if (arrDNAcomp_obliqueA[i][j] == arrDNAref_obliqueA[i][j]) {
					countSimilarities++
				}
			}
		}
	} // Comparación en diagonal A
	for (var i = 0; i < arrSize; i++) {
		var countSimilarities = 0
		for (var j = 0; j < arrSize; j++) {
			if (countSimilarities == inputDNArowSizeMin) {
				seqDerived = true
				responseMutation = false
			}
			if (arrDNAcomp_obliqueB[i] && arrDNAcomp_obliqueB[i][j]) {
				if (arrDNAcomp_obliqueB[i][j] == arrDNAref_obliqueB[i][j]) {
					countSimilarities++
				}
			}
		}
	} // Comparación en diagonal A
	if (seqDerived) {
		responseMutation = false
	}
	if (seqDerived && countDifferences >= numDiferencias) {
		mutation = true
		responseMutation = true
	}
	return responseMutation
}
$(document).ready(function(){
	$('#inputDNAreferente').focus()
	$('#inputDNAreferente').keyup(function(){
		var inputDNAval = $(this).val()
		/* Sólo mayúsculas */
		var inputDNAval = inputDNAval.toUpperCase()
		/* Convertir string a arreglo para contar símbolos */
		var arrInputDNAval = inputDNAval.split('')
		/* Convertir string a arreglo para obtener secuencia */
		var arrInputDNAseccVal = inputDNAval.split(',')
		/* Se obtiene longitud que deberá tener el string final según la primera coma(,) */
		var arrInputDNAseccSizeVal = arrInputDNAseccVal[0].length
		var arrInputDNAseccSizeTotalVal = arrInputDNAseccSizeVal*arrInputDNAseccSizeVal + (arrInputDNAseccSizeVal - 1)
		/* Permite borrar otra letra al borrar una coma */
		inputDNAcurrentRowSize = arrInputDNAval.length
		var actionDeleting = inputDNAcurrentRowSize < inputDNAprevRowSize
		if (inputDNAval.includes(',') && actionDeleting && (arrInputDNAval.length + 1) % (positionFirstComma + 1) == 0) {
			arrInputDNAval.splice(arrInputDNAval.length - 1,1)
		}
		for (var i = 0; i < arrInputDNAval.length; i++) {
			if (!arrDNAsymbols.includes(arrInputDNAval[i])) {
				arrInputDNAval.splice(i,1)
			} else if (i < inputDNArowSizeMin && arrInputDNAval[i] == ',') {
				arrInputDNAval.splice(i,1)
			}/* Remover símbolos diferentes a ACGT o comas(,) si es antes de la posición 4 */
			if (arrInputDNAval[i] == ',') {
				if (!fistCommaHasTaken && i >= inputDNArowSizeMin) {
					positionFirstComma = i
					fistCommaHasTaken = true
				} else if ( (i + 1) % (positionFirstComma + 1) != 0 ) {
					arrInputDNAval.splice(i,1)
				}
			}/* Toma la posición de la primera coma y elimina las que no estén en posición correspondiente */
		}/* Recorre el arreglo del string para eliminar símbolos indebidos */
		if (fistCommaHasTaken && arrInputDNAval.length < arrInputDNAseccSizeTotalVal && (arrInputDNAval.length + 1) % (positionFirstComma + 1) == 0 && arrInputDNAval.length > inputDNArowSizeMin + 3) {
			arrInputDNAval.push(',')
		}/* Agrega una coma automáticamente */
		if (arrInputDNAval.length > arrInputDNAseccSizeTotalVal && fistCommaHasTaken) {
			arrInputDNAval.splice(arrInputDNAval.length - 1,1)
		}/* Limita el arreglo de la secuencia final a NxN */
		/* Memoria del tamaño del string, Memoria de presencia de la primera coma(,) */
		inputDNAprevRowSize = arrInputDNAval.length
		fistCommaHasTaken = inputDNAval.includes(',')
		/* Escribe nuevo valor */
		inputDNAval = arrInputDNAval.join('')
		$(this).val(inputDNAval)
		/* Habilitación del botón "submit" */
		inputReferenciaValid = arrInputDNAval.length == arrInputDNAseccSizeTotalVal
		if (inputReferenciaValid) {
			$('#btnDNArefReady').prop('disabled', false)
		} else {
			$('#btnDNArefReady').prop('disabled', true)
		}
	})/* Corroboración del string con caracteres válidos */
	$('#btnDNArefReady').click(function(){
		/* Obtiene el valor del input para mostrarlo en un campo fijo */
		var inputDNAval = $('#inputDNAreferente').val()
		var arrInputDNAseccVal = inputDNAval.split(',')
		var inputDNAvalHTML = ''
		for (var i = 0; i < arrInputDNAseccVal.length; i++) {
			var arrBaseN = arrInputDNAseccVal[i].split('')
			inputDNAvalHTML = inputDNAvalHTML + '<div class="divDNArow divDNArow' + i + '">'
			for (var j = 0; j < arrBaseN.length; j++) {
				inputDNAvalHTML = inputDNAvalHTML + '<div class="base-n base-n-' + arrBaseN[j] + '">' + arrBaseN[j] + '</div>'
			}
			inputDNAvalHTML = inputDNAvalHTML + '</div>'
		}
		$('.divDNAref').html(inputDNAvalHTML)
		/* Deshabilita el input y el botón de la captura del DNA de referencia */
		$(this).prop('disabled', true)
		$('#inputDNAreferente').prop('disabled', true)
		$('.formDNAref').hide()
		$('.formDNAcomparison').show()
	})/* Prepara input para secuencias a comparar */
	$('#textareaDNAcomparison').keyup(function(){
		$('#btnDNAgetComparison').prop('disabled', false)
		//var textareaDNAtext = $(this).val().toUpperCase()
		//$('#textareaDNAcomparison').val(textareaDNAtext)
	})/* Habilita botón para comparación */
	$('#btnDNAeditComparison').click(function(){
		$('.formDNAresponse').hide()
		$('.divRowDNAcomparison').show()
		$('.divRowBtnDNAcomparison').show()
		$('.formDNAresponse').hide()
	})
	/*$('#btnDNAeditRef').click(function(){
		$('.formDNAref').show()
		$('.divRowDNAcomparison').hide()
		$('.divRowBtnDNAcomparison').hide()
		$('#inputDNAreferente').prop('disabled', false)
		$('#btnDNArefReady').prop('disabled', false)
		//$(this).hide()
	})*/
	var jsonDNAcomBD = new Array()
	var jsonDNArefBD = new Array()
	$('#btnDNAgetComparison').click(function(){
		$('.formDNAresponse').show()
		$('.divRowDNAcomparison').hide()
		$('.divRowBtnDNAcomparison').hide()
		/* Fecha */
		var today = new Date();
		var yyyy = today.getFullYear()
		var mm = today.getMonth()
		if (mm < 10) {mm = '0' + mm;}
		var dd = today.getDate()
		if (dd < 10) {dd = '0' + dd;}
		var HHiiss = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
		var ampm = ' hrs'
		/*if (0 < today.getHours() || today.getHours() < 12) {
			ampm = 'am'
		}*/
		var strDateTime = '<br>Fecha: ' + dd + '/' + mm + '/' + yyyy + '<br>Hora: ' + today.getHours() + ":" + today.getMinutes() + ampm
		/* Recuperación de DNA referente */
		var inputDNAval = $('#inputDNAreferente').val()
		var arrInputDNAseccVal = inputDNAval.split(',')
		inputDNArowSize = arrInputDNAseccVal[0].length
		/* Obtener arreglos para comparar */
		var textareaDNAcomparison = $('#textareaDNAcomparison').val()
		var arrTextareaDNAcomparison = textareaDNAcomparison.split(/\n/)
		var responseTextDNAcomparison = 'Resultados: '
		var num = 1
		for (var i = 0; i < arrTextareaDNAcomparison.length; i++) {
			var strDNAsecComparison = arrTextareaDNAcomparison[i]
			var strResponseTextHTML = ''
			/* Corroboración del tamaño de la secuencia */
			var boolFalseSeccSizeValid = false
			var arrDNAsecComparison = strDNAsecComparison.split(',')
			for (let j = 0; j < arrDNAsecComparison.length; j++) {
				boolFalseSeccSizeValid = arrDNAsecComparison[j].length != inputDNArowSize
			}
			boolFalseSeccSizeValid = arrDNAsecComparison.length != inputDNArowSize
			if (boolFalseSeccSizeValid) {
				strResponseTextHTML = ' <span class="res-seq-no-comp">Secuencia NO comparable</span>'
			}
			/* Detección de caracteres no válidos */
			var arrDNAsecSymbols = strDNAsecComparison.split('')
			var boolseccValid = false
			for (let j = 0; j < arrDNAsecSymbols.length; j++) {
				if (arrDNAsymbols.includes(arrDNAsecSymbols[j])) {
					boolseccValid = true
				} else {
					boolseccValid = false
					strResponseTextHTML = ' <span class="res-seq-no-valid">Secuencia NO VÁLIDA</span>'
				}
			}
			/* COMPARACIÓN */
			//Número de diferencias para considerar la mutación:
			if (arrDNAsecComparison.length >= inputDNArowSizeMin) {
				numDiferencias = 1
				if (!boolFalseSeccSizeValid) {
					/* BUSCAR MUTACIONES */
					var boolHasMutation = hasMutation(strDNAsecComparison,inputDNAval)
					var intHasMutation = 0//null
					if (boolHasMutation != null) {
						if (boolHasMutation) {
							strResponseTextHTML = ' <span class="res-seq-mutation">MUTACIÓN PRESENTE</span>'
							intHasMutation = 1//Mutación
						} else {
							strResponseTextHTML = ' <span class="res-seq-no-mut">Secuencia no mutada</span>'
							intHasMutation = 2//Sin mutar
						}
					} else {
						strResponseTextHTML = ' <span class="res-seq-unkn">Secuencia desconocida</span>'
					}
					var arrDNAcomp = new Array()
					for (var j = 0; j < arrDNAsecComparison.length; j++) {
						arrDNAcomp.push(arrDNAsecComparison[j].split(''))
					}
					vardatetime = yyyy + '-' + mm + '-' + dd + ' ' + HHiiss
					jsonDNAcomBD.push({"dna":arrDNAcomp,"hmutation":intHasMutation,"datetime":vardatetime})
				}
				/* Texto del resultado */
				responseTextDNAcomparison = responseTextDNAcomparison + '<br>' + num + '. ' + strDNAsecComparison + '<br>   ' + strResponseTextHTML
				num++
			} /* Descarta secuencias vacías, espacios por error y tanaños muy pequeños que no son válidos */
		}
		responseTextDNAcomparison = responseTextDNAcomparison + strDateTime
		$('#divResponseComparison').html(responseTextDNAcomparison)
		$('#btnDNAsave').prop('disabled', false)
	})
	$('#formDNAresponse').on('submit', function(e){
		//GUARDAR Y SALIR
		e.preventDefault()
		if (jsonDNAcomBD[0]) {
			var inputDNAval = $('#inputDNAreferente').val()
			jsonDNArefBD = {"dna_ref":inputDNAval,"datetime":vardatetime}
			$.ajax({
				url: 'controller/testInsert.php',
				type: 'POST',
				data: {
					'arrDNArefBD': JSON.stringify(jsonDNArefBD),
					'arrDNAcomBD': JSON.stringify(jsonDNAcomBD)
				},
				dataType: 'text',
				success: function(respuesta){
					var response = JSON.stringify(respuesta)
					console.log(response)
					location.href = window.location + 'registros.php'
				}
			})
		}
	})
})
