//récupérer les données de fihier recettes.js
async function displayRecipes(recipes) {
    const recettSection = document.querySelector(".choix-recette");
    recipes.forEach((recipes) => {
        const recettModel = recettTemplate(recipes);
        const userCardDOM = recettModel.getUserCardDOM();
        recettSection.appendChild(userCardDOM);
    });
}
async function init() {
    // Récupère les datas des photographes
    displayRecipes(recipes);
}
init();   
//search
async function getRecipe() { 
   let newDataReciepes = recipes;
   return newDataReciepes;
  }
// Appeler la fonction pour récupérer les recettes et ensuite appeler searchBar

async function initializeSearch() {
  // Récupérer les recettes
  const allRecipes = await getRecipe();
 // Appeler searchBar avec les recettes récupérées
 searchBar(allRecipes);
}

// Appeler la fonction d'initialisation
initializeSearch();

// résultat option Ingrégient 
function displaySearchResults(results) {
const optionContainerIng = document.getElementById(".options-ing");
optionContainerIng.innerHTML = "";
results.forEach(result => {
const optionButtonIng = document.createElement("button");
optionButtonIng.classList.add("option-button");
optionButtonIng.textContent = result;
optionButtonIng.addEventListener("click", function optIng() {
  document.getElementById("myInput-ing").value = result;
});
optionContainerIng.appendChild(optionButtonIng);
});
}
// résultat option appareil
function displaySearchResults(results) {
const optionContainer = document.getElementById(".option-choix-App");
optionContainerApp.innerHTML = "";
results.forEach(result => {
const optionButton = document.createElement("button");
optionButton.classList.add("option-button");
optionButton.textContent = result;
optionButton.addEventListener("click", function optApp() {
document.getElementById("myInput-App").value = result;
});
optionContainer.appendChild(optionButton);
});
}







// Appeler la fonction d'initialisation
initializeSearch();
  // Appel de la fonction searchBar
  if (btnSearch) {
    btnSearch.addEventListener("click", function() {
      searchBar(recipes);
    });
  }