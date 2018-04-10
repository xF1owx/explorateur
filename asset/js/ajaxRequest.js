fetch('traitement.php').then(function(response){ //**je récupère ma liste encodée en json **//
  return response.json();
  }).then (function (tableau){
  for (element in tableau){
  document.getElementById("container").innerHTML += ' ' +'<div class="folder"> <a href="">' +tableau[element]+ '</a>' +' </div> </br>';
  }
  
  
  }) 