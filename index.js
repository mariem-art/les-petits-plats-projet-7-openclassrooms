

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

// Résultat option Ingrédient 
// function displaySearchResultsIng(results) {
//   const optionContainerIng = document.getElementById("option-choix-Ing");
//   optionContainerIng.innerHTML = "";
//   results.forEach(result => {
//     const optionButtonIng = document.createElement("button");
//     optionButtonIng.classList.add("option-button");
//     optionButtonIng.textContent = result;

//     optionButtonIng.addEventListener("click", function() {
//       document.getElementById("myInput-ing").value = result;
      
//       const filterElement = document.createElement('div');
//       filterElement.classList.add('filter');
//       filterElement.textContent = result;
      
//       // Ajouter à l'élément souhaité dans le DOM
//       const filterContainer = document.querySelector('.filter-container');
//       filterContainer.appendChild(filterElement);
//     });

//     optionContainerIng.appendChild(optionButtonIng);
//   });
// }


// Résultat option Ingrédient

// function displaySearchResultsIng(results) {
//   const optionContainerIng = document.getElementById("option-choix-Ing");
//   optionContainerIng.innerHTML = "";
//   console.log("bonjour");
//   results.forEach(result => {
//     const optionListItem = document.createElement("li");
//     optionListItem.textContent = result;
//     optionListItem.classList.add("option-choix-Ing");
    
//     optionListItem.addEventListener("click", function() {
     
//       document.getElementById("myInput-ing").value = result;

//       const filterElement = document.createElement('div');
//       filterElement.classList.add('filter');
//       filterElement.textContent = result;

//       // Supprimez les anciens filtres avant d'ajouter le nouveau
//       const existingFilters = document.querySelectorAll('.filter');
//       existingFilters.forEach(filter => filter.remove());

//       // Ajoutez le nouveau filtre à l'élément parent
      //  optionContainerIng.appendChild(filterElement);
//     });

    //  optionContainerIng.appendChild(optionListItem);
// });
//  }
// // Résultat option appareil
//  function displaySearchResultsApp(results) {
//    const optionContainerApp = document.getElementById(".option-choix-App");
//     optionContainerApp.innerHTML = "";
//     results.forEach(result => {
//    const optionButton = document.createElement("button");
//    optionButton.classList.add("option-button");
//    optionButton.textContent = result;
//    optionButton.addEventListener("click", function optApp() {
//    document.getElementById("myInput-App").value = result;
//   });
//   optionContainerApp.appendChild(optionButton);
//   });
//  }
// // Résultat option Ustensiles
//  function displaySearchResultsUst(results) {
//   const optionContainerUst = document.getElementById(".option-choix-Ust");
//   optionContainerUst.innerHTML = "";
//   results.forEach(result => {
//   const optionButton = document.createElement("button");
//   optionButton.classList.add("option-button");
//   optionButton.textContent = result;
//   optionButton.addEventListener("click", function optUst() {
//   document.getElementById("myInput-Ust").value = result;
//   });
//    optionContainerUst.appendChild(optionButton);
//  });
//  }