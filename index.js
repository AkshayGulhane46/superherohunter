let FavSuperheros = [];
let list = document.getElementById("home-superhero-list");

// function to call api 
function getSuperHeroOnHomePage(){
    const url = 'http://gateway.marvel.com/v1/public/characters?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc'
    fetch(url).
    then(function(response){
        console.log(response);
        return response.json(); // .json will return a promis 
    }).then(function(data){
        for(let i = 0 ; i < data.data.results.length ; i++){
            let li = document.createElement("li"); 
            li.className=data.data.results[i].name;
            li.innerHTML = data.data.results[i].name;
            list.appendChild(li);
        }
    })
    .catch(function(error){
        console.log('error',error);
    })
}
getSuperHeroOnHomePage();


function searchSuperHeroOnHomePage(){
    let searchList = document.getElementById("home-superhero-search-list");
    let query = document.getElementById("superhero-search-box").value;

    const url = 'http://gateway.marvel.com/v1/public/characters?nameStartsWith='+query+'&ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc'
    fetch(url).
    then(function(response){
        console.log(response);
        return response.json(); // .json will return a promis 
    }).then(function(data){
        for(let i = 0 ; i < data.data.results.length ; i++){
            let uniqueID = data.data.results[i].id;
            let li = document.createElement("li"); 
            let link = document.createElement("a");
            let favLink = document.createElement("button");

            link.className = data.data.results[i].name;
            link.innerHTML = data.data.results[i].name;
            link.href="file:///C:/SkillTests/superherohunter/superHeroDetail.html?"+uniqueID;
            link.target = "_blank";

            favLink.className = "like";
            favLink.innerHTML ="Like";
          
            li.className=data.data.results[i].name;

            li.appendChild(favLink);
            li.appendChild(link);
            searchList.appendChild(li);

            var likeBtns = document.getElementsByClassName("like"); // count the number of delete buttons on page
            var j;
            let value = "";
            likeBtns[i].addEventListener("click", function() { // make each delete button as different 
            value = likeBtns[i].parentElement.className;

            FavSuperheros.push(value); // value is taken from each delete button as className of parent 
            if (localStorage.getItem(value) === null) {
                console.log("New Added");
                localStorage.setItem(value,"SuperHero");
            }else{
                console.log("Already Liked");
            }
            });
        }
    })
    .catch(function(error){
        console.log('error',error);
    })
}

  

console.log(FavSuperheros);






