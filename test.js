document.addEventListener("DOMContentLoaded", function() {
  // Déclaration de selectedTags en tant que variable globale
  const selectedTags = [];
  // Définition de la fonction displaySearchResults
  function displaySearchResults(results, containerClass,inputId) {
    const container = document.querySelector("." + containerClass);
    const inputElement = document.getElementById(inputId);
    const selectTag = document.querySelector(".filter");
    if (container ) {
      selectTag.innerHTML = "";
      const resultList = document.createElement("ul");
      results.forEach(result => {
         const listItem = document.createElement("li");
         listItem.addEventListener("click", function() {
         inputElement.value = result; // Mettez à jour la valeur de l'élément d'entrée
         const filterElement = document.createElement('div');
         filterElement.classList.add('tag');
         const btnX = document.createElement("i");
         btnX.className = "fa-solid fa-xmark close-tag";
         filterElement.textContent = result;
         // Ajoutez le nouveau filtre à l'élément parent
         selectTag.appendChild(filterElement);
         filterElement.appendChild(btnX);
       });
       listItem.textContent = result;
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
     displaySearchResults(searchResults,"option-choix-Ing","liste-choix-Ing");

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
   displaySearchResults(searchResults, "option-choix-App","liste-choix-App");
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
   displaySearchResults(searchResults,"option-choix-Ust","liste-choix-Ust" );
 }
 // Appel de la fonction searchUst
 if (inputUstensils) {
   inputUstensils.addEventListener('keyup', function() {
     searchUst(recipes);
  
   });
 }
 
function displayTags(tagText) {
 const tagsContainer = document.querySelector("#selected-tags");
 tagsContainer.innerHTML = "";
 // on parcours ts les tags affichés
 for (let i = 0; i < selectedTags.length; i++) {
   const selectedTag = selectedTags[i];
   // Pour chaque tag selectionné on l'affiche avec le btnX
   const tag = document.createElement("div");
   tag.className = "tag";
   tag.textContent = selectedTag;
   const btnX = document.createElement("i");
   btnX.className = "fa-solid fa-xmark close-tag";
   //Action suppr Tag
   btnX.addEventListener(
      "click",
      ((btnX_TagText) => {
         return () => {
         // on recupp l'index du tag cliqué
         const btnX_TagIndex = selectedTags.indexOf(btnX_TagText);
         // S'il existe on le suppr et on affiche les tags
         if (btnX_TagIndex > -1) {
           selectedTags.splice(btnX_TagIndex, 1);
           displayTags(tagText);
         }
         updateSearchTags();
         //On desactive la classe suggestion active qui correspond à ce tag
         const suggestions = document.querySelectorAll(".suggestion");
         suggestions.forEach((suggestion) => {
           if (suggestion.innerText === btnX_TagText) {
             suggestion.classList.remove("suggestion-active");
           }
         });
       };
     })(selectedTag)
   );
   tag.appendChild(btnX);
   tagsContainer.appendChild(tag);
 }

function displayTags(tagText) {
  const tagsContainer = document.querySelector("#selected-tags");
  tagsContainer.innerHTML = "";
  // Parcourir tous les tags sélectionnés
  selectedTags.forEach(selectedTag => {
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = selectedTag;
    // Créer le bouton de suppression et ajouter un écouteur d'événements
   const btnX = document.createElement("i");
   btnX.className = "fa-solid fa-xmark close-tag";
   btnX.addEventListener("click", function() {
     // Supprimer le tag sélectionné et actualiser l'affichage
     const index = selectedTags.indexOf(selectedTag);
     if (index !== -1) {
       selectedTags.splice(index, 1);
       displayTags(tagText);
     }
     // Actualiser les tags de recherche
     updateSearchTags();
   });
   tag.appendChild(btnX);
   tagsContainer.appendChild(tag);
 });

// Fonction pour mettre à jour les tags de recherche
function updateSearchTags() {
 // Implémentez cette fonction en fonction de vos besoins
}

// Appel initial de displayTags
displayTags();

// searchBar et autres écouteurs d'événements...
});
}