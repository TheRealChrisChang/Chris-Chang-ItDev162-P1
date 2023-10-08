document.querySelector("#search").addEventListener("click", getPokemon);

//allows user to search with any upper or lowercase
//corrects the input for the API to fetch the correct data
function capitalizeFirstLetter(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//allows user to search with any upper or lowercase
//corrects the input for the API to fetch the correct data
function lowerCaseName(string) 
{
    return string.toLowerCase();
}

//on click function when user enters data
function getPokemon(e) 
{
    const name = document.querySelector("#pokemonName").value;
    const pokemonName = lowerCaseName(name);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
        document.querySelector(".pokemonBox").innerHTML = `
        <div>
            <img
            src="${data.sprites.other["official-artwork"].front_default}"
            alt="Pokemon name"
            />
        </div>
        <div class="pokemonInfo">
            <h1>${capitalizeFirstLetter(data.name)}</h3>
            <p>Weight: ${((data.weight*0.1) * 2.205).toFixed(2)} lbs</p>
            <p>Height: ${(data.height/2.54).toFixed(2)} ft </p>
        </div>`;
        //had to convert the measurements from the API to imperial since the data was in metric
        //rounded it to the nearest 100th place
    })
    .catch((err) => {
        document.querySelector(".pokemonBox").innerHTML = `
        <h4>Pokemon not found</h4>
        `;
        console.log("Pokemon not found", err);
    });

    //prevents the function to trigger automatically and waits for user input
    e.preventDefault();
}