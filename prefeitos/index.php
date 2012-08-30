<?php

	if(!isset($_GET['img']))
	{
		header('501 Not Implemented');
		die;
	}

	$arq = $_GET['img'];

	$tmp = explode("_", $arq);
	if(sizeof($tmp) < 2)
	{
		header('HTTP/1.0 412 Precondition Failed');
		die;
	}

	$dir = $_SERVER['DOCUMENT_ROOT'] . '/prefeitos/';
	#http://seqv.bagual.net/mosaico/rs/porto-alegre.jpg
	#http://seqv.bagual.net/prefeitos/porto-alegre_rs.jpg
	$cid = $tmp[0];
	$uf = substr($tmp[1], 0, -4);
	if(!file_exists("{$dir}{$uf}/{$cid}.jpg"))
	{
		header("HTTP/1.0 404 Not Found");
		die;
	}

	$expire=60*60*24*100;// seconds, minutes, hours, days
	header('Pragma: public');
	header('Cache-Control: maxage='.$expire);
	header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$expire) . ' GMT');
	header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
	header('Content-type: image/jpeg');

	readfile("{$dir}{$uf}/{$cid}.jpg");
