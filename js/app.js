const displaySpinner = error => {
    document.getElementById('spinner').style.display = error;
}
// fetch the data of Search meal by name via input text
const searchFoods = () => {
    const inputField = document.getElementById('input-field')
    const inputText = inputField.value;
    inputField.value = '';
    const displayCategoryFoodContainer = document.getElementById('just-for-you-section');
    displayCategoryFoodContainer.textContent = '';
    const displayFilterFoodContainer = document.getElementById('filter-food');
    displayFilterFoodContainer.textContent = '';
    const cuisineFoodContainer = document.getElementById('cuisine-section');
    cuisineFoodContainer.textContent = '';
    displaySpinner('block');
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoods(data.meals));
}
// display foods
const displayFoods = foods => {
    const foodDetailsContainer = document.getElementById('search-result');
    foodDetailsContainer.textContent = '';
    foods.forEach(food => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div class="card g-4 shadow-lg h-100" >
    <img src="${food.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${food.strMeal}</h5>
        <p class="card-text">${food.strInstructions.slice(0, 150)}..</p>
        <span class='category'>Category:<span class='tag-str rounded-pill'>${food.strCategory}</span></span>
        </br>
        <button type="button" class="btn details-btn btn-outline-danger mt-3 rounded-pill" btn-success" data-bs-toggle="modal" data-bs-target="#food-details"
         onclick="foodDetails(${food.idMeal})">See Details</button>
     </div>
     </div>
    `;
        foodDetailsContainer.appendChild(div);
    });
    displaySpinner('none');
}
// fetch the Lookup full meal details by id
const foodDetails = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModalFoods(data.meals[0]));
}
// modal food deatils food card
const displayModalFoods = food => {
    console.log(food);
    const modalFoodDetailsContainer = document.getElementById("modal-dialog-box");
    const modalContent = document.createElement("div");
    modalContent.classList.add("row", "g-0");
    modalContent.innerHTML = `
            <div class="col-md-4">
             <img src='${food.strMealThumb}' class="w-25 rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="card-body text-start">
                    <h3 class="card-title">${food.strMeal}</h3>
                    <p class="category">Category: <span>${food.strCategory}</span></p>
                    <p class="card-text">${food.strInstructions.slice(0, 100)}...</p>
                </div>
            </div>
        `;
    modalFoodDetailsContainer.textContent = '';
    modalFoodDetailsContainer.appendChild = modalContent;
};
// fetch display category lists food
const displayCategoryFoods = () => {
    displaySpinner('block');
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => categoryFoods(data.categories));
}
displayCategoryFoods();
const categoryFoods = foods => {
    const displayCategoryFoodContainer = document.getElementById('display-category-foods');
    displayCategoryFoodContainer.textContent = '';
    foods.forEach(food => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div class="card g-4 shadow-lg h-100" >
    <img src="${food.strCategoryThumb}" class="card-img-top" alt="..."> 
    <span class="border-red mt-3"></span>
    <div class="card-body">
        <h5 class="card-title">${food.strCategory}</h5>
        <p class="card-text">${food.strCategoryDescription.slice(0, 200)}</p>
        <span class='category card-text'>Category:<span class='tag-str rounded-pill'>${food.strCategory}</span></span>
     </div>
     </div>
    `;
        displayCategoryFoodContainer.appendChild(div);
    });
    displaySpinner('none');
}
const displayCountryFoods = countryFood => {
    displaySpinner('block');
    const displayCategoryFoodContainer = document.getElementById('just-for-you-section');
    displayCategoryFoodContainer.textContent = '';
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryFood}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayFilterFoods(data.meals));
}
const displayFilterFoods = foods => {
    const displayFilterFoodContainer = document.getElementById('displayFilterFood');
    displayFilterFoodContainer.textContent = '';
    foods.forEach(food => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div class="card g-4 shadow-lg h-100" >
    <img src="${food.strMealThumb}" class="card-img-top" alt="..."> 
    <div class="card-body">
        <h5 class="card-title filter-food-heading fs-5">${food.strMeal}</h5>
     </div>
     </div>
    `;
        displayFilterFoodContainer.appendChild(div);
    });
    displaySpinner('none');
}

