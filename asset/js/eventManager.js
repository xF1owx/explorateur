
fileExploElt.addEventListener('click', function(event){
				// console.log(event.target.textContent);
				// console.log(event.target.parentNode.firstElementChild.textContent);
					resetExplorateur();
					let pathChoose = event.target.parentNode.firstElementChild.textContent;
					let req = "";
					let constructPath;
					if (pathChoose == ".."){
						if (pointeurDir.length){
							pointeurDir.pop(pathChoose);
							if (pointeurDir.length){
								constructPath = pointeurDir.reduce( (a, b)=>  a + "/" + b);
								req = constructPath;
							} else {
								req = "..";
							}
							
							// req = pointeurDir[pointeurDir.length-1];
							
						} else {
							req = "..";
						}
					} else {
						if (pointeurDir.length){
							constructPath = pointeurDir.reduce( (a, b)=>  a + "/" + b);
							req = constructPath + "/" + pathChoose;
							// req = pointeurDir[pointeurDir.length-1] + '/' + pathChoose;
						} else {
							req = pathChoose;
						}
						pointeurDir.push(pathChoose);
					}
					console.log(req);
					console.log(pointeurDir);
					requeteAjax(req);

				
				// event.stopPropagation();
				event.preventDefault();
			});