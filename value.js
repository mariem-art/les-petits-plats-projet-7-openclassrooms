//const
const recipeContainer = document.getElementById("recipeContainer");
const inputSuggestion = document.querySelectorAll("little-search");
const clearInput = document.getElementById("clearInput");
const clearIcon = document.querySelector("btn btn-outline-success");
const messageError = document.querySelector(".message-error");
const recipeCountElement = document.getElementById("recipeCount");
const tagsContainer = document.getElementById("nb-recette");
const suggestionActive = document.querySelector(".suggestion-active");
const searchResults = document.querySelector(".option-choix.Ing");
const searchResultsApp = document.querySelector(".option-choix.App");
const searchResultsUst = document.querySelector(".option-choix.Ust");

             


document.addEventListener('DOMContentLoaded', function() {
  // Dropdown Ingrédients
  const iconIn = document.querySelector('.fa-solid.fa-chevron-up');
  const searchInputIn = document.getElementById('option-choix-Ing');
  iconIn.addEventListener('click', function() {
      iconIn.classList.toggle('rotate');
      searchInputIn.classList.toggle('show');
      if (searchInputIn.classList.contains('show')) {
          searchInputIn.focus(); 
      }
  });

   // Dropdown Appareils
   const iconApp = document.querySelector('.fa-chevron-up.App');
   const searchInputApp = document.getElementById('liste-choix-App');
   iconApp.addEventListener('click', function() {
       iconApp.classList.toggle('rotate');
       searchInputApp.classList.toggle('show');
       if (searchInputApp.classList.contains('show')) {
           searchInputApp.focus(); 
       }
   });

    // Dropdown Ustensiles
    const iconUst = document.querySelector('.fa-solid.fa-chevron-up.Ust');
    const searchInputUst = document.getElementById('liste-choix-Ust');
    iconUst.addEventListener('click', function() {
        iconUst.classList.toggle('rotate');
        searchInputUst.classList.toggle('show');
        if (searchInputUst.classList.contains('show')) {
            searchInputUst.focus(); 
        }
    });
});