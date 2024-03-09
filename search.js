

document.addEventListener("DOMContentLoaded", function() {
  // Déclarez inputAppliance en tant que variable globale
  function displaySearchResults(results, containerClass) {
    const choixRecette = document.querySelector("." + containerClass);
    if (choixRecette) {
      choixRecette.innerHTML = "";
      const resultList = document.createElement("ul");
      results.forEach(result => {
        const listItem = document.createElement("li");
        listItem.textContent = result;
        resultList.appendChild(listItem);
      });
      choixRecette.appendChild(resultList);
    }
  }

  // searchBar
  const btnSearch = document.getElementById('btn-search');
  // Fonction searchBar
  // Définition de la fonction searchBar
async function searchBar(recipes) {
  // Code pour la fonction searchBar
  const inputValue = document.getElementById('myInput').value.trim().toLowerCase();
  const messageError = document.querySelector(".message-error");
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
  if (!regex.test(inputValue) && inputValue) {
      messageError.textContent = "Le champ doit contenir uniquement des lettres.";
  } else {
      let searchResults = [];
      for (let i = 0; i < recipes.length; i++) {
          searchResults.push(inputValue);
      }
      console.log(searchResults);
      displaySearchResults([], "option-choix");
      displaySearchResults(searchResults, "option-choix");
  }
}

// Appeler la fonction pour récupérer les recettes et ensuite appeler searchBar
async function initializeSearch() {
  // Récupérer les recettes
  const allRecipes = await getRecipe();
  // Appeler searchBar avec les recettes récupérées
  searchBar(allRecipes);
}


  // search Ingredient
  const inputIngredient = document.getElementById('myInput-ing');
  // Définition de la fonction searchIng
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

    displaySearchResults(searchResults, "option-choix");
  }
  // Appel de la fonction searchIng
  if (inputIngredient) {
    inputIngredient.addEventListener('keyup', function() {
      searchIng(recipes);
    });
  }

  // search Appliance
  const inputAppliance = document.getElementById('myInput-App');
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
    displaySearchResultsApp(searchResults, "option-choix-App");
  }

  // Appel de la fonction searchApp
  if (inputAppliance) {
    inputAppliance.addEventListener('keyup', function() {
      searchApp(recipes);
    });
  }
  // search Ustensils
  const inputUstensils = document.getElementById('myInput-Ust');
  function searchUst(recipes) {
    const inputUstensilsValue = inputUstensils.value.trim().toLowerCase();
    let searchResultsUst = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipeUstensils = recipes[i].ustensils;
      for (let j = 0; j < recipeUstensils.length; j++) {
        const ustensil = recipeUstensils[j].toLowerCase();
        if (ustensil.includes(inputUstensilsValue)) {
          searchResultsUst.push(ustensil);
        }
      }
    }
    console.log(searchResultsUst); 
    displaySearchResultsUst(searchResultsUst, "option-choix-Ust");
  }
  // Appel de la fonction searchUst
  if (inputUstensils) {
    inputUstensils.addEventListener('keyup', function() {
      searchUst(recipes);
    });
  }
});