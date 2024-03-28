//Afficher les articles
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
