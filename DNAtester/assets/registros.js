$(document).ready(function(){
	var respuesta = $.ajax({
		async: false,
		url: "controller/getBD.php",
		dataType: "json",
		done: function(respuesta){
			JSON.parse(respuesta);
			return respuesta
		},
		fail: function(jqXHR, textStatus, errorThrown ) {
			console.log( 'Could not get posts, server response: ' + textStatus + ': ' + errorThrown );
		}
	}).responseJSON
	//console.log(respuesta)
	if (respuesta[0] != null) {
		var countMutaciones = 0
		var countSINMutar = 0
		$.each(respuesta, function(row, reg) {
			//console.log( JSON.parse(reg['dnacom_dna']) )
			rowHTML = $('<tr/>')
			rowHTML.append('<th>' + row + '</th>')
			
			rowHTML.append('<td>' + reg['dnacom_dna'] + '</td>')

			var dnahasmut = 'Secuencia desconocida'
			switch (reg['dnacom_hmutation']) {
				case '1':
					dnahasmut = 'Mutación'
					countMutaciones++
					break
				case '2':
					dnahasmut = 'Sin mutar'
					countSINMutar++
					break
			}
			rowHTML.append('<th class="alr' + reg['dnacom_hmutation'] + '">' + dnahasmut + '</th>')
			var strDNAref = reg['dnaref_dnaref']
			var arrInputDNAseccVal = strDNAref.split(',')
			var inputDNAvalHTML = ''
			for (var i = 0; i < arrInputDNAseccVal.length; i++) {
				var arrBaseN = arrInputDNAseccVal[i].split('')
				inputDNAvalHTML = inputDNAvalHTML + '<div class="divDNArow divDNArow' + i + '">'
				for (var j = 0; j < arrBaseN.length; j++) {
					if (arrBaseN[j] != '"') {
						inputDNAvalHTML = inputDNAvalHTML + '<div class="base-n base-n-' + arrBaseN[j] + '">' + arrBaseN[j] + '</div>'
					}
				}
				inputDNAvalHTML = inputDNAvalHTML + '</div>'
			}
			rowHTML.append('<td>' + inputDNAvalHTML + '</td>')
			rowHTML.append('<td>' + reg['dnacom_datetimereg'] + '</td>')
			$('#tableBD').find('tbody').append(rowHTML)
		})
		$('#tableBD').find('tfoot').append('<tr><td></td><td>Mutaciones</td><th class="alr1">' + countMutaciones + '</th></tr>')
		$('#tableBD').find('tfoot').append('<tr><td></td><td>Sin mutación</td><th class="alr2">' + countSINMutar + '</th></tr>')
	}
})
/*
	Base de datos (columnas):
		dnacom_dna
		dnacom_hmutation
		dnaref_dnaref
		dnacom_datetimereg
*/