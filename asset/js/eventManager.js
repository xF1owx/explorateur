
fileExploElt.addEventListener('click', function(event){
				console.log(event.target.textContent);
				if (event.target.classList.includes("resultatNom")){
					resetExplorateur();
					requeteAjax(event.target.textContent);
				}
				
				
				event.preventDefault();
			});