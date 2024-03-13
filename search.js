// document.addEventListener("DOMContentLoaded", function() {
//   // Définition de la fonction displaySearchResults
//   function displaySearchResults(results, containerClass, inputId) {
//       const container = document.querySelector("." + containerClass);
//       const inputElement = document.getElementById(inputId); // Sélectionnez l'élément d'entrée par son ID
//       if (container && inputElement) {
//           container.innerHTML = "";
//           const resultList = document.createElement("ul");

//           results.forEach(result => {
//               const listItem = document.createElement("li");

//               listItem.addEventListener("click", function() {
//                   inputElement.value = result; // Mettez à jour la valeur de l'élément d'entrée
//                   const filterElement = document.createElement('div');
//                   filterElement.classList.add('filter');
//                   filterElement.textContent = result;
//                   // Ajoutez le nouveau filtre à l'élément parent
//                   container.appendChild(filterElement);
//               });
//               listItem.textContent = result;
//               resultList.appendChild(listItem);
//           });
//           container.appendChild(resultList);

//       }
//   }
// document.addEventListener("DOMContentLoaded", function() {
//   //Définition de la fonction displaySearchResults
//   function displaySearchResults(results, containerClass,inputId) {
//     const choixRecette = document.querySelector("." + containerClass);
//     const inputElement = document.getElementById(inputId);
//     if (choixRecette) {
//       choixRecette.innerHTML = "";
//       const resultList = document.createElement("ul");
//       results.forEach(result => {
//        const listItem = document.createElement("li");
//        listItem.addEventListener("click", function() {
//         inputElement.value = result; 
//         const filterElement = document.createElement('div');
//         filterElement.classList.add('filter');
//         filterElement.textContent = result;
//         // Ajoutez le nouveau filtre à l'élément parent
//         choixRecette.appendChild(filterElement);
//       });
//         listItem.textContent = result;
//         resultList.appendChild(listItem);
//       });
//       choixRecette.appendChild(resultList);
     
//     }
//   }
document.addEventListener("DOMContentLoaded", function() {
  // Définition de la fonction displaySearchResults
  function displaySearchResults(results, containerClass, inputId) {
    const choixRecette = document.querySelector("." + containerClass);
    const inputElement = document.getElementById(inputId);
    if (choixRecette) {
      choixRecette.innerHTML = "";
      const resultList = document.createElement("ul");
      results.forEach(result => {
        const listItem = document.createElement("li");
        listItem.textContent = result;
        listItem.addEventListener("click", function() {
        inputElement.value = result;
        
        const filterElement = document.createElement('div');
        filterElement.classList.add('filter');
        filterElement.textContent = result;
        // Ajoutez le nouveau filtre à l'élément parent
        choixRecette.appendChild(filterElement);
        });
        resultList.appendChild(listItem);
      });
      choixRecette.appendChild(resultList);
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
     
//appel fuction search bar 
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
    displaySearchResults(searchResults, "option-choix-Ing");

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
    displaySearchResults(searchResults, "option-choix-App");
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
    displaySearchResults(searchResults, "option-choix-Ust");
  }
  // Appel de la fonction searchUst
  if (inputUstensils) {
    inputUstensils.addEventListener('keyup', function() {
      searchUst(recipes);
   
    });
  }
});
  // Gestion des suggestions lors du clic sur un élément
   //function onSuggestion(listItem) {
  //  const isSelected = selectedTags.findIndex(
  //     (selectedTag) => selectedTag === listItem.innerText
  //   );
  //   if (isSelected > -1) {
  //     listItem.classList.remove(".filtrer");
  //     selectedTags.splice(isSelected, 1);
  //   } else {
  //     listItem.classList.add(".filtrer");
  //     selectedTags.push(listItem.innerText);
  //   }
  //   displayTags(listItem.innerText);
  //   //updateSearchTags();
  // }
// Mise à jour de la recherche en fonction des tags sélectionnés
// function updateSearchTags() {
//   const inputValue = document.getElementById('myInput').value.trim().toLowerCase();
//   // Si des tags sont sélectionnés, filtrer les recettes en fonction des tags
//   if (selectedTags.length > 0) {
//     const filteredRecipes = filterRecipesByTags(allRecipes);
//     searchBar(filteredRecipes, inputValue);
//   } else {
//     // Sinon, effectuer une recherche normale
//     searchBar(allRecipes, inputValue);
//   }
// }
