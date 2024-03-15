document.addEventListener("DOMContentLoaded", function() {
  // Déclaration de selectedTags en tant que variable globale
  const selectedTags = [];
  // Déclaration de selectTag en tant que variable globale
  const selectTag = document.querySelector(".filter");

  // Définition de la fonction displaySearchResults
  function displaySearchResults(results, containerClass, inputId) {
    const container = document.querySelector("." + containerClass);
    const inputElement = document.getElementById(inputId);
    if (container) {
      selectTag.innerHTML = "";
      const resultList = document.createElement("ul");
      results.forEach(result => {
        const listItem = document.createElement("li");
        listItem.textContent = result;
        listItem.addEventListener("click", function() {
          inputElement.value = result;
          const filterElement = document.createElement('div');
          filterElement.classList.add('tag');
          const btnX = document.createElement("i");
          btnX.className = "fa-solid fa-xmark close-tag";
          btnX.addEventListener('click', function(event) {
            event.stopPropagation(); // Empêche le clic de se propager au parent
            closetag(btnX);
          });
          filterElement.textContent = result;
          // Ajoutez le nouveau filtre à l'élément parent
          selectTag.appendChild(filterElement);
          filterElement.appendChild(btnX);
        });
        resultList.appendChild(listItem);
      });
      container.appendChild(resultList);
    }
  }

  // searchBar
  const btnSearch = document.getElementById('btn-search');
  // Événement pour déclencher la recherche lors du clic sur le bouton de recherche
  if (btnSearch) {
    btnSearch.addEventListener('click', function() {
      const inputValue = document.getElementById('myInput').value.trim().toLowerCase();
      searchBar(recipes, inputValue);
    });
  }

  function searchBar(recipes, inputValue) {
    const messageError = document.querySelector(".message-error");
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    if (!regex.test(inputValue) && inputValue) {
      messageError.textContent = "Le champ doit contenir uniquement des lettres.";
    } else {
      const searchResults = recipes.filter(recipe => {
        // Vérifier si le nom de la recette, les ingrédients ou les ustensiles contiennent la valeur de recherche
        return (
          recipe.name.toLowerCase().includes(inputValue) ||
          recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputValue)) ||
          recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(inputValue))
        );
      }).map(recipe => recipe.name);
      console.log(searchResults);
      displaySearchResults(searchResults, "choix-tout");
    }
  }

  //appel function search bar 
  btnSearch.addEventListener('click', function() {
    // Appel de la fonction searchBar avec les recettes
    searchBar(recipes);
  });

  // search Ingredient
  const inputIngredient = document.getElementById('myInput-ing');
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
    displaySearchResults(searchResults, "option-choix-Ing", "liste-choix-Ing");
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
    displaySearchResults(searchResults, "option-choix-App", "liste-choix-App");
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
    let searchResults = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipeUstensils = recipes[i].ustensils;
      for (let j = 0; j < recipeUstensils.length; j++) {
        const ustensil = recipeUstensils[j].toLowerCase();
        if (ustensil.includes(inputUstensilsValue)) {
          searchResults.push(ustensil);
        }
      }
    }
    console.log(searchResults);
    displaySearchResults(searchResults, "option-choix-Ust", "liste-choix-Ust");
  }
  // Appel de la fonction searchUst
  if (inputUstensils) {
    inputUstensils.addEventListener('keyup', function() {
      searchUst(recipes);
    });
  }
   //Action suppr Tag
   function closetag(btnX) {
    btnX.parentNode.remove(); // Supprime le tag parent du bouton "x"
  }
});