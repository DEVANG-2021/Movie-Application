const APIurl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGurl = "https://image.tmdb.org/t/p/w1280/";
const searchAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const main = document.querySelector('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(APIurl);

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    
    console.log(respData);
    showmovies(respData.results);
}

function showmovies(movies){
    main.innerHTML="";
    movies.forEach((movie) => {
        const {poster_path, title, vote_average,overview} = movie;
        
        const movieE1 = document.createElement('div');
      
         movieE1.classList.add('movies');
         movieE1.innerHTML = ` <img src="${IMGurl + poster_path}" alt="">
         <div class="movie-info">
             <h3>${title}</h3>
             <span class="${getrate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                   <h3>Overview : </h3>
                   ${overview}
                </div>`;
        main.appendChild(movieE1);
    });
}

function getrate(vote){
   if(vote >= 8){
       return 'green';
   } else if(vote >= 5){
    return 'orange';
   }else{
       return 'red';
   }
}


form.addEventListener('submit',function(e){
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(searchAPI + searchTerm);
        searchterm="";
    }
})