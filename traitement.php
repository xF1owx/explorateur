<?php
function retour(){
	// test $_GET pour changement de dossier
	if ((isset($_GET['chemin'])) && (!empty($_GET['chemin']))){
		$d = dir($_GET['chemin']);
	} else {
		$d = dir(".");
	}
	

	$traitement = array();
	while (false !== ($entry = $d->read())) {
		// if (($entry==".")||($entry=="..")) continue;
		if ((is_dir($entry)) && ($entry==".")){
			$taille = disk_total_space($entry);
		} elseif (is_dir($entry)) {
			$taille = 0;
		} else {
			$taille = filesize($entry);
		}
	   	$traitement[] = array( 	"nom" => $entry,
	   							"type" => mime_content_type($entry),
	   							"lastChange" => date ("d-Y H:i:s.", filemtime($entry)),
	   							"lastView" => date ("d-Y H:i:s.", filectime($entry)),
	   							"taille" => $taille
	   						);
	}
	$traitement = json_encode($traitement);
	$d->close();
	return $traitement;
}

echo retour();
?>