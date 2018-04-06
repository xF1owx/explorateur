function requeteAjax(chemin){
  if (!chemin) chemin = "";
  if (chemin.includes(".")) ouvrirFichier(chemin);
  let pathToExplore = 'traitement.php';
  if ((chemin != "") && (!chemin.includes("."))){
    pathToExplore += "?chemin="+chemin;
  }
  var ajaxData = [];

  fetch(pathToExplore)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    data.forEach(function(a){
      ajaxData.push(a);
    });
    console.log(ajaxData);
    console.log('taille dans fetch : ' + ajaxData.length);
    for ( let valeur of ajaxData){
      traitementValeur(valeur);
    }
  });
}


