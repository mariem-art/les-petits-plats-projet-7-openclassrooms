// Fonction pour afficher les résultats de recherche dans la classe .choix-recette
function displaySearchResults(results) {
  const choixRecette = document.querySelector(".choix-recette");

  // Nettoyer le contenu précédent
  choixRecette.innerHTML = "";

  // Créer une liste ul pour contenir les résultats
  const resultList = document.createElement("ul");

  // Ajouter chaque résultat comme un élément de liste li
  results.forEach(result => {
      const listItem = document.createElement("li");
      listItem.textContent = result;
      resultList.appendChild(listItem);
  });

  // Ajouter la liste de résultats à la classe .choix-recette
  choixRecette.appendChild(resultList);
}

// searchBar
const btnSearch = document.getElementById('btn-search');
const inputIngredient = document.getElementById('myInput-ing');
const inputAppliance = document.getElementById('myInputApp');
const inputUstensils = document.getElementById('myInputUst');

btnSearch.addEventListener("click", function searchBar(recipes) {
  const inputValue = myInput.value.trim().toLowerCase();
  const messageError = document.querySelector(".message-error");
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;

  if (!regex.test(inputValue) && inputValue) {
      messageError.textContent = "Le champ doit contenir uniquement des lettres.";
  } else {
      let searchResults = [];
      for (let i = 0; i < recipes[i].length; i++) {
          searchResults.push(inputValue);
      }
      console.log(searchResults);
      displaySearchResults([]);
      displaySearchResults(searchResults); // Afficher les résultats de recherche
  }
});
// search Ingredient

function searchIng(recipes) {
  const inputIngredientValue = inputIngredient.value.trim().toLowerCase();
  let searchResults = [];
  for (let i = 0; i < recipes.length; i++) {
      const recipeIngredients = recipes[i].ingredients;
      for (let j = 0; j < recipeIngredients.length; j++) {
          const ingredient = recipeIngredients[j].ingredient.toLowerCase();
          if (ingredient.includes(inputIngredientValue)) {
              searchResults.push(ingredient);
          }
      }
  }
  console.log(searchResults);
  displaySearchResults([]);
  displaySearchResults(searchResults); // Afficher les résultats de recherche
}
// Appel de la fonction searchIng
inputIngredient.addEventListener("input", function () {
  searchIng(recipes);
});

// search Appliance
 function searchApp(recipes) {
  const inputApplianceValue = inputAppliance.value.trim().toLowerCase();
  let searchResults = [];
  for (let i = 0; i < recipes.length; i++) {
      const recipeAppliance = recipes[i].appliance.toLowerCase();
      if (recipeAppliance.includes(inputApplianceValue)) {
          searchResults.push(recipeAppliance);
      }
  }
  console.log(searchResults);
  displaySearchResults([]);
  displaySearchResults(searchResults); // Afficher les résultats de recherche
}
// Appel de la fonction Appliance
inputAppliance.addEventListener("input", function () {
  searchApp(recipes);
});
// search Ustensils
function searchUst(recipes) {
  const inputUstensilsValue = inputUstensils.value.trim().toLowerCase();
  let searchResults = [];
  for (let i = 0; i < recipes.length; i++) {
      const recipeUstensils = recipes[i].ustensils;
      for (let j = 0; j < recipeUstensils.length; j++) {
          const ustensil = recipeUstensils[j].toLowerCase();
          if (ustensil.includes(inputUstensilsValue)) {
              searchResults.push(ustensil);
          }
       }
  console.log(searchResults);
  displaySearchResults([]);
  displaySearchResults(searchResults); // Afficher les résultats de recherche
      }
    }
// Appel de la fonction searchIng
inputUstensils.addEventListener("input", function () {
  searchUst(recipes);
});