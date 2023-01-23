fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => generateCards(data.results));

function generateCards(results: any) {
    const cardContainer = document.querySelector('#card-container');

    results.forEach((character: any) => {
        const card = document.createElement('article');
        card.classList.add('characterCard__Wrapper');
        card.innerHTML = `<div class="characterCard__ImgWrapper">
        <img src="${character.image}" alt="${character.name}">
        </div>
        <div class="characterCard__ContentWrapper">
        <div class="section">
        <a href="${character.url}" rel="noopener noreferrer" target="_blank" class="externalLink">
        <h2>${character.name}</h2>
        </a><span class="status"><span class="status__icon status__icon--${character.status.toLowerCase()}"></span> ${character.status} - ${character.species}</span>
        </div>
        <div class="section">
        <span class="text-gray">Last known location:</span><a href="${character.location.link}" rel="noopener noreferrer" target="_blank" class="externalLink">${character.location.name}</a>
        </div>
        <div class="section">
        <span class="text-gray">First seen in:</span>
        <a href="${character.origin.link}" rel="noopener noreferrer" target="_blank" class="externalLink">${character.origin.name}</a>
        </div>
        </div>
        </article>`

        cardContainer.appendChild(card);
    });
}

interface Character {
    created: string;
    episode: string[];
    gender: string;
    id: number;
    image: string;
    location: Location;
    name: string;
    origin: Location;
    species: string;
    status: string;
    [key: string]: any;
}

interface Location {
    name: string;
    url: string;
}