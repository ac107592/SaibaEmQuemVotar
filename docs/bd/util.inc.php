<?
function removerAcento($str){
	$var = strtolower($str);
	
	$var = ereg_replace("[áàâã]","a",$var);
	$var = ereg_replace("[éèê]","e",$var);
	$var = ereg_replace("[íìî]","i",$var);
	$var = ereg_replace("[öóòôõ]","o",$var);
	$var = ereg_replace("[üúùû]","u",$var);
	$var = str_replace("ç","c",$var);
	$var = str_replace("'","",$var);

	return $var;
}

function nomeArq($str){//htmlentities
	return implode("-", explode(" ", removerAcento($str))) ;
}

// Bens
function capturaGraph($vet){
	$out = "";
	foreach($vet as $ano => $itens)
	{
		$soma = 0;
		foreach($itens as $val)
			$soma += key($val);

		$soma = number_format($soma, 2, '.', '');

		$out .= "[{$ano},{$soma}],";
	}

	return substr($out, 0, -1);
}

function capturaPatrimonio($vet){
	$out = "";
	foreach($vet as $ano => $itens)
	{
		$bens = array();
		$sbens = "";
		foreach($itens as $val)
			$bens[] = array( key($val), addcslashes( current($val) , '"') );

		foreach($bens as $x)
			$sbens .= "[$x[0],\"$x[1]\"],";

		$out .= "[{$ano}," . substr($sbens, 0, -1) . "],";
	}

	return substr($out, 0, -1);
}


///////////////
/*
	function rrmdir($dir)
	{
		foreach(glob($dir . '/*') as $file)
		{
			if(is_dir($file))
				rrmdir($file);
			else
				unlink($file);
		}

		rmdir($dir);
	}
*/
	function foi_baixado($arq){
		if(!file_exists($arq))
			return false;
		else if(filesize($arq) > 1680)
			return true;

		return false;
	}

	function save_image($img, $fullpath){
		$ch = curl_init ($img);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
		curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 0);
		curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)');

		$rawdata=curl_exec($ch);
		curl_close ($ch);

		if(file_exists($fullpath))
			unlink($fullpath);

		$fp = fopen($fullpath, 'x');
		fwrite($fp, $rawdata);
		fclose($fp);
	}

	function marceloCamelo($str)
	{
		$pronomes = array("Da", "De", "Do", "Das", "Dos", "E");
		$out = "";

		foreach (explode(" ", ucwords(strtolower($str))) as $x)
			if(in_array($x, $pronomes))
				@$out .= " " . strtolower($x);
			else
				$out .= " $x";

		$pos = strpos($out, "'");
		if($pos !== FALSE)
			if(isset($out[$pos + 1]))
				$out[$pos + 1] = strtoupper($out[$pos + 1]);

		return trim ($out);
	}

	function str2date($str)
	{
		$tmp = explode('-', $str);

		if($str == '0')
			return 0;
		else
			return mktime(0,0,0, $tmp[1], $tmp[0], 1970);
	}

	function getPeriodo($dia_mes, &$vet)
	{
		$iBusca = str2date($dia_mes);

		foreach($vet as $x => $val)
		{
			$tmp = explode(',', $x);
			$ini = str2date($tmp[0]);
			$fim = str2date($tmp[1]);

			if($ini <= 0)
				if($iBusca <= $fim)
					return $val;

			if($iBusca >= $ini && $iBusca < $fim)
				return $val;

			if($fim == 0)
				return $val;
		}

		return NULL;
	}

	function obtemDados(&$vet, &$tmp, &$dataRef, &$aMeses, &$aSignos)
	{
		$vet[$tmp[12]][0] = addcslashes($tmp[13], '"');
		$vet[$tmp[12]][1] = addcslashes(marceloCamelo($tmp[10]), '"');
		$vet[$tmp[12]][2] = $tmp[11];
		$vet[$tmp[12]][3] = ucfirst(strtolower($tmp[24]));
		$vet[$tmp[12]][4] = marceloCamelo($tmp[38]) . " / {$tmp[36]}";
		$vet[$tmp[12]][5] = substr($tmp[39], 0, -2);

		$nasc = explode("-", $tmp[25]); # 31-MAR-66

		$vet[$tmp[12]][6] = (2012 - "19{$nasc[2]}");
		$vet[$tmp[12]][7] = $tmp[28];
		$vet[$tmp[12]][8] = $tmp[30];
		$vet[$tmp[12]][9] = $tmp[32];
		$vet[$tmp[12]][10] = getPeriodo("{$nasc[0]}-{$aMeses[$nasc[1]]}", $aSignos);
	}

	function obtemInfo(&$val)
	{
		return array
		(
			"\"{$val[1]}\"", //NOME_CANDIDATO
			"\"{$val[3]}\"", //DESCRICAO_OCUPACAO
			"\"{$val[4]}\"", //NOME_MUNICIPIO_NASCIMENTO / SIGLA_UF_NASCIMENTO
			$val[5], //DESPESA_MAX_CAMPANHA (-2 últ. zeros)
			$val[6], //IDADE_DATA_ELEICAO
			$val[7], //CODIGO_SEXO (4:feminino, 2: masculino)
/* COD_GRAU_INSTRUCAO
	1:ANALFABETO
	2:LÊ E ESCREVE
	3:ENSINO FUNDAMENTAL INCOMPLETO
	4:ENSINO FUNDAMENTAL COMPLETO
	5:ENSINO MÉDIO INCOMPLETO
	6:ENSINO MÉDIO COMPLETO
	7:SUPERIOR INCOMPLETO
	8:SUPERIOR COMPLETO */
			$val[8],

/* CODIGO_ESTADO_CIVIL
	1:SOLTEIRO(A)
	3:CASADO(A)
	5:VIÚVO(A)
	7:SEPARADO(A) JUDICIALMENTE
	9:DIVORCIADO(A) */
			$val[9],
			$val[10]
/* SIGNO
	# 10,	Capricórnio
	# 11,	Aquário
	# 12,	Peixes
	# 1,	Áries
	# 2,	Touro
	# 3,	Gêmeos
	# 4,	Câncer
	# 5,	Leão
	# 6,	Virgem
	# 7,	Libra
	# 8,	Escorpião
	# 9,	Sagitário
	# 10	Capricórnio */
		);
	}

	# Cria as estruturas de dados do javascript
	function processaCidade(&$alegendas, &$acand, $idcidade, $nomecidade, $dir, $uf, &$aMeses, &$dataRef, &$XD, &$aSignos)
	{
		$aPartidos = array();########
		{
			foreach($alegendas as $linha)
			{
				$tmp = explode('";"', $linha);
				if(!empty($tmp[11]) && !isset($aPartidos[$tmp[11]]))
					$aPartidos[$tmp[11]] = array($tmp[12], $tmp[13]);
			}

				$aColigacao = array();
				foreach($alegendas as $linha)
				{
					$tmp = explode('";"', $linha);
					if(!empty($tmp[15]) && $idcidade == $tmp[6] && !isset($aColigacao[$tmp[15]]))
						$aColigacao[$tmp[11]] = $tmp[15];
				}

					$aColigacoes = array();########
					foreach($aColigacao as $chv => $val)
						if(!isset($aColigacoes[$val]))
							$aColigacoes[$val][] = $chv;
						else if(!in_array($chv, $aColigacoes[$val]))
							$aColigacoes[$val][] = $chv;

			$out = "\n\n// $nomecidade\nvar glArqCidade = new String(\"" . nomeArq($nomecidade) . "\");\n";
			{ # Compila partidos e coligacoes
				$out .= "\n// Coligacoes\nvar col = new Array();\n";
				foreach ($aColigacoes as $chv => $val)
					if($chv != '#NULO#')
						$out .= "col[\"". addcslashes($chv, '"') ."\"]=[" . implode(",", $val) . "]\n";

				$out .= "\n\n// Partidos\nvar prt = new Array();\n";
				foreach ($aPartidos as $chv => $val)
					$out .= "prt[$chv]=\"" . $val[0] . "\"\n";
			}
		}


		$aPrefeito = array();########
		$aVicePrefeito = array();########
		foreach($acand as $linha)
		{
			$tmp = explode('";"', $linha);
			if(!empty($tmp[6]) && $tmp[6] == $idcidade && $tmp[8] != '13')
				if($tmp[8] == '11')
					obtemDados($aPrefeito, $tmp, $dataRef, $aMeses, $aSignos);
				else if($tmp[8] == '12')
					obtemDados($aVicePrefeito, $tmp, $dataRef, $aMeses, $aSignos);
		}

			$out .= "\n\n// Prefeitos\nvar prf = new Array();\n";
			foreach ($aPrefeito as $chv => $val)
				if(!empty($val[0]) && !empty($val[3]) && !empty($val[2]))
				{
					$sinfo = implode(',', obtemInfo($val));
					$out .= "prf[{$chv}]=[\"{$val[0]}\",{$val[2]},[{$sinfo}]]\n";
				}


			$out .= "\n\n// Vice-prefeitos\nvar vcp = new Array();\n";
			foreach ($aVicePrefeito as $chv => $val)
				if(!empty($val[0]) && !empty($val[2]))
				{
					$tmp = obtemInfo($val);
					unset($tmp[3]);
					$sinfo = implode(',', $tmp);
					$out .= "vcp[{$chv}]=[\"{$val[0]}\",{$val[2]},[{$sinfo}]]\n";
				}

		$aVereador = array();########
		foreach($acand as $linha)
		{
			$tmp = explode('";"', $linha);
			if(!empty($tmp[6]) && $tmp[6] == $idcidade && $tmp[8] == '13' && $tmp[15] == 'DEFERIDO')
				obtemDados($aVereador, $tmp, $dataRef, $aMeses, $aSignos);
		}

			$out .= "\n\n// Vereadores\nvar ver = new Array();\n";
			foreach ($aVereador as $chv => $val)
			{
				$sinfo = implode(',', obtemInfo($val));
				$out .= "ver[$chv]=[\"{$val[0]}\",{$val[2]},[{$sinfo}]]\n";
			}

		$uf = strtolower($uf);
		file_put_contents("{$dir}dados/{$uf}/{$idcidade}.js", utf8_encode("{$XD}{$out}"));

		# free();
		unset($tmp, $out, $aVereador, $aColigacoes, $aColigacao, $aPartidos, $aPrefeito, $aVicePrefeito);
	}

// Receita
function capturaReceita($vet){
	$out='';
	foreach ($vet as $x)
		$out .= "[{$x[0]}," .
				'"' . addcslashes($x[1], '"') . '",'.
				'"' . addcslashes($x[2], '"') . '",'.
				'"' . marceloCamelo(addcslashes($x[3], '"')) . '",'.
				"{$x[4]},".
				'"' . addcslashes($x[5], '"') . '",'.
				'"' . addcslashes($x[6], '"') . '"],';

	return substr($out, 0, -1);
/*
12~19
0 Valor receita
1 Especie recurso
2 Data da receita
3 Nome do doador
4 CPF/CNPJ do doador
5 Tipo receita
6 Fonte recurso
7 Descricao da receita*/

}