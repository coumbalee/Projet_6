"use strict";
import {
  getPhotographersFromJson,
  getAllTagsFromPhotographers,
} from "./dataFunction.js";

generateIndexHeader();
generateIndexMain();
displayPage();

function showPhotographers(photographers) {
  let photographersElt = document.querySelector("#photographers");
  photographersElt.innerHTML = "";
  photographers.forEach((photographer) => {
    photographersElt.innerHTML += `
    <li class="photographer">
    <a href =" 
    ./photographer.html?id=${
      photographer.id
    } "><img src ="./Photographers%20ID%20Photos/${
      photographer.portrait
    }" class ="photographer__img" alt="image du photographe ${
      photographer.name
    }">
    <h2 class="photographer__name">${photographer.name}</h2>
    </a>
    <div class= "photographer__content">
    
      <p class="photographer__localisation">${photographer.city}, ${
      photographer.country
    }</p>
      <p class="photographer__tagline">${photographer.tagline}</p>
      <p class="photographer__price">${photographer.price} / jour</p>
      <div class="photographer__tags">${photographer.tags
        .map((tag) => `<button class="tag" data-tag="${tag}">#${tag}</button>`)
        .join("")}</div>
    </div>    
      
</li>

      `;
  });
}
function displayTagsMenu(tags) {
  let tagsElt = document.querySelector("#tags");
  tags.forEach((tag) => {
    tagsElt.innerHTML += `<button class="tag" data-tag="${tag}">#${tag}</button>`;
  });
}
function generateIndexHeader() {
  const header = document.querySelector("header");
  const headerLink = document.createElement("a");
  headerLink.href = "#photographers-section";
  headerLink.classList.add("header__link");
  headerLink.innerHTML = "Passer au contenu";
  header.prepend(headerLink);

  // insertion du logo
  const logoLink = document.createElement("a");
  const img = document.createElement("img");
  img.src = "./IMAGES/logo.png";
  img.setAttribute("alt", "Fisheye home page");
  logoLink.href = "./index.html";
  logoLink.prepend(img);
  const headerLogo = document.querySelector(".header__logo");
  headerLogo.prepend(logoLink);
}

function generateIndexMain() {
  const main = document.querySelector("main");
  const mainTitle = document.createElement("h1");
  mainTitle.innerHTML = "Nos photographes";
  mainTitle.classList.add("h1");
  main.prepend(mainTitle);
}

// Fonction qui ajoute un eventlistener au clic
export function manageListeners(tags, photographers) {
  tags.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      //quand je clique sur le tag, je récupère la valeur du tag
      console.log(tag.dataset.tag);
      // filtrage des photographes par tags cliqué
      let filteredPhotographers = photographers.filter((elt) =>
        elt.tags.includes(tag.dataset.tag)
      );
      console.log(filteredPhotographers);

      // Affichage des photographes filtrés
      showPhotographers(filteredPhotographers);
      let photographersElt = document.querySelector("#photographers");
      let tagsElts = photographersElt.querySelectorAll(".tag");
      // La fonction s' appelle elle même
      manageListeners(tagsElts, photographers);
      console.log(filteredPhotographers);
    });
  });
}

// );

async function displayPage() {
  // On attend de récupérer les photographes
  const photographers = await getPhotographersFromJson();
  // Récupération de tous les tags
  const tags = getAllTagsFromPhotographers(photographers);
  // Affichage des tags
  displayTagsMenu(tags);

  // Affichage des photographes
  showPhotographers(photographers);
  // Recuperer TOUS les tags qui ont la class tag
  const tagsElts = document.querySelectorAll(".tag");
  // Ajouter un eventListener sur chacun des tags
  manageListeners(tagsElts, photographers);
}
// Affichage du lien du header lorsque l'utilisateur commence à scroller
document.addEventListener("scroll", function (e) {
  const headerLink = document.querySelector(".header__link");
  headerLink.classList.add("visible");
});
