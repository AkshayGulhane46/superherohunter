const charSearchBox = document.getElementById('char-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

var searchTerm;

// load characters from API

async function loadChars(query){
    const URL = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`
    const response = await fetch(`${URL}`);
    const data = await response.json();
    console.log(data.data.results);
    displayCharList(data.data.results);
}

function findChars(){
    let searchTerm = (charSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadChars(searchTerm);
    }else{
        searchList.classList.add('hide-search-list');
    }
    console.log(searchTerm);
}

function displayCharList(chars){
    console.log("inside display char")
    searchList.innerHTML = "";
    for(let idx = 0 ; idx < chars.length ; idx++){

        // create a URL for each of the search Results 

        let redirectLink = document.createElement('a');
        let charListItem = document.createElement('div');
        redirectLink.innerHTML = "Link";
        redirectLink.href = "details/charDetails.html?character=" + chars[idx].id;

        charListItem.dataset.id = chars[idx].id;
        charListItem.className='search-list-item';
        charListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${chars[idx].thumbnail.path + "." + chars[idx].thumbnail.extension}">
        </div>
        <div class="search-item-info"> 
            
            <a href = ${ "details/charDetails.html?character=" + chars[idx].id }> <h3>${chars[idx].name}</h3> </a>
         
            <button onClick="addtoFavs()"> Like </button>
           
        </div>`;

    
        searchList.append(charListItem);
    }
    loadCharDetails();
}


function loadCharDetails(){
    const searchConstList = searchList.querySelectorAll('.search-list-item');
    searchConstList.forEach(character =>{
        console.log(character);
        character.addEventListener('click' ,async()=>{
           // console.log("inside load char Details");
            //console.log(character.dataset.id);
            searchConstList.className = ('hide-search-list');
            charSearchBox.value = "";
            const result = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${character.dataset.id}?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`)
            const charDetails = await result.json();
            console.log(charDetails);
            addtoFavs(charDetails);
        })
    })
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.className = 'hide-search-list';
    }else{
        searchList.className = 'search-list';
    }
});


// add a hero to favourites
function addtoFavs(charDetails){
  let id = charDetails.data.results[0].id;
  let favs = getFavs();
  if(!favs.includes(id)){
    favs.push(id);
  }
  localStorage.setItem('favHeros', JSON.stringify(favs));
    console.log(charDetails);
//   e.target.innerHTML = 'Remove from favourites';
//   e.target.removeEventListener('click', addToFavourites);
//   e.target.addEventListener('click', removeFromFavourites);
}

// retrieve a list of favourite hero id's from local storage
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

// HomePage Hero Load 

async function homeLoadHeros(query){
    const URL = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`
    const response = await fetch(`${URL}`);
    const data = await response.json();
    console.log(data.data.results);
    displayLoadHeros(data.data.results);
}

function displayLoadHeros(data){

}


homeLoadHeros();
