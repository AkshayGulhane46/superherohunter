const queryString = window.location.search;
var queryStringUpdated = queryString.substring(1);
console.log(queryString);

function getCharacterDetails(){
    const url = 'http://gateway.marvel.com/v1/public/characters/' + queryStringUpdated  + '?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc'
    fetch(url).
    then(function(response){
        console.log(response);
        return response.json(); // .json will return a promis 
    }).then(function(data){
            let name = document.getElementById("superHeroName");
            
            for(let i = 0 ; i < data.data.results.length ; i++){
                name.innerHTML = data.data.results[i].name;
            }
    })


    .catch(function(error){
        console.log('error',error);
    })
}
getCharacterDetails();