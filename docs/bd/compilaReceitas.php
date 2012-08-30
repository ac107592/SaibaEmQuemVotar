#!/bin/php
<?

	include "conf.inc.php";
	include "util.inc.php";

/*
		"se","to"
*/
	ini_set("memory_limit", "2048M");
	# DEBUG (descomente para testes)
	{
//		$DEBUG_UF = "to";
//		$DEBUG_CIDADE = "88013"; # PORTO ALEGRE
	}


	# Apaga o buffer
#	@rrmdir("{$dir}download");
	@mkdir("{$dir}receita-2708");



	$sDados = file_get_contents("{$dir}receita-despesas/ReceitasCandidatos.csv");
	$aDados = explode("\n", $sDados);
	unset($sDados);

	$aBens = array();
	foreach($aDados as $linha)
	{
		$tmp = explode('";"', $linha);
//		echo $tmp[3]; // Numero UE (Municipio)
//		echo $tmp[6]; // Numero candidato
/*
12~19
15 Valor receita
18 Especie recurso
14 Data da receita
13 Nome do doador
12 CPF/CNPJ do doador
16 Tipo receita
17 Fonte recurso
19 Descricao da receita*/
		if(!@isset($aBens[''.$tmp[3]][$tmp[6]]))
			@$aBens[''.$tmp[3]][$tmp[6]] = array();

		@$aBens[''.$tmp[3]][$tmp[6]][] = array(
				implode('.', explode(',', $tmp[15])), strtolower($tmp[18]), strtolower($tmp[14]), strtolower($tmp[13]),
				$tmp[12], strtolower($tmp[16]), strtolower($tmp[17])
			);

	}
	unset($aDados);


	# Captura cidades e estados (menos o DF)
	$iuf = 0;
	$iufmax = sizeof($lstuf);
	foreach ($lstuf as $uf)
	{

		if(isset($DEBUG_UF))
			if($DEBUG_UF != $uf)
				continue;

		@mkdir("{$dir}receita-2708/{$uf}");

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
		echo "\nCompilando {$max} cidades de " . strtoupper($uf);

		foreach ($aCidades as $chv => $val)//[88013] => PORTO ALEGRE
		{
			if($i % 24 == 0)
				echo "\n\t[" . number_format( (($i * 100) / $max), 2, ',','') . "%] ";
			else
				echo '#';

			$rec = "// Receitas\nvar rec = new Array();\n";
			foreach($aCand as $linha)
			{
				$tmp = explode('";"', $linha);

				if(!empty($tmp[6]) && $tmp[6] == $chv && ($tmp[8] != '12') && $tmp[15] == 'DEFERIDO')
					if(!empty( $aBens[$chv][$tmp[12]] ))
						$rec .= "rec[{$tmp[12]}]=[". capturaReceita($aBens[$chv][$tmp[12]]) ."]\n";
			}

			$i++;
			file_put_contents("{$dir}receita-2708/{$uf}/{$chv}.js", utf8_encode("{$XD}\n// {$val}\n\n{$rec}"));
		}
		echo "[100%]\n";

		$iuf++;
		echo "\n\n\t{$uffile}: estado processado... " . number_format( (($iuf * 100) / $iufmax), 2, ',','') . "% do Brasil\n";
		unset($aLinhas, $aCand, $sDados, $aCidades, $aBens);
	}
