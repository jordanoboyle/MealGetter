//This is new to me. 
const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  singleMealEl = document.getElementById('single-meal');


//Search for Meal and Fetch
function searchMeals(e) {
  e.preventDefault();

  //Clear Single Meal
  singleMealEl.innerHTML = '';

  //Get Search Term

  const term = search.value;

  //Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for ${term}</h2>`;
        
        if (data.meals === null) {
          resultHeading.innerHTML = `
          <h2>There are no meals with this search parameter.</h2> 
          <h3>Please Try Again</h3>
          `;
        } else {
          mealsEl.innerHTML = data.meals.map(meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}"/>
              <div class="meal-info" data-mealID="${meal.idMeal}"> 
                <h3>${meal.strMeal} </h3>
              </div>
            </div>
            `
          ).join('');
        }
      });
    //Clear the search text
    search.value = '';
  } else {
    alert('Please Enter a Search Term'); // This is a simple JS way to handle a faulty input, thought it is better to update a DOM element that will tell you otherwise
  }
}

//Get Meal By ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

//Add Meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }
  console.log('Ingreds Pulls From JSON', ingredients);

  singleMealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p id="category-local">${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p id="category-local"> Origin: ${meal.strArea} </p>` : ''}  
      </div>
      <div class="main">
        <p>${meal.strInstructions} </p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map( ingred => `<li>${ingred} </li>`).join('')}
        </ul>
      </div>
    </div>
  `
  // You have to think about the above like HTML (because it is), but also have to think about it like JS. You are combining the 2 different aspects of this Project into one. 
  //Remember how we said no HTML in JS....I call complete bullshit because that's what you actually do. 
}

//Event Listeners 
submit.addEventListener('submit', searchMeals);

mealsEl.addEventListener('click', e => {
  const mealInfo = e.composedPath().find((item) => {
    // console.log(item);
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  console.log('This is MealID Information', mealInfo);

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    console.log('REAL mealId',mealID);
    getMealById(mealID);
  }
});