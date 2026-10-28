
const pokemonList = [
    { id: 1, name: "Bulbasaur", types: ["grass", "poison"], desc: "Um Pokémon que cresce absorvendo energia solar pela semente em suas costas." },
    { id: 2, name: "Ivysaur", types: ["grass", "poison"], desc: "A planta em suas costas cresce à medida que acumula energia." },
    { id: 3, name: "Venusaur", types: ["grass", "poison"], desc: "Sua enorme flor absorve energia solar." },
    { id: 4, name: "Charmander", types: ["fire"], desc: "A chama em sua cauda indica sua energia vital." },
    { id: 5, name: "Charmeleon", types: ["fire"], desc: "Um Pokémon de fogo que luta com grande intensidade." },
    { id: 6, name: "Charizard", types: ["fire", "flying"], desc: "Voa pelo céu e lança chamas extremamente quentes." },
    { id: 7, name: "Squirtle", types: ["water"], desc: "Usa seu casco para se proteger e dispara água pela boca." },
    { id: 8, name: "Wartortle", types: ["water"], desc: "Um Pokémon aquático ágil, com uma cauda que lembra uma nuvem." },
    { id: 9, name: "Blastoise", types: ["water"], desc: "Dispara jatos de água poderosos pelos canhões de seu casco." },
    { id: 25, name: "Pikachu", types: ["electric"], desc: "Armazena eletricidade nas bochechas e libera poderosos choques." },
    { id: 51, name: "Dugtrio", types: ["ground"], desc: "Três Pokémon unidos que escavam túneis rapidamente." },
    { id: 52, name: "Meowth", types: ["normal"], desc: "Adora objetos brilhantes e moedas." },
    { id: 66, name: "Machop", types: ["fighting"], desc: "Treina constantemente para aumentar sua força física." },
    { id: 67, name: "Machoke", types: ["fighting"], desc: "Possui músculos poderosos e grande resistência." },
    { id: 68, name: "Machamp", types: ["fighting"], desc: "Usa seus quatro braços para executar golpes impressionantes." },
    { id: 92, name: "Gastly", types: ["ghost", "poison"], desc: "É formado principalmente por gás e pode atravessar paredes." },
    { id: 93, name: "Haunter", types: ["ghost", "poison"], desc: "Esconde-se nas sombras e assusta quem se aproxima." },
    { id: 94, name: "Gengar", types: ["ghost", "poison"], desc: "Adora se esconder nas sombras para surpreender os outros." },
    { id: 133, name: "Eevee", types: ["normal"], desc: "Pode evoluir para diferentes formas dependendo das condições." },
    { id: 134, name: "Vaporeon", types: ["water"], desc: "É capaz de se misturar à água e nadar com facilidade." },
    { id: 135, name: "Jolteon", types: ["electric"], desc: "Acumula eletricidade e dispara descargas rápidas." },
    { id: 136, name: "Flareon", types: ["fire"], desc: "Armazena calor em seu corpo e pode liberar ar muito quente." },
    { id: 196, name: "Espeon", types: ["psychic"], desc: "Usa seus poderes psíquicos para prever movimentos." },
    { id: 197, name: "Umbreon", types: ["dark"], desc: "Seus anéis brilham quando ele se prepara para agir à noite." },
    { id: 470, name: "Leafeon", types: ["grass"], desc: "Seu corpo realiza fotossíntese, como uma planta." },
    { id: 471, name: "Glaceon", types: ["ice"], desc: "Consegue diminuir a temperatura ao seu redor e criar cristais de gelo." },
    { id: 700, name: "Sylveon", types: ["fairy"], desc: "Usa suas fitas para transmitir tranquilidade e criar laços." }
];


const typeNames = {
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
    bug: "Inseto",
    rock: "Pedra",
    ghost: "Fantasma",
    dragon: "Dragão",
    dark: "Sombrio",
    steel: "Aço",
    fairy: "Fada"
};

function typeBadges(types) {
    return types.map(type =>
        `<span class="type-badge type-${type}">
            ${typeNames[type] || type}
        </span>`
    ).join("");
}

function pokemonCard(pokemon) {
    return `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
            <article class="card pokemon-card">
                <div class="pokemon-art">
                    <img
                        loading="lazy"
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"
                        alt="${pokemon.name}"
                        onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png'">
                </div>

                <div class="card-body">
                    <div class="pokemon-number">
                        Nº ${String(pokemon.id).padStart(3, "0")}
                    </div>

                    <h3 class="pokemon-name h4">${pokemon.name}</h3>

                    <div class="mb-3">
                        ${typeBadges(pokemon.types)}
                    </div>

                    <p class="text-secondary small">${pokemon.desc}</p>

                    <button
                        class="btn btn-outline-primary rounded-pill fw-bold"
                        onclick="showPokemonInfo(${pokemon.id})">
                        Ver detalhes
                    </button>
                </div>
            </article>
        </div>
    `;
}

function setupPokedex() {
    const grid = document.getElementById("pokemonGrid");

    if (!grid) return;

    const search = document.getElementById("pokemonSearch");
    const type = document.getElementById("typeFilter");
    const count = document.getElementById("resultCount");

    function render() {
        const term = search.value.trim().toLowerCase();
        const selectedType = type.value;

        const results = pokemonList.filter(pokemon => {
            const matchesName = pokemon.name.includes(term);
            const matchesType =
                selectedType === "" ||
                pokemon.types.includes(selectedType);

            return matchesName && matchesType;
        });

        grid.innerHTML = results.map(pokemonCard).join("");

        count.textContent =
            `${results.length} Pokémon encontrados`;

        if (results.length === 0) {
            grid.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-warning">
                        Nenhum Pokémon encontrado.
                        Tente outro nome ou tipo.
                    </div>
                </div>
            `;
        }
    }

    search.addEventListener("input", render);
    type.addEventListener("change", render);

    render();
}

function showPokemonInfo(id) {
    const pokemon = pokemonList.find(item => item.id === id);
    const area = document.getElementById("pokemonInfo");

    if (!pokemon || !area) return;

    area.innerHTML = `
        <div class="alert alert-primary d-flex align-items-center gap-3"
             role="status" aria-live="polite">

            <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
                alt="${pokemon.name}"
                width="72"
                height="72">

            <div>
                <h3 class="h5 fw-bold text-capitalize">
                    ${pokemon.name}
                </h3>

                <p class="mb-2">${pokemon.desc}</p>

                ${typeBadges(pokemon.types)}
            </div>

            <button
                class="btn-close ms-auto"
                aria-label="Fechar informações"
                onclick="document.getElementById('pokemonInfo').innerHTML=''">
            </button>
        </div>
    `;

    area.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupPokedex();
    setupQuiz();
});
