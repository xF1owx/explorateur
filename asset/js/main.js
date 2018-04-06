let fileExploElt = document.querySelector('#explorateur');

function FileConvertSize(aSize){
	if (aSize > 0){
		aSize = Math.abs(parseInt(aSize, 10));
		var def = [[1, 'octets'], [1024, 'ko'], [1024*1024, 'Mo'], [1024*1024*1024, 'Go'], [1024*1024*1024*1024, 'To']];
		for(var i=0; i<def.length; i++){
			if(aSize<def[i][0]) return (aSize/def[i-1][0]).toFixed(2)+' '+def[i-1][1];
		}	
	}	
}

function traitementValeur({nom, type, lastChange, lastView, taille}){
	if ((nom == ".") && (type == "directory")) traitementDossierCourant(nom, taille);
	if (nom == "..") traitementParent(nom);
		if (type != "directory"){
			traitementFichier({nom, type, lastChange, lastView, taille});
		} else {
			if ((nom != ".") && (nom != "..")){
				traitementDossier({nom, type, lastChange, lastView, taille});
			}
			
		}
}
function eltDom(type, name, className){
	let noeud = document.createElement(type);
	noeud.className = className;
	noeud.textContent = name;
	return noeud;
}
function traitementDossierCourant(nom, taille){
	let nomDossierElt = document.querySelector('div.nomDossierCourant');
	let tailleDossierElt = document.querySelector('div.tailleCourant');
	nomDossierElt.appendChild(eltDom('h3', nom, 'titreHeaderExplorateur'));
	tailleDossierElt.appendChild(eltDom('p', taille, 'tailleHeaderExplorateur'));
	console.log('coucou');
}
function traitementParent(nom){

}
function traitementFichier({nom, type, lastChange, lastView, taille}){
	let articleResultatElt = eltDom('article', "", 'resultatExplorateur');
	articleResultatElt.appendChild(eltDom('p', nom, 'resultatNom'));
	articleResultatElt.appendChild(eltDom('p', type, 'resultatType'));
	articleResultatElt.appendChild(eltDom('p', lastChange, 'resultatDerniereModif'));
	articleResultatElt.appendChild(eltDom('p', lastView, 'resultatDernierVue'));
	articleResultatElt.appendChild(eltDom('p', FileConvertSize(taille), 'resultatTaille'));
	return fileExploElt.appendChild(articleResultatElt);
}
function traitementDossier({nom, type, lastChange, lastView, taille}){
	let articleResultatElt = eltDom('article', "", 'resultatExplorateur');
	articleResultatElt.appendChild(eltDom('p', nom, 'resultatNom'));
	articleResultatElt.appendChild(eltDom('p', type, 'resultatType'));
	articleResultatElt.appendChild(eltDom('p', lastChange, 'resultatDerniereModif'));
	articleResultatElt.appendChild(eltDom('p', lastView, 'resultatDernierVue'));
	articleResultatElt.appendChild(eltDom('p', "", 'resultatTaille'));
	return fileExploElt.appendChild(articleResultatElt);
}
function resetExplorateur(){
	document.querySelector('div.nomDossierCourant').innerHTML = "";
	document.querySelector('div.tailleCourant').innerHTML = "";
	document.querySelectorAll('article.resultatExplorateur').forEach(article => fileExploElt.removeChild(article));
	
}
function ouvrirFichier(fichier){

}

requeteAjax('./');
