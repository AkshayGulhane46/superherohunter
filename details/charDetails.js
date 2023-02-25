

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
    const result = document.getElementById('Output');
    result.innerHTML = data[0].name;
}
loadCharsOutput()