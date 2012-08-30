#!/bin/php
<?

	include "conf.inc.php";
	include "util.inc.php";


	# DEBUG (descomente para testes)
	{
//		$DEBUG_UF = "rs";
//		$DEBUG_CIDADE = "88013"; # PORTO ALEGRE
	}


	# Apaga o buffer
//	@rrmdir("{$dir}dados");
	@mkdir("{$dir}dados");

	# Caputura cidades e estados (menos o DF)
	$iuf = 0;
	$iufmax = sizeof($lstuf);
	foreach ($lstuf as $uf)
	{

		if(isset($DEBUG_UF))
			if($DEBUG_UF != $uf)
				continue;

		@mkdir("{$dir}dados/{$uf}");

		$uffile = strtoupper($uf);
		$sDados = file_get_contents("{$dir}tse/legendas/consulta_legendas_2012_{$uffile}.txt");
		$aLinhas = explode("\n", $sDados);

		$sDados = file_get_contents("{$dir}tse/candidatos/consulta_cand_2012_{$uffile}.txt");
		$aCand = explode("\n", $sDados);

		$aCidades = array();########  [86061] => VILA FLORES
		foreach($aLinhas as $linha)
		{
			$tmp = explode('";"', $linha);
			if(!empty($tmp[0]) && !isset($aCidades[$tmp[6]]))
			{
				if(isset($DEBUG_CIDADE))
				{
					if($DEBUG_CIDADE != $tmp[6])
						continue;
				}

				$aCidades[$tmp[6]] = $tmp[7];
			}
		}

		# Processa cidades
		$i=0;
		$max = sizeof($aCidades);
		echo "Compilando {$max} cidades de " . strtoupper($uf);
		foreach ($aCidades as $chv => $val)
		{
			if($i % 24 == 0)
				echo "\n\t[" . number_format( (($i * 100) / $max), 2, ',','') . "%] ";
			else
				echo '.';

			processaCidade($aLinhas, $aCand, $chv, $val, $dir, $uf, $aMeses, $dadosRef, $XD, $aSignos);
			$i++;
		}
		echo "[100%]\n";

		# Cria as cidades
		$out = "// Cidades\nvar cid = new Array();\n";
		foreach ($aCidades as $chv => $val)
			$out .= "cid[\"{$chv}\"]=[\"" . marceloCamelo($val) . "\"]\n";

		file_put_contents("{$dir}dados/{$uf}.js", utf8_encode("{$XD}{$out}"));
		$iuf++;
		echo "\n\n\t{$uffile}: estado processado... " . number_format( (($iuf * 100) / $iufmax), 2, ',','') . "% do Brasil\n";
		unset($aLinhas, $aCand, $sDados, $aCidades);
	}
