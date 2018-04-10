//  eventManager.js se charge de toute la gestion d'événnement de l'explorateur de fichier
// Evennement sur double clic
fileExploElt.addEventListener('dblclick', function(event){
	// teste si le premier enfant de la cible est bien un .resultatNom
		if (event.target.parentNode.firstElementChild.classList.contains("resultatNom")){
			resetExplorateur();
			// on récupère le chemin choisit
			let pathChoose = event.target.parentNode.firstElementChild.textContent;
			// initialise req et constructPath
			let req = "";
			let constructPath;
			// si c'est un fichier html ou php on l'ouvre via Js
			if ((pathChoose.split(".").includes("html")) || (pathChoose.split(".").includes("php"))){
				if (pointeurDir.length){
						constructPath = pointeurDir.reduce( (a, b)=>  a + "/" + b);
						constructPath = "/" + constructPath;
				} else {
					constructPath = "";
				}
				pointeurDir = [];
				window.location = constructPath + "/" + pathChoose;
			}
			// si c'est le lien parent, remarquez le pop sur pointeurDir
			if (pathChoose == ".."){
				if (pointeurDir.length){
					pointeurDir.pop(pathChoose);
					if (pointeurDir.length){
						constructPath = pointeurDir.reduce( (a, b)=>  a + "/" + b);
						req = constructPath;
					} else {
						req = "..";
					}					
				} else {
					req = "..";
				}
			// si c'est un dossier du dossier courant
			} else {
				if (pointeurDir.length){
					constructPath = pointeurDir.reduce( (a, b)=>  a + "/" + b);
					req = constructPath + "/" + pathChoose;
				} else {
					req = pathChoose;
				}
				// push sur pointeurDir
				pointeurDir.push(pathChoose);
			}
			console.log(req);
			console.log(pointeurDir);
			// on renvoie une requête AJAX avec un chemin pré-calculé dans req
			requeteAjax(req);
		}			
	// event.stopPropagation();
	event.preventDefault();
});
fileExploElt.addEventListener('click', function(event){
	let eltTarget = event.target;
	let eltTargetTag = event.target.tagName;
	console.log(event.target.tagName);
	if (eltTargetTag == 'H5'){
		eltTarget = eltTarget.parentNode;
		console.log(eltTarget);
	}
	if (eltTarget.tagName == 'DIV'){
		if (eltTarget.parentNode.classList.contains("categoriesColonnes")){
			let classeCible = eltTarget.classList;
			if (pointeurDir.length){
					constructPath = pointeurDir.reduce( (a, b)=>  a + "/" + b);
					req = constructPath;
				} else {
					req = "..";
				}
			console.log(`classe div = ${classeCible}`);
			if (classeCible.contains("colonneNom")){
				console.log('colonneNom');
			}
			if (classeCible.contains("colonneType")){
				console.log('colonneType');
				resetExplorateur();
				if (!triType){
					triType = true;
					requeteAjax(req, "tri=typeTrue");
				} else {
					triType = false;
					requeteAjax(req, "tri=typeFalse");
				}
			}
			if (classeCible.contains("colonneLastModif")){
				console.log('colonneLastModif');
			}
			if (classeCible.contains("colonneLastView")){
				console.log('colonneLastView');
			}
			if (classeCible.contains("colonneTaille")){
				console.log('colonneTaille');
			}
			
		}
	}
});