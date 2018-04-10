// requête AJAX générée par fetch()
// envoi du nouveau chemin au serveur par $_GET['chemin']
function requeteAjax(chemin, tri = ""){
  if (!chemin) chemin = "";
  let pathToExplore = 'traitement.php';
  if ((chemin != "") && (!chemin.includes("."))){
    pathToExplore += "?chemin=/"+chemin+"/";
  }
  if (tri != "") {
    if (pathToExplore.includes("?")){
      pathToExplore += "&" + tri;
    } else {
      pathToExplore += "?" + tri;
    }
  }
  console.log(pathToExplore);
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


