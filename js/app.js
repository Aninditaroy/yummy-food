const displaySpinner = error =>{
    document.getElementById('spinner').style.display = error;
}
// search by input text
const searchFoods = () => {
    const inputField = document.getElementById('input-field')
    const inputText = inputField.value;
    inputField.value = '';
    const displayCategoryFoodContainer = document.getElementById('display-category-foods');
    displayCategoryFoodContainer.textContent = '';
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
        <button href="#" class="btn details-btn btn-outline-danger mt-3 rounded-pill">See Details</button>
     </div>
     </div>
    `;
        foodDetailsContainer.appendChild(div);
    });
    displaySpinner('none');
}
// fetch display category lists food
const displayCategoryFoods = () => {
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
    <span class="border-red"></span>
    <div class="card-body">
        <h5 class="card-title">${food.strCategory}</h5>
        <p class="card-text">${food.strCategoryDescription.slice(0, 200)}</p>
        <span class='category'>Category:<span class='tag-str rounded-pill'>${food.strCategory}</span></span>
     </div>
     </div>
    `;
        displayCategoryFoodContainer.appendChild(div);
    });
    displaySpinner('none');
}

