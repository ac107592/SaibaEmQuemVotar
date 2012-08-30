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
#	@rrmdir("{$dir}mosaico");
	@mkdir("{$dir}mosaico");

	# Caputura cidades e estados (menos o DF)
	$iuf = 0;
	$iufmax = sizeof($lstuf);
	foreach ($lstuf as $uf)
	{

		if(isset($DEBUG_UF))
			if($DEBUG_UF != $uf)
				continue;

		@mkdir("{$dir}mosaico/{$uf}");

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
			echo "\n\t{$val} / {$uf} [" . number_format( (($i * 100) / $max), 2, ',','') . "%]\n";

			$cmd = "";
			$fotos = 0;
			foreach($aCand as $linha)
			{
				$tmp = explode('";"', $linha);
/*
montage -label 'Balloon'   210000000258.jpg  \
		-label 'Medical\n12700'   210000000310.jpg  \
		-label 'Blahaah'   210000000314.jpg  \
		-tile 3x5 -frame 2  -geometry '70x100+10+4>' \
		-title 'Eleições Alegre'  ~/poa.jpg */
				if(!empty($tmp[6]) && $tmp[6] == $chv && $tmp[8] == '11')
				{
					$nha = explode(" ", str_replace("'","",$tmp[13]) );
					$cmd .= "-label '". $nha[0] ."' {$dir}download/{$uf}/{$chv}/{$tmp[11]}.jpg ";
					$fotos++;
				}
			}

			$arq_out = "{$dir}mosaico/{$uf}/" . nomeArq( $val );

			# Cria o mosaico
			$cmd .= "-tile 5x". (ceil($fotos / 5) + 1) ." -frame 2 -geometry '114x160+10+4>' ";
			$cmd .= "-title 'Candidatos em ". str_replace("'","",$val) ."' {$arq_out}.jpg ";
			exec("/bin/montage $cmd \n");

			# Insere a marca d'agua
			$cmd = '/bin/composite -gravity SouthWest /WWW/saiba-em-quem-votar.com.br/docs/marcadagua/marca-dagua.png';
			exec("$cmd {$arq_out}.jpg {$arq_out}.jpg");

			# Otimizar foto
			exec("/usr/local/bin/jpegoptim -m88 {$arq_out}.jpg");

			$i++;
		}

		$iuf++;
		echo "\n\n\t{$uffile}: estado processado... " . number_format( (($iuf * 100) / $iufmax), 2, ',','') . "% do Brasil\n";
		unset($aLinhas, $aCand, $sDados, $aCidades);
	}
