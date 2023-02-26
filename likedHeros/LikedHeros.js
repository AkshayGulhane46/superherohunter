let favHeros = getFavs();
console.log(favHeros.length);

let favListName = document.getElementById('fav-list-ul');

function showFavList() {
for(let i = 0 ; i < favHeros.length ; i++)
    {



    
        name.innerHTML = favHeros[i];

        showDetails(favHeros[i]);

    
        // parentContainer.appendChild(element);
        // element.appendChild(name);
        // name.appendChild(removeLink);

        async function showDetails(query){
          const URL = `https://gateway.marvel.com:443/v1/public/characters/${query}?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`
          const response = await fetch(`${URL}`);
          const data = await response.json();
          console.log(data.data.results);
          //displayCharList(data.data.results);
          displayCharDetailsUpdate(data.data.results)
      }
      
      function displayCharDetailsUpdate(data){
        console.log(data[0].name);

        
        console.log("inside update")
        let charListItem = document.createElement('div');
        charListItem.dataset.id = data[0].id;
        charListItem.id = 'fav-list-li';
        charListItem.innerHTML = 
        `<li id="single-hero">
          <div id="hero-info">
            <div id="top">
                <img src="${data[0].thumbnail.path + "." + data[0].thumbnail.extension }"></img>
            </div>
            <div id="bottom">
                <p id="hero-name"> ${ data[0].name }</p>
      
            </div>
          </div>
        </li>`

        let removeButton = document.createElement("button");
        removeButton.id = data[0].id;
        removeButton.addEventListener('click',removeFromFavourites);
        removeButton.innerHTML="Remove";

        
        charListItem.appendChild(removeButton);
        favListName.appendChild(charListItem);
          
      
    }   
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
 
    let id = e.target.id;
    console.log("Remove button is preseed for " + id);
    let favs = getFavs();
  
    let updatedFavs = favs.filter(function(val){
     return val != id;
    })
    localStorage.setItem('favHeros', JSON.stringify(updatedFavs));
    location.reload();
  }




showFavList();






