// main.js pour explorateur de fichier
// se charge des taches principale coté client
// inclut plusieurs fonctions se chargeant de l'affichage
// des différents éléments sur le screen client

// définition de deux variables
// fileExploElt contient l'élément DOM #explorateur
// pointeurDir est initialisé, c'est notre repère dans l'arboréscence
// chaque fois que l'on change de dossier on réajustera le contenu de pointeurDir
// cela nous permettera de trouver les bon chemins dans l'explorateur
let fileExploElt = document.querySelector('#explorateur');
let pointeurDir = [];
let triType = false;
// fonction d'aide pour convertir les tailles en chiffres humain
function FileConvertSize(aSize){
	if (aSize > 0){
		aSize = Math.abs(parseInt(aSize, 10));
		var def = [[1, 'octets'], [1024, 'ko'], [1024*1024, 'Mo'], [1024*1024*1024, 'Go'], [1024*1024*1024*1024, 'To']];
		for(var i=0; i<def.length; i++){
			if(aSize<def[i][0]) return (aSize/def[i-1][0]).toFixed(2)+' '+def[i-1][1];
		}	
	}	
}
function imageByType(type){
	let iconeElt = document.createElement('img');
	iconeElt.className = "iconeExplorateur";
	if (type == "directory") {
		// let iconeElt = document.createElement('img');
		iconeElt.src = "asset/img/svg/folder-3.svg";
		return iconeElt;
	}
	if (type.includes(".")){
		let fileExtension = type.split(".");
		fileExtension = fileExtension[fileExtension.length - 1];
		iconeElt.src = "asset/img/svg/" + fileExtension + ".svg";
		return iconeElt;
	}
}
// function unknownFile(){
// 	let iconeElt = document.createElement('img');
// 	iconeElt.src = "asset/img/svg/unknown-document.svg";
// 	return iconeElt;
// }
// traitementValeur est la fonction qui dispatch les contenus du dossier courant pour l'affichage
// 4 aiguillages possibles : dossier courant, dossier parent, dossiers et fichiers contenus dans le dossier exploré
function traitementValeur({currentDirectory, nom, type, lastChange, lastView, taille}){
	if ((nom == ".") && (type == "directory")) traitementDossierCourant(currentDirectory, nom, taille);
	if (nom == "..") traitementParent(nom);
		if (type != "directory"){
			traitementFichier({nom, type, lastChange, lastView, taille});
		} else {
			if ((nom != ".") && (nom != "..")){
				traitementDossier({nom, type, lastChange, lastView, taille});
			}			
		}
}
// fonction d'aide pour créer des éléments DOM
// @type: type d'élément à créer div, p, h2, a, article...
// @text: le texte contenu dans l'élément
// @className: le ou les classes à lui ajouter
function eltDom(type, text, className){
	let noeud = document.createElement(type);
	noeud.className = className;
	noeud.textContent = text;
	return noeud;
}
// affiche le dossier courant en header de section #explorateur
function traitementDossierCourant(currentDirectory, nom, taille){
	let nomDossierElt = document.querySelector('div.nomDossierCourant');
	let tailleDossierElt = document.querySelector('div.tailleCourant');
	nomDossierElt.appendChild(eltDom('h3', currentDirectory, 'titreHeaderExplorateur'));
	tailleDossierElt.appendChild(eltDom('p', FileConvertSize(taille), 'tailleHeaderExplorateur'));
	
}
// affiche le lien pour remonter au dossier parent
function traitementParent(nom){
	let articleResultatElt = eltDom('article', "", 'resultatExplorateur');
	articleResultatElt.appendChild(eltDom('p', nom, 'resultatNom'));
	articleResultatElt.appendChild(eltDom('p', "", 'resultatType'));
	articleResultatElt.appendChild(eltDom('p', "", 'resultatDerniereModif'));
	articleResultatElt.appendChild(eltDom('p', "", 'resultatDernierVue'));
	articleResultatElt.appendChild(eltDom('p', "", 'resultatTaille'));
	return fileExploElt.appendChild(articleResultatElt);
}
// affichage des fichiers contenus dans le dossier courant
function traitementFichier({nom, type, lastChange, lastView, taille}){
	let articleResultatElt = eltDom('article', "", 'resultatExplorateur');
	articleResultatElt.appendChild(eltDom('p', nom, 'resultatNom'));		
	articleResultatElt.appendChild(eltDom('p', "", 'resultatType')).appendChild(imageByType(nom));	
	articleResultatElt.appendChild(eltDom('p', lastChange, 'resultatDerniereModif'));
	articleResultatElt.appendChild(eltDom('p', lastView, 'resultatDernierVue'));
	articleResultatElt.appendChild(eltDom('p', FileConvertSize(taille), 'resultatTaille'));
	return fileExploElt.appendChild(articleResultatElt);
}
// affichage des dossiers contenus dans le dossier courant
function traitementDossier({nom, type, lastChange, lastView, taille}){
	let articleResultatElt = eltDom('article', "", 'resultatExplorateur');
	articleResultatElt.appendChild(eltDom('p', nom, 'resultatNom'));
	articleResultatElt.appendChild(eltDom('p', "", 'resultatType')).appendChild(imageByType(type));
	articleResultatElt.appendChild(eltDom('p', lastChange, 'resultatDerniereModif'));
	articleResultatElt.appendChild(eltDom('p', lastView, 'resultatDernierVue'));
	articleResultatElt.appendChild(eltDom('p', "", 'resultatTaille'));
	return fileExploElt.appendChild(articleResultatElt);
}
// réinitialise l'affichage de la section #explorateur pour nouveau dossier 
function resetExplorateur(){
	document.querySelector('div.nomDossierCourant').innerHTML = "";
	document.querySelector('div.tailleCourant').innerHTML = "";
	document.querySelectorAll('article.resultatExplorateur').forEach(article => fileExploElt.removeChild(article));
	
}
// appel à requeteAjax avec en argument le dossier courant
requeteAjax('./');
