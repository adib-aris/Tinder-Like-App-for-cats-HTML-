

const API_URL = "https://cataas.com/cat";
const catPics = [];

async function getData() {
  for (let index = 0; index < 10; index++) {
    try {
      const result = await axios.get(API_URL);
      catPics.push({url: result.data.url});
        const container = document.getElementById('cardContainer');
        var card = document.createElement('div');
        card.classList.add('card');
        var cardContent = document.createElement('div');
        cardContent.classList.add('cardContent');
        var img = document.createElement('img');
        img.src = catPics[index].url;
        img.alt = "Cat Picture " +(index+1);
        cardContent.appendChild(img);
        card.appendChild(cardContent);
        container.appendChild(card);
    } catch (error) {
      console.error(error);
    }
  }
}

getData();

const container = document.getElementById("cardContainer");
let isDragging = false;
let startX = 0;
let currentCard = null;
let favPics = [];

function getTopCard() {
  return container.querySelector(".card:last-child");
}
container.addEventListener("mousedown", (e) => {
  currentCard = getTopCard();
  if (!currentCard) return;
  isDragging = true;
  startX = e.clientX;
  currentCard.style.transition = "none";
});
container.addEventListener("mousemove", (e) => {
  if (!isDragging || !currentCard) return;
  const deltaX = e.clientX - startX;
  currentCard.style.transform = `translateX(${deltaX}px) rotate(${
    deltaX / 10
  }deg)`;
});
container.addEventListener("mouseup", (e) => {
  if (!isDragging || !currentCard) return;
  const deltaX = e.clientX - startX;
  handleSwipe(deltaX);
});
container.addEventListener("touchstart", (e) => {
  currentCard = getTopCard();
  if (!currentCard) return;
  isDragging = true;
  startX = e.touches[0].clientX;
  currentCard.style.transition = "none";
});
container.addEventListener("touchmove", (e) => {
  if (!isDragging || !currentCard) return;
  const deltaX = e.touches[0].clientX - startX;
  currentCard.style.transform = `translateX(${deltaX}px) rotate(${
    deltaX / 10
  }deg)`;
});
container.addEventListener("touchend", (e) => {
  if (!isDragging || !currentCard) return;
  const deltaX = e.changedTouches[0].clientX - startX;
  handleSwipe(deltaX);
});
function handleSwipe(deltaX) {
  const sensitivity = 100;
  if (deltaX > sensitivity) {
    currentCard.style.transition = "transform 0.4s ease, opacity 0.4s ease";
    currentCard.style.transform = `translateX(${
      deltaX > 0 ? 1000 : -1000
    }px) rotate(${deltaX > 0 ? 45 : -45}deg)`;
    currentCard.style.opacity = 0;
    const url = currentCard.querySelector(".cardContent").querySelector("img").src;
    favPics.push(url);
    console.log(favPics);
    setTimeout(() => {
      currentCard.remove();
      currentCard = null;
    }, 400);
    if (container.children.length === 1)
      result();  
  }
  else if(deltaX < -sensitivity){
    currentCard.style.transition = "transform 0.4s ease, opacity 0.4s ease";
    currentCard.style.transform = `translateX(${
      deltaX > 0 ? 1000 : -1000
    }px) rotate(${deltaX > 0 ? 45 : -45}deg)`;
    currentCard.style.opacity = 0;
    setTimeout(() => {
      currentCard.remove();
      currentCard = null;
    }, 400);
    if (container.children.length === 1)
      result();
  }
  else {
    currentCard.style.transition = "transform 0.3s ease";
    currentCard.style.transform = "translateX(0) rotate(0)";
  }
  isDragging = false;
}

function slideLeft() {
  currentCard = getTopCard();
  handleSwipe(-101);
}

function slideRight() {
  currentCard = getTopCard();
  handleSwipe(101);
}

function result (){
  const myForm = document.getElementById('myForm');
  sessionStorage.setItem("myStoredArray", JSON.stringify(favPics));
  myForm.submit(); // Submits the form
}