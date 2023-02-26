

//const resultGridOutput = document.getElementById('result-grid');

var searchTerm;

// load characters from API


async function loadCharsOutput(query){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const character = urlParams.get('character')
    console.log(character);
    query = character;
    const URL = `https://gateway.marvel.com:443/v1/public/characters/${query}?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`
    const response = await fetch(`${URL}`);
    const data = await response.json();
    console.log(data.data.results);
    //displayCharList(data.data.results);
    displayCharDetailsUpdate(data.data.results)
}

function displayCharDetailsUpdate(data){

    const name = document.getElementById('name')
    name.innerHTML = data[0].name;

    const description = document.getElementById('description')
    description.innerHTML = data[0].description;

    const comicsList = document.getElementById('comics-list-ul');
    for(let i = 0 ; i < data[0].comics.items.length ; i++){
        const comicName = data[0].comics.items[i].name;
        let comicListElement = document.createElement('li');
        comicListElement.className = 'comic';
        comicListElement.innerHTML = comicName;
        comicsList.append(comicListElement);
    }

    const seriesList = document.getElementById('series-list-ul');
    for(let i = 0 ; i < data[0].series.items.length ; i++){
        const seriescName = data[0].series.items[i].name;
        let seriesListElement = document.createElement('li');
        seriesListElement.className = 'series';
        seriesListElement.innerHTML =seriescName;
        seriesList.append(seriesListElement);
    }

    const storiesList = document.getElementById('stories-list-ul');
    for(let i = 0 ; i < data[0].stories.items.length ; i++){
        const storiesName = data[0].stories.items[i].name;
        let storiesListElement = document.createElement('li');
        storiesListElement.className = 'stories';
        storiesListElement.innerHTML =storiesName;
        storiesList.append(storiesListElement);
    }

    const heroImage =document.getElementById('image-wrapper');
    const image = document.createElement('img');
    image.src = data[0].thumbnail.path+"."+data[0].thumbnail.extension;
    heroImage.appendChild(image);



}
loadCharsOutput()