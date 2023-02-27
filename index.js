const charSearchBox = document.getElementById('char-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load characters from API
async function loadChars(query){
    const URL = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`
    const response = await fetch(`${URL}`);
    const data = await response.json();
    console.log(data.data.results);
    displayCharList(data.data.results);
}
// function to show and hide the search list if user types something
function findChars(){
    let searchTerm = (charSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadChars(searchTerm); // if user types something then search list will be displayed
    }else{
        searchList.classList.add('hide-search-list');
    }
    console.log(searchTerm);
}
// Function to display the list of Hero characters 
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

// To load the Char Details and add them to fav list
function loadCharDetails(){
    const searchConstList = searchList.querySelectorAll('.search-list-item');
    searchConstList.forEach(character =>{
        console.log(character);
        character.addEventListener('click' ,async()=>{
            searchConstList.className = ('hide-search-list');
            charSearchBox.value = "";
            const result = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${character.dataset.id}?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`)
            const charDetails = await result.json();
            console.log(charDetails);
            addtoFavs(charDetails);
        })
    })
}

// to blur the homepage hero list if user is searching for the Heros
let container = document.getElementById('home-container'); 
window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.className = 'hide-search-list';
        container.className = '';
    }else{
        searchList.className = 'search-list';
        container.className = 'blur';
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
   // console.log(charDetails);
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
    const URL = 'https://gateway.marvel.com:443/v1/public/characters?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc';
    const response = await fetch(`${URL}`);
    const data = await response.json();
  //  console.log(data.data.results);
    displayLoadHeros(data.data.results);
}
let HomeListName = document.getElementById('home-list-ul');
function displayLoadHeros(data){

    for(let i = 0 ; i < data.length ; i++)
    {
    let charListItem = document.createElement('div');
    charListItem.dataset.id = data[0].id;
    charListItem.id = 'home-list-li';
    charListItem.innerHTML = 
    `<li id="home-single-hero">
      <div id="home-hero-info">
        <div id="home-top">
            <img src="${data[i].thumbnail.path + "." + data[i].thumbnail.extension }"></img>
        </div>
        <div id="bottom">
            <p id="home-hero-name"> ${ data[i].name }</p>
  
        </div>
      </div>
    </li>`
    HomeListName.appendChild(charListItem)
    }
}

// function to load the API results on homepage
homeLoadHeros();
