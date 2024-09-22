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

//Event Listeners 
submit.addEventListener('submit', searchMeals);