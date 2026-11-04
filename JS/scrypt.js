var pokemonList = [
    { id: 1, name: "Bulbasaur", types: ["grass", "poison"], desc: "Um Pokémon que cresce absorvendo energia solar." },
    { id: 2, name: "Ivysaur", types: ["grass", "poison"], desc: "A planta em suas costas cresce conforme acumula energia." },
    { id: 3, name: "Venusaur", types: ["grass", "poison"], desc: "Sua enorme flor absorve energia solar." },
    { id: 4, name: "Charmander", types: ["fire"], desc: "A chama em sua cauda indica sua energia vital." },
    { id: 5, name: "Charmeleon", types: ["fire"], desc: "Um Pokémon de fogo que luta com intensidade." },
    { id: 6, name: "Charizard", types: ["fire", "flying"], desc: "Voa pelo céu e lança chamas quentes." },
    { id: 7, name: "Squirtle", types: ["water"], desc: "Usa seu casco para se proteger." },
    { id: 8, name: "Wartortle", types: ["water"], desc: "Um Pokémon aquático muito ágil." },
    { id: 9, name: "Blastoise", types: ["water"], desc: "Dispara jatos de água pelos canhões de seu casco." },
    { id: 25, name: "Pikachu", types: ["electric"], desc: "Armazena eletricidade nas bochechas." },
    { id: 51, name: "Dugtrio", types: ["ground"], desc: "Três Pokémon que escavam túneis." },
    { id: 52, name: "Meowth", types: ["normal"], desc: "Adora objetos brilhantes e moedas." },
    { id: 66, name: "Machop", types: ["fighting"], desc: "Treina constantemente para aumentar sua força." },
    { id: 67, name: "Machoke", types: ["fighting"], desc: "Possui músculos poderosos." },
    { id: 68, name: "Machamp", types: ["fighting"], desc: "Usa seus quatro braços para lutar." },
    { id: 92, name: "Gastly", types: ["ghost", "poison"], desc: "É formado principalmente por gás." },
    { id: 93, name: "Haunter", types: ["ghost", "poison"], desc: "Esconde-se nas sombras." },
    { id: 94, name: "Gengar", types: ["ghost", "poison"], desc: "Adora se esconder nas sombras." },
    { id: 133, name: "Eevee", types: ["normal"], desc: "Pode evoluir para diferentes formas." },
    { id: 134, name: "Vaporeon", types: ["water"], desc: "É capaz de se misturar à água." },
    { id: 135, name: "Jolteon", types: ["electric"], desc: "Acumula eletricidade em seu corpo." },
    { id: 136, name: "Flareon", types: ["fire"], desc: "Armazena calor em seu corpo." },
    { id: 196, name: "Espeon", types: ["psychic"], desc: "Usa poderes psíquicos para prever movimentos." },
    { id: 197, name: "Umbreon", types: ["dark"], desc: "Seus anéis brilham durante a noite." },
    { id: 470, name: "Leafeon", types: ["grass"], desc: "Seu corpo realiza fotossíntese." },
    { id: 471, name: "Glaceon", types: ["ice"], desc: "Consegue criar cristais de gelo." },
    { id: 700, name: "Sylveon", types: ["fairy"], desc: "Usa suas fitas para transmitir tranquilidade." }
];

var typeNames = {
    normal: "Normal",
    fire: "Fogo",
    water: "Água",
    electric: "Elétrico",
    grass: "Planta",
    ice: "Gelo",
    fighting: "Lutador",
    poison: "Venenoso",
    ground: "Terrestre",
    flying: "Voador",
    psychic: "Psíquico",
    ghost: "Fantasma",
    dark: "Sombrio",
    fairy: "Fada"
};

function typeBadges(types) {
    var badges = "";

    for (var i = 0; i < types.length; i++) {
        badges += '<span class="type-badge type-' + types[i] + '">';
        badges += typeNames[types[i]];
        badges += '</span>';
    }

    return badges;
}

function pokemonCard(pokemon) {
    var numero = pokemon.id;

    if (numero < 10) {
        numero = "00" + numero;
    } else if (numero < 100) {
        numero = "0" + numero;
    }

    var card = "";

    card += '<div class="col-12 col-sm-6 col-lg-4 col-xl-4">';
    card += '<article class="card pokemon-card">';

    card += '<div class="pokemon-art">';
    card += '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + pokemon.id + '.png" alt="' + pokemon.name + '">';
    card += '</div>';

    card += '<div class="card-body">';
    card += '<div class="pokemon-number">Nº ' + numero + '</div>';
    card += '<h3 class="pokemon-name h4">' + pokemon.name + '</h3>';

    card += '<div class="mb-3">';
    card += typeBadges(pokemon.types);
    card += '</div>';

    card += '<p class="text-secondary small">' + pokemon.desc + '</p>';

    card += '<button class="btn btn-outline-primary rounded-pill fw-bold" onclick="showPokemonInfo(' + pokemon.id + ')">';
    card += 'Ver detalhes';
    card += '</button>';

    card += '</div>';
    card += '</article>';
    card += '</div>';

    return card;
}

function setupPokedex() {
    var grid = document.getElementById("pokemonGrid");
    var search = document.getElementById("pokemonSearch");
    var type = document.getElementById("typeFilter");
    var count = document.getElementById("resultCount");

    if (grid == null) {
        return;
    }

    function render() {
        var nome = search.value.toLowerCase();
        var tipo = type.value;

        var resultado = "";
        var quantidade = 0;

        for (var i = 0; i < pokemonList.length; i++) {
            var pokemon = pokemonList[i];

            var nomeEncontrado = pokemon.name.toLowerCase().indexOf(nome) != -1;
            var tipoEncontrado = false;

            if (tipo == "") {
                tipoEncontrado = true;
            }

            for (var j = 0; j < pokemon.types.length; j++) {
                if (pokemon.types[j] == tipo) {
                    tipoEncontrado = true;
                }
            }

            if (nomeEncontrado && tipoEncontrado) {
                resultado += pokemonCard(pokemon);
                quantidade++;
            }
        }

        grid.innerHTML = resultado;
        count.innerHTML = quantidade + " Pokémon encontrados";

        if (quantidade == 0) {
            grid.innerHTML = '<div class="col-12"><p>Nenhum Pokémon encontrado.</p></div>';
        }
    }

    search.onkeyup = render;
    type.onchange = render;

    render();
}

function showPokemonInfo(id) {
    var pokemon = null;

    for (var i = 0; i < pokemonList.length; i++) {
        if (pokemonList[i].id == id) {
            pokemon = pokemonList[i];
        }
    }

    if (pokemon == null) {
        return;
    }

    var area = document.getElementById("pokemonInfo");
    var info = "";

    info += '<div class="alert alert-primary d-flex align-items-center gap-3">';
    info += '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.id + '.png" width="72" height="72" alt="' + pokemon.name + '">';

    info += '<div>';
    info += '<h3 class="h5 fw-bold">' + pokemon.name + '</h3>';
    info += '<p>' + pokemon.desc + '</p>';
    info += typeBadges(pokemon.types);
    info += '</div>';

    info += '<button class="btn-close ms-auto" onclick="document.getElementById(\'pokemonInfo\').innerHTML = \'\'"></button>';

    info += '</div>';

    area.innerHTML = info;
    area.scrollIntoView();
}

window.onload = function() {
    setupPokedex();
};

function filterLegendary() {

    var search = document.getElementById("legendarySearch").value.toLowerCase();
    var type = document.getElementById("legendaryType").value;

    var pokemons = document.getElementsByClassName("legendary-item");

    var count = 0;

    for (var i = 0; i < pokemons.length; i++) {

        var name = pokemons[i].getAttribute("data-name");
        var types = pokemons[i].getAttribute("data-types");

        if (name.indexOf(search) != -1 && (type == "" || types.indexOf(type) != -1)) {

            pokemons[i].style.display = "";
            count++;

        } else {

            pokemons[i].style.display = "none";

        }
    }

    document.getElementById("legendaryCount").innerHTML =
        count + " Pokémon encontrados";

    if (count == 0) {
        document.getElementById("noLegendary").style.display = "block";
    } else {
        document.getElementById("noLegendary").style.display = "none";
    }
}
