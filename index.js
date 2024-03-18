

//récupérer les données de fihier recettes.js
async function displayRecipes(recipes) {
  const recettSection = document.querySelector(".choix-recette");
   const recipeCountElement = document.getElementById('nb');
   recipeCountElement.textContent = recipes.length;
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
//initializeSearch();


