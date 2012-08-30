#!/bin/php
<?

	include "conf.inc.php";
	include "util.inc.php";


	# DEBUG (descomente para testes)
	{
//		$DEBUG_UF = "sc";
//		$DEBUG_CIDADE = "88013"; # PORTO ALEGRE
	}

	# Apaga o buffer
#	@rrmdir("{$dir}fotos");
	@mkdir("{$dir}fotos");


	# Caputura cidades e estados (menos o DF)
	$iuf = 0;
	$iufmax = sizeof($lstuf);
	foreach ($lstuf as $uf)
	{

		if(isset($DEBUG_UF))
			if($DEBUG_UF != $uf)
				continue;

		@mkdir("{$dir}fotos/{$uf}");

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
			@mkdir("{$dir}fotos/{$uf}/{$chv}");
			echo "\n\t{$val} [" . number_format( (($i * 100) / $max), 2, ',','') . "%]\n";

			$j=0;
			foreach($aCand as $linha)
			{
				$tmp = explode('";"', $linha);

				if(!empty($tmp[6]) && $tmp[6] == $chv)
				{
					if($j % 24 == 0)
						echo "\n";
					else
						echo '*';

					if(!foi_baixado("{$dir}fotos/{$uf}/{$chv}/{$tmp[11]}.jpg"))
						system("/bin/convert -resize 1000x140 {$dir}download/{$uf}/{$chv}/{$tmp[11]}.jpg -colorspace Gray {$dir}fotos/{$uf}/{$chv}/{$tmp[11]}.jpg");

					$j++;
				}
			}
			$i++;
		}
		echo "[100%]\n";

		$iuf++;
		echo "\n\n\t{$uffile}: estado processado... " . number_format( (($iuf * 100) / $iufmax), 2, ',','') . "% do Brasil\n";
		unset($aLinhas, $aCand, $sDados, $aCidades);
	}
