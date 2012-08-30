<?

	setlocale(LC_ALL, 'pt_BR');

	$dir = $_SERVER["PWD"] . "/";

	$anos_bens = array(2006, 2008, 2010, 2012);


	$lstuf= array
	(
		"ac","al","am","ap","ba",
		"ce","es","go","ma","mg",
		"ms","mt","pa","pb","pe",
		"pi","pr","rj","rn","ro",
		"rr","rs","sc","se","sp","to"
	);


	$aSignos = array
	(
		'0,20-1' => 10, # Capricórnio'
		'21-1,19-2' => 11, # Aquário'
		'20-2,20-3' => 12, # Peixes'
		'21-3,20-4' => 1, # Áries'
		'21-4,20-5,' => 2, # Touro'
		'21-5,21-6' => 3, # Gêmeos'
		'22-6,21-7' => 4, # Câncer'
		'22-7,22-8' => 5, # Leão'
		'23-8,22-9' => 6, # Virgem'
		'23-9,22-10' => 7, # Libra'
		'23-10,21-11' => 8, # Escorpião'
		'22-11,21-12' => 9, # Sagitário'
		'22-12,0' => 10 # Capricórnio'
	);

	$XD = <<<XD
/*
 * Ah, que legal que tu te interessou pelo
 * código; baixe-o completo (+documentação)
 * aqui ó: http://github.com/ac107592
 */

XD;

	$url_pre="http://divulgacand2012.tse.jus.br/divulgacand2012/mostrarFotoCandidato.action?sqCandidato=";
	$url_suf="&codigoMunicipio=";

	$aMeses = array
	( # formato TSE :O
		"JAN" => 1, "FEB" => 2, "MAR" => 3, "APR" => 4,
		"MAY" => 5, "JUN" => 6, "JUL" => 7, "AUG" => 8,
		"SEP" => 9, "OCT" => 10, "NOV" => 11, "DEC" => 12
	);

