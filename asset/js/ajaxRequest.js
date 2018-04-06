var ajaxData = [];

fetch('traitement.php')
.then(function(response) {
  return response.json();
})
.then(function(data) {
	// data = JSON.parse(data);
  data.forEach(function(a){
  	ajaxData.push(a);
  });
  console.log('taille dans fetch : ' + ajaxData.length);
  for ( let valeur of ajaxData){
  	traitementValeur(valeur);
	}
  
 
});