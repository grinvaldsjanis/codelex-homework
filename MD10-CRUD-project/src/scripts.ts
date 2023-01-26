import { getCardsData, deleteCardData, editCardData, postCardData } from './client';

interface Card {
    id: number;
    image: string;
    title: string;
    description: string;
}


async function renderCards(cards: Card[]) {
    for (const card of cards) {
        renderCard(card);
    }
}

function renderCard(cardData: Card) {
    // Create new instance of card item HTML template
    const cardItem = document.createElement('article');
    cardItem.className = "card";
    cardItem.id = `card-${cardData.id}`
    cardItem.innerHTML = `
        <div class="card__id">${cardData.id}</div>
        <img class="card__image" src="${cardData.image}" alt="${cardData.title}">
        <div class="card__content">
        <h2 class="card__title">${cardData.title}</h2>
        <p class="card__desc">${cardData.description}</p>
        <div class="card__menu">
        <div class="card__button card__button--edit">Edit</div>
        <div class="card__button card__button--remove">Remove</div>
        </div>
        </div>
    `;

    document.querySelector('.cards-container').appendChild(cardItem);
    const editButton = cardItem.querySelector('.card__button--edit')
    editButton.addEventListener('click', () => editCard(cardData));

    const deleteButton = cardItem.querySelector('.card__button--remove');
    deleteButton.addEventListener('click', () => deleteCard(cardData.id));
}
//--------------------------DELETE-----------------------------

function deleteCard(id: number) {
    deleteCardData(id);
    const card = document.querySelector(`#card-${id}`);
    card.remove();
}
//--------------------------EDIT-------------------------------

function editCard(item: Card) {
    const card = document.querySelector(`#card-${item.id}`);
    const cardContent = card.querySelector('.card__content');
    cardContent.classList.add("card__content--hidden");

    const form = document.createElement('form');
    form.className = "card__form";
    card.appendChild(form);
    // create input fields for title and description
    const titleInput = document.createElement('input');
    titleInput.className = ("h2 card__input card__input--title");
    titleInput.value = item.title;
    form.appendChild(titleInput);
    //
    const descriptionInput = document.createElement('textarea');
    descriptionInput.className = ("card__input card__input--desc");
    descriptionInput.value = item.description;
    form.appendChild(descriptionInput);
    // menu with buttons
    const formMenu = document.createElement('div');
    formMenu.className = "card__menu";
    form.appendChild(formMenu);


    formMenu.innerHTML = `
        <div class="card__button card__button--save">Save</div>
        <div class="card__button card__button--cancel">Cancel</div>
    `;
    // Event on SAVE
    document.querySelector('.card__button--save').addEventListener('click', (event) => {
        event.preventDefault();
        item.title = titleInput.value;
        item.description = descriptionInput.value;
        editCardData(item.id, item);
        card.querySelector('.card__title').textContent = item.title;
        card.querySelector('.card__desc').textContent = item.description;
        cardContent.classList.remove("card__content--hidden");
        form.remove();
    });
    // Event on CANCEL
    document.querySelector('.card__button--cancel').addEventListener('click', (event) => {
        event.preventDefault();
        // remove the form
        cardContent.classList.remove("card__content--hidden");
        form.remove();
    });

}
//--------------------------Create new card-------------------------------
document.querySelector('.create-card-btn').addEventListener('click', () => {
    let newCardData: Card;
    newCardData.id = 200;
    newCardData.image = "https://picsum.photos/id/3/200/300";
    newCardData.title = "New Title";
    const delay = (ms: number) => { return new Promise(res => setTimeout(res, ms)); }
    (async () => {
        await delay(100);
        renderCard(newCardData);
    })();
});


getCardsData()
    .then(cards => {
        console.log(cards)
        renderCards(cards);
    })
    .catch(error => console.error(error));