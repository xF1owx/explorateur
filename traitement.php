<?php
// fonction retournant le contenu d'un dossier
// Position initiale dans l'arbre = DOCUMENT_ROOT
// Gestion changement de dossier par $_GETchemin
//retourne tableau d'objet du contenu du dossier
function retour(){
	// test $_GET pour changement de dossier
	if ((isset($_GET['chemin'])) && (!empty($_GET['chemin']))){
		// création d'un instance de directory
		$d = dir($_SERVER['DOCUMENT_ROOT'].$_GET['chemin']);
		// change de dossier avec chdir et pointe dessus
		chdir($_SERVER['DOCUMENT_ROOT'].$_GET['chemin']);
	// Si pas $_GETchemin positionne directory sur adresse serveur
	} else {
		$d = dir($_SERVER['DOCUMENT_ROOT']);
		chdir($_SERVER['DOCUMENT_ROOT']);
	}
	// boucle de traitement du stream directory
	// read() lit les ressources contenues dans $d
	$traitement = array();
	while (false !== ($entry = $d->read())) {
		if ((is_dir($entry)) && ($entry==".")){
			//recupère l'espace disponible
			$taille = disk_total_space($entry);
		} elseif (is_dir($entry)) {
			$taille = 0;
		} else {
			// ou la taille d'un fichier
			$taille = filesize($entry);
		}
		// On remplit le tableau par un nouveau tableau pour chaque dossier/fichier du dossier courant
		// on récupère le MIME type, la dernière modif et la dernière vue -> traitement date Unix par fonction date()
	   	$traitement[] = array( 	"currentDirectory" => 						getcwd(),
	   							"nom" => $entry,
	   							"type" => mime_content_type($entry),
	   							"lastChange" => filemtime($entry),
	   							"lastView" => fileatime($entry),
	   							"taille" => $taille
	   						);
	}
	if ((isset($_GET['tri'])) && ($_GET['tri'] == 'typeTrue')){
		array_multisort (array_column($traitement, 'type'), SORT_ASC, $traitement);
	} elseif ((isset($_GET['tri'])) && ($_GET['tri'] == 'typeFalse')) {
		array_multisort (array_column($traitement, 'type'), SORT_DESC, $traitement);
	}
	if ((isset($_GET['tri'])) && ($_GET['tri'] == 'nomTrue')){
		array_multisort (array_column($traitement, 'nom'), SORT_ASC, $traitement);
	} elseif ((isset($_GET['tri'])) && ($_GET['tri'] == 'nomFalse')) {
		array_multisort (array_column($traitement, 'nom'), SORT_DESC, $traitement);
	}
	if ((isset($_GET['tri'])) && ($_GET['tri'] == 'tailleTrue')){
		array_multisort (array_column($traitement, 'taille'), SORT_ASC, $traitement);
	} elseif ((isset($_GET['tri'])) && ($_GET['tri'] == 'tailleFalse')) {
		array_multisort (array_column($traitement, 'taille'), SORT_DESC, $traitement);
	}
	if ((isset($_GET['tri'])) && ($_GET['tri'] == 'lastModifTrue')){
		array_multisort (array_column($traitement, 'lastChange'), SORT_ASC, $traitement);
	} elseif ((isset($_GET['tri'])) && ($_GET['tri'] == 'lastModifFalse')) {
		array_multisort (array_column($traitement, 'lastChange'), SORT_DESC, $traitement);
	}
	if ((isset($_GET['tri'])) && ($_GET['tri'] == 'lastViewTrue')){
		array_multisort (array_column($traitement, 'lastView'), SORT_ASC, $traitement);
	} elseif ((isset($_GET['tri'])) && ($_GET['tri'] == 'lastViewFalse')) {
		array_multisort (array_column($traitement, 'lastView'), SORT_DESC, $traitement);
	}
	$array_length = count($traitement);
	for ($i=0; $i < $array_length; $i++) { 
		$traitement[$i]["lastChange"] = date("d-m-Y H:i:s.", $traitement[$i]["lastChange"]);
		$traitement[$i]["lastView"] = date("d-m-Y H:i:s.", $traitement[$i]["lastView"]);
	}
	// transforme le tableau de tableau $traitement en tableau d'objets au format JSON 
	$traitement = json_encode($traitement);
	// ferme l'instance de directory
	$d->close();
	// retourne le tableau d'objet Json $traitement
	return $traitement;
}
// affiche retour() voir plus haut
echo retour();
?>