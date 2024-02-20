

// searchBar
const btnSearch = document.getElementById('btn-search');
const inputIngredient = document.getElementById('myInput-ing');
const inputAppliance = document.getElementById('myInputApp');
const inputUstensils = document.getElementById('myInputUst');



btnSearch.addEventListener("click", function searchBar(recipes) {
    const inputValue = myInput.value.trim().toLowerCase(); // Utiliser inputIngredient au lieu de myInput
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
    }
});

// search Ingredient
inputIngredient.addEventListener("input", function searchIng(recipes) {
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
});

// search Appliance
inputAppliance.addEventListener("input", function searchApp(recipes) {
    const inputApplianceValue = inputAppliance.value.trim().toLowerCase();
    let searchResults = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipeAppliance = recipes[i].appliance.toLowerCase();
        if (recipeAppliance.includes(inputApplianceValue)) {
            searchResults.push(recipeAppliance);
        }
    }
    console.log(searchResults);
});

// search Ustensils
inputUstensils.addEventListener("input", function searchUst(recipes) {
    const inputUstensilsValue = inputUstensils.value.trim().toLowerCase();
    let searchResults = [];
    console.log("test");
    for (let i = 0; i < recipes.length; i++) {
      console.log("test");
        const recipeUstensils = recipes[i].ustensils;
        for (let j = 0; j < recipeUstensils.length; j++) {
            const ustensils = recipeUstensils[j].toLowerCase();
            if (ustensils.includes(inputUstensilsValue)) {
                searchResults.push(ustensils);
            }
        }
    }
    console.log(searchResults);
    console.log("test");
});




























   




function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
//button Ingrédient 
function filterIngredient(recett) {
    var input, filter, div, ingredient, recett,  txtValue, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    // Assuming you have anchor tags for ingredients
    for (i = 0; i < ingredient.ingredient.length; i++) {
      txtValue = ingredient.ingredient[i].textContent || ingredient.ingredient[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        ingredient.ingredient[i].style.display = "";
      } else {
        ingredient.ingredient[i].style.display = "none";
      }
    }
}
//button ustensils 
function filterUstensiles(recipes) {
    var input, filter, div, ustensils, recipes,  txtValue, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    // Assuming you have anchor tags for ingredients
    for (i = 0; i < recipes.ustensils.length; i++) {
      txtValue =recipes.ustensils[i].textContent || recipes.ustensils[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        recipes.ustensils[i].style.display = "";
      } else {
        recipes.ustensils[i].style.display = "none";
      }
    }
}

//button appliance
function filterAppareils(recipes) {
  var input, filter, div, appliance, recipes,  txtValue, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  // Assuming you have anchor tags for ingredients
  for (i = 0; i < recipes.appliance.length; i++) {
    txtValue =recipes.appliance[i].textContent || recipes.appliance[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      recipes.appliance[i].style.display = "";
    } else {
      recipes.appliance[i].style.display = "none";
    }
  }
}






//search Ingrédient
function filterIngredient(recipes){
  const button = document.querySelector(".Button-ing"); 
  const ingredientsIng = recipes.ingredients; 
  let clickCount = 0;
  
  button.addEventListener("click", (event) => {
    if (clickCount < ingredientsIng.length) {
      button.textContent = `Click count: consol.log (${ingredientsIng[clickCount]})`;
      clickCount++;
    } else {
      button.textContent = "All ingredients displayed";
      button.disabled = true; // Disable the button after all ingredients are displayed
    }
  });
  }
   //search Appareils
   function filterAppareils(recipes){
  const button = document.querySelector(".Button-App"); 
  const ingredientsApp = recipes.appliance; 
  let clickCount1 = 0;
  
  button.addEventListener("click", (event) => {
    if (clickCount1 < ingredients.appliance.length) {
      button.textContent = `Click count: consol.log (${ingredientsApp[clickCount1]})`;
      clickCount1++;
    } else {
      button.textContent = "All ingredients displayed";
      button.disabled = true; // Disable the button after all ingredients are displayed
    }
  });
  }
  //search Ustensiles
  function filterUstensiles(recipes){
  const button = document.querySelector(".Button-Ust"); 
  const ingredientsUst = recipes.ustensils; 
  let clickCount2 = 0;
  
  button.addEventListener("click", (event) => {
    if (clickCount2 < ingredientsUst.length) {
      button.textContent = `Click count: consol.log (${ingredientsUst[clickCount2]})`;
      console.log(ingredientsUst[clickCount2]);
      clickCount2++;
    } else {
      button.textContent = "All ingredients displayed";
      button.disabled = true; // Disable the button after all ingredients are displayed
    }
  });
  }






  
//search 
function searchBar(recipes) {
  const inputValue = myInput.value.trim().toLowerCase();
    
  const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    if (!regex.test(inputValue) && inputValue) {
        
  textContent = "Le champ doit contenir uniquement des lettres.";
    } 
    else {
        messageError.message
  textContent = "";

    }
  
  // Filtrage des recettes en fonction de la saisie de l'utilisateur
  if (selectedTags.length > 0) {
  const filteredRecipes = filterRecipesByTags(allRecipes);
  mySearch(filteredRecipes, inputValue);
            
            updateSuggestions
  
  updateSuggestions(mySearch(filteredRecipes, inputValue));
        } 
  else { 
        const filteredRecipes = mySearch(allRecipes, inputValue);
        updateSuggestions
  updateSuggestions(filteredRecipes);
        }
  }
  }
  
  
  function filterRecipesByTagsv(recipes){
  
        const filteredRecipes =[];
        const globalSelectedTags = selectedTags;
        if (globalSelectedTags.length === 0){
              return recipes;
  
        }
        recipes.forEach((recipe) => {
              const recipeIngredients = recipe.ingredients.map((ingredient) =>
                ingredient.ingredient.toLowerCase()
              );
              const recipeUstensils = recipe.ustensils.map((ustensil) =>
                ustensil.toLowerCase()
              );
              const recipeAppliance = recipe.appliance.toLowerCase();
          
              const containsAllTags = globalSelectedTags.every((selectedTag) => {
                const tagLowerCase = selectedTag.toLowerCase();
          
                return (
                  recipeIngredients.some((ingredient) =>
                    ingredient.includes(tagLowerCase)
                  ) ||
                  recipeUstensils.some((ustensil) => ustensil.includes(tagLowerCase)) ||
                  recipeAppliance.includes(tagLowerCase)
                );
              });
          
              if (containsAllTags) {
                filteredRecipes.push(recipe);
              }
            });
          
            displayDataReciepes(filteredRecipes);
            numberOfRecipes(filteredRecipes.length);
          
            return filteredRecipes;
          } ;
        
  
  