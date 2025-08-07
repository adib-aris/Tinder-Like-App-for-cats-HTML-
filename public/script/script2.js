const storedArrayString = sessionStorage.getItem("myStoredArray");
const retrievedArray = JSON.parse(storedArrayString);

const container = document.getElementById('container');
document.getElementById('number-text').innerHTML += retrievedArray.length +"/10";

for (let index = 0; index < retrievedArray.length; index++) {
    var card = document.createElement('div');
    card.classList.add('col-lg-6', 'py-3');
    var img = document.createElement('img');
    img.classList.add("liked-img");
    img.src = retrievedArray[index];
    img.alt = "Cat" +(index+1);

    card.appendChild(img);
    container.appendChild(card);
}