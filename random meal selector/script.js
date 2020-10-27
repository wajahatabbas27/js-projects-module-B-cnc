//getting dom elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealContainer = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const selectedMeal = document.getElementById('selected-meals');

//function searchMeal
function searchMeal(e) {
    e.preventDefault();                       //take jb submit button dabaein page reload na ho.

    //get the search term from theinput field
    const term = search.value;
    //console.log(term);

    //calling api if there is something in search box,trim spaces kat ta hai
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML =`<h2>Search results for "${term}":</h2>`

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>there are no search results for '${term}'.Please try a different search.</p>`
                }
                else {
                    mealContainer.innerHTML = data.meals.map(meal =>
                        `
                        <div class="meal">
                        <img src="${meal.strMealThumb}
                        `)

                }
            })
    }
}

//event listener
//1-jese hi submit button press krein data ae fetch hoke
submit.addEventListener('submit', searchMeal);