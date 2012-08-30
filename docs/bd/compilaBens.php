#!/bin/php
<?

	include "conf.inc.php";
	include "util.inc.php";


	ini_set("memory_limit", "1024M");
	# DEBUG (descomente para testes)
	{
//		$DEBUG_UF = "sc";
//		$DEBUG_CIDADE = "88013"; # PORTO ALEGRE
	}


	# Apaga o buffer
#	@rrmdir("{$dir}download");
	@mkdir("{$dir}bens");

	# Caputura cidades e estados (menos o DF)
	$iuf = 0;
	$iufmax = sizeof($lstuf);
	foreach ($lstuf as $uf)
	{

		if(isset($DEBUG_UF))
			if($DEBUG_UF != $uf)
				continue;

		@mkdir("{$dir}bens/{$uf}");

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

		$aBens = array();
		foreach($anos_bens as $ano)
		{
			$sDados = file_get_contents("{$dir}tse/bem/bem_candidato_{$ano}_{$uffile}.txt");
			$aDados = explode("\n", $sDados);

			foreach($aDados as $linha)
			{
				$tmp = explode('";"', $linha);
		//		echo $tmp[5]; // SQ_CANDIDATO
		//		echo $tmp[8]; // DS_TIPO_BEM
		//		echo $tmp[9]; // VALOR_BEM

				if(!isset($tmp[8]))
					continue;

				if(!isset($aBens[$tmp[5]][$ano]))
					$aBens[$tmp[5]][$ano] = array();

				array_push($aBens[$tmp[5]][$ano], array(''.$tmp[9] => strtolower($tmp[8]) ) );
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

			$bem = "// Bens\nvar bem = new Array();\n";
			$pat = "// Patrimonio\nvar pat = new Array();\n";
			foreach($aCand as $linha)
			{
				$tmp = explode('";"', $linha);

				if(!empty($tmp[6]) && $tmp[6] == $chv && ($tmp[8] != '12') && $tmp[15] == 'DEFERIDO')
				{
					if(!empty( $aBens[$tmp[11]] ))
					{
						$bem .= "bem[{$tmp[12]}]=[" . capturaGraph( $aBens[$tmp[11]] ) . "]\n";
						$pat .= "pat[{$tmp[12]}]=[" . capturaPatrimonio( $aBens[$tmp[11]] ) . "]\n";
					}
				}
			}

			$i++;
			file_put_contents("{$dir}bens/{$uf}/{$chv}.js", utf8_encode("{$XD}\n// {$val}\n\n{$bem}\n\n{$pat}"));
		}
		echo "[100%]\n";

		$iuf++;
		echo "\n\n\t{$uffile}: estado processado... " . number_format( (($iuf * 100) / $iufmax), 2, ',','') . "% do Brasil\n";
		unset($aLinhas, $aCand, $sDados, $aCidades, $aBens);
	}

/*
pat[14005]=[
	[2010,
		[145400,"apartamento adquirido através de financiamento ca cef. localizado na rua osvaldo cruz, 601 ao 31 lajeado/rs"],
		[18750,"apartamento de 43 metros quadrados no edificio turin na rua erno hemann, 193"],
		[25300,"apartamento na rua duque de caxias, 605 com 89,72 metros quadrados centro - lajeado/rs"],
		[28500,"apartamento na rua duque de caxias, 606 com 89,72 metros quadrados e um box de nº 15 de 13,62 metros quadrados, centro - lajeado/rs"],
		[46500,"apartamento, cef contrato de compra e venda con lerlin construções inscrita no cnpj nº 90.808.825/0001-20"],
		[73000,"casa de 140,00 metros quadrados sobre a areia de 1,6ha. localizada na av. beira rio esq. bernardino pinto no bairro conservas, lajeado/rs"],
		[75000,"casa de alvenaria com 134 metros quadrados e um galpão de 22,00 metros quadrados e um aumento de 62,26 metros quadrados num terreno de 396 metros quadrados no bairro florestal, lajeado/rs"],
		[32000,"sala comercial de 102,00 metros quadrados e box para estacionamento de 12,00 metros quadrados localizado na av. benjamin constant 1050/106 em lajeado"],
		[24500,"sala comercial na rua benjamin constant esq saldanha marinho, lajeado/rs"],
		[5700,"gabinete dentário completo com todos os equipamentos recebido como doação de maria melida schmidt"],
		[7229.02,"uma cadeira e um equipamento miniflex um refletor reflex mais uma unidade auxiliar personal e moncho delta especial"]
	],
	[2012,
		[80000,"uma casa situada na rua copacabana,519"],
		[8700,"um automóvel ka ano 2003 financiado em 48x adq. 02/11"],
		[1007,"linha telefônica crt"],
		[294.03,"deposito em conta corrente santander"]
	]
]

*/