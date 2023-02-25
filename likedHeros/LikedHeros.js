let favHeros = getFavs();

function showFavList() {
for(let i = 0 ; i < favHeros.length ; i++)
    {
        let parentContainer = document.getElementById("result-grid");
        let element = document.createElement('div');
        let name = document.createElement('p');
        name.id= favHeros[i];
        let removeLink = document.createElement('button');
        
        removeLink.className = "remove-hero";
        removeLink.innerHTML = "Remove from Favs";
        removeLink.addEventListener('click',removeFromFavourites);
        name.innerHTML = favHeros[i];

        showDetails(favHeros[i]);


        parentContainer.appendChild(element);
        element.appendChild(name);
        name.appendChild(removeLink);
    }   

}


function getFavs(){
    let favs;
    if(localStorage.getItem('favHeros') === null){
      favs = [];
    }
    else{
      favs = JSON.parse(localStorage.getItem('favHeros'));
    }
    return favs; 
}

async function removeFromFavourites(e){
    console.log("Remove button is preseed");
    let id = e.target.parentElement.id;
    let favs = getFavs();
  
    let updatedFavs = favs.filter(function(val){
      return val != id;
    })
    localStorage.setItem('favHeros', JSON.stringify(updatedFavs));
    location.reload();
  }




showFavList();

async function showDetails(query){
    const URL = `https://gateway.marvel.com:443/v1/public/characters/${query}?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`
    const response = await fetch(`${URL}`);
    const data = await response.json();
    console.log(data.data.results);
    //displayCharList(data.data.results);
    displayCharDetailsUpdate(data.data.results)
}

function displayCharDetailsUpdate(data){
    
}






