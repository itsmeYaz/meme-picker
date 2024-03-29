//import data from another file
import { catsData } from "./data.js";

//grabbing ID from HTML
const emotionRadios = document.querySelector("#emotion-radios");
const getImgBtn = document.querySelector("#get-image-btn");
const gifOnly = document.querySelector("#gifs-only-option");
const memeModal = document.querySelector("#meme-modal");
const memeModalInner = document.querySelector("#meme-modal-inner");
const closeModalBtn = document.querySelector("#meme-modal-close-btn");

//Listening for event and trigger the function
emotionRadios.addEventListener("change", highlightCheckedOption);

closeModalBtn.addEventListener("click", closeModal);

getImgBtn.addEventListener("click", renderCat);

//function for highligthing the selected option
function highlightCheckedOption(e) {
  const radioItemsArray = document.getElementsByClassName("radio");
  for (let item of radioItemsArray) {
    item.classList.remove("highlight");
  }

  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function closeModal() {
  memeModal.style.display = "none";
}

function renderCat() {
  const catObject = getSingleCatObject();

  memeModalInner.innerHTML = `<img 
  class="cat-img" 
  src="./images/${catObject.image}"
  alt="${catObject.alt}"
  >`;
  memeModal.style.display = "flex";
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();
  const randomObject = Math.floor(Math.random() * catsArray.length);

  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    return catsArray[randomObject];
  }
}

//function for getting the value of the selected option
function getMatchingCatsArray() {
  //get the selected radio emotion
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    //check if gifOnly checkbox is checked
    const isGifEnabled = gifOnly.checked;

    const selectedCatsArray = catsData.filter((cat) => {
      if (isGifEnabled) {
        //filter the cats with the same emotion and check if isGif is enabled
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        //default return
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    //return the selectedCatsArray when the function is called
    return selectedCatsArray;
  }
}

//function for geetiing the data from array
function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

//function for rendering the data into the DOM
function renderEmotionsRadios(cats) {
  const emotions = getEmotionsArray(cats);
  let radioItems = "";

  for (let emotion of emotions) {
    radioItems += `<div class="radio">
                      <label for="${emotion}">${emotion}</label>
                        <input type="radio" id="${emotion}" value = "${emotion}" name ="emotions"/>
                    </div>`;
  }
  emotionRadios.innerHTML = radioItems;
}

//calling the function to render  into the DOM
renderEmotionsRadios(catsData);
