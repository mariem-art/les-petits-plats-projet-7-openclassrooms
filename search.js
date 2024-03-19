document.addEventListener("DOMContentLoaded", function() {
  
  const selectTag = document.querySelector(".filter");
  const selectdTags = [];
  //fuction search
  function displaySearchResults(results, containerClass) {
    const container = document.querySelector("." + containerClass);
    if (container) {
        // Supprimer uniquement les éléments enfants de container
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        if (containerClass === "choix-recette") {
            results.forEach(result => {
                const recipe = recipes.find(recipe => recipe.name === result);
                if (recipe) {
                    const recipeCard = recettTemplate(recipe);
                    const userCardDOM = recipeCard.getUserCardDOM();
                    container.appendChild(userCardDOM);
                }
            });
            // Mettre à jour le nombre de recettes affichées
            const recipeCountElement = document.getElementById('nb');
            recipeCountElement.textContent = results.length;
        } else {
            // Si aucun résultat n'est trouvé, afficher le nombre par défaut (0 ou autre valeur souhaitée)
            const defaultRecipeCount =50;
            const recipeCountElement = document.getElementById('nb');
            recipeCountElement.textContent = defaultRecipeCount;
        }
    }
}
  const btnSearch = document.getElementById('btn-search');
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
        return (
          recipe.name.toLowerCase().includes(inputValue) ||
          recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputValue)) ||
          recipe.ustensils.some(utensil => utensil.toLowerCase().includes(inputValue)) ||
          recipe.appliance.toLowerCase().includes(inputValue)
        );
      });
      if (searchResults.length === 0) {
        messageError.textContent = "Aucune recette trouvée pour cette recherche.";
      } else {
        messageError.textContent = "";
        const recipeNames = searchResults.map(recipe => recipe.name);
        displaySearchResults(recipeNames, "choix-recette");
      }
    }
  }

  function searchInput(inputElement, result) {
    const inputValue = inputElement.value.trim().toLowerCase();
    const searchResults = result.filter(item => item.toLowerCase().includes(inputValue));
    displayOptions(searchResults, inputElement.resultset.container);
  }

  const inputs = document.querySelectorAll('.search-input');
  if (inputs) {
    inputs.forEach(input => {
      input.addEventListener('keyup', function() {
        const result = input.resultset.type === 'ingredients' ? ingredients :
                     input.resultset.type === 'appliances' ? appliances :
                     utensils;
        searchInput(input, result);
      });
    });
  }
 //fuction pour fermeture
  function closetag(btnX) {
    btnX.parentNode.remove();
  }
 //fuction afficher les listes des drop et filter 
 function displayOptions(results, container, containerClass) {
   const list = document.querySelector(container);
   selectTag.innerHTML = "";
   if (list) {
      const resultList = document.createElement("ul");
      results.forEach(item => {
          const listItem = document.createElement("li");
          listItem.textContent = item;
          listItem.classList.add("liste");
          listItem.addEventListener("click", function() {
              const inputElement = document.getElementById(containerClass === "option-choix-Ing" ? "myInput-ing" : containerClass === "option-choix-App" ? "myInput-App" : "myInput-Ust");
              inputElement.value = item; // Utiliser l'élément de la liste cliquée, pas le tableau entier
              const filterElement = document.createElement('div');
              filterElement.classList.add('tag');
              const btnX = document.createElement("i");
              btnX.className = "fa-solid fa-xmark close-tag";
              btnX.addEventListener('click', function(event) {
                  event.stopPropagation();
                  closetag(btnX);
              });
              filterElement.textContent = item;
              selectTag.appendChild(filterElement);
              filterElement.appendChild(btnX);
          });
          resultList.appendChild(listItem);
      });
      list.appendChild(resultList);
     
    }
  }
  //fuctin de tag 

  const ingredients = [];
  const appliances = [];
  const utensils = [];
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (!ingredients.includes(ingredient.ingredient)) {
        ingredients.push(ingredient.ingredient);
      }
    });
    if (!appliances.includes(recipe.appliance)) {
      appliances.push(recipe.appliance);
    }
    recipe.ustensils.forEach(utensil => {
      if (!utensils.includes(utensil)) {
        utensils.push(utensil);
      }
    });
  });

  displayOptions(ingredients, ".liste-choix-Ing");
  displayOptions(appliances, ".liste-choix-App");
  displayOptions(utensils, ".liste-choix-Ust");
  //fuction pour afficher les cards
  function recettTemplate(recipe) {
    const { id, name, servings, ingredients, time, description, quantity, unit, appliance, ustensils, image } = recipe;
    const img = `./assets/Photos P7 JS Les petits plats/${image}`;
    // Define the function to create the recipe card DOM
    function getUserCardDOM() {
        const article = document.createElement('article');
        // Create image element
        const imageCard = document.createElement('img');
        imageCard.setAttribute("src", img);
        const divInfo = document.createElement('div');
        divInfo.setAttribute('class','img');
        // Create time element
        const divRecette = document.createElement('div');
        divRecette.setAttribute('class','time');
        const timeRecette = document.createElement('p');
        timeRecette.textContent = `${time} min`;
        // Create name element
        const divNameRecette= document.createElement('div');
        divNameRecette.setAttribute('class','titre-article');
        const nameHeader = document.createElement('h2');
        nameHeader.textContent = name;
        // Create description element
        const divDescript= document.createElement('div');
        divDescript.setAttribute('class','descreption');
        const titreRectte = document.createElement('h3');
        titreRectte.textContent = "recette";
        const descriptionCard = document.createElement('p');
        descriptionCard.textContent = description;
        // Create ingredients list
        const DivListe = document.createElement('div');
        DivListe.setAttribute('class','Liste');
        const ingredientCard = document.createElement('p');
        ingredientCard.textContent = 'Ingredients';
        DivListe.appendChild(ingredientCard);
        const ingredientsList = document.createElement('ul');
        DivListe.appendChild(ingredientsList);
        // Iterate over ingredients and create list items for each
        ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('li');
            ingredientItem.setAttribute('class','ingredient');
            ingredientItem.textContent = `${ingredient.ingredient}`; 
            const quanItem = document.createElement('p');
            quanItem.setAttribute('class','quantie');
            if 
            (ingredient.unit === undefined)
              { 
               quanItem.textContent = ingredient.quantity;
             }
             else 
              {
                quanItem.textContent =`${ingredient.quantity}  ${ingredient.unit} `;
              }
            ingredientsList.appendChild(ingredientItem);
            ingredientItem.appendChild(quanItem);
        });
        // Append all elements to the article
        article.appendChild(divInfo);
        divInfo.appendChild(imageCard);
        article.appendChild(divRecette);
        divRecette.appendChild(timeRecette);
        article.appendChild(divNameRecette);
        divNameRecette.appendChild(nameHeader);
        article.appendChild(divDescript);
        divDescript.appendChild(titreRectte);
        divDescript.appendChild(descriptionCard);
        article.appendChild(DivListe);
        DivListe.appendChild(ingredientsList);
        return article;
    }
    // Return necessary properties and the function to create the card DOM
    return { id, name, servings, ingredients, time, description, quantity, unit, appliance, ustensils, getUserCardDOM };
}
});