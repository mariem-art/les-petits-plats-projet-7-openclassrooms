function displaySearchResults(results, containerClass, inputId) {
    const container = document.querySelector("." + containerClass);
    if (container) {
        container.innerHTML = "";
        const resultList = document.createElement("ul");
        results.forEach(result => {
            const listItem = document.createElement("li");
            listItem.textContent = result;
            listItem.addEventListener("click", function() {
                const inputValue = document.getElementById(inputId);
                if (inputValue) {
                    inputValue.value = result;
                }
            });
            resultList.appendChild(listItem);
        });
        container.appendChild(resultList);
    }
}

// Utilisation de la fonction pour mettre à jour la valeur de l'entrée dans différentes classes
document.addEventListener("DOMContentLoaded", function() {
    displaySearchResults(searchResults1, ".option-choix-Ing", "option-choix-Ing");
    displaySearchResults(searchResults2, ".option-choix-App", "option-choix-App");
    displaySearchResults(searchResults2, ".option-choix-Ust", "option-choix-Ust");

    // Ajoutez d'autres appels à displaySearchResults pour d'autres classes et éléments d'entrée
});