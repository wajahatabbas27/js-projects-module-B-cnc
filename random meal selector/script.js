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
                resultHeading.innerHTML = `<h2>Search results for "${term}":</h2>`

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>there are no search results for '${term}'.Please try a different search.</p>`
                }
                else {
                    mealContainer.innerHTML = data.meals.map(meal =>
                        `
                        <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                        </div>
                        </div>
                        `)
                        .join('');
                }
            })
    }
    else {
        alert('please enter a valid search');
    }

    //search ko clear krrhe hain hm
    search.value = '';

    //clear selected meal
    selectedMeal.innerHTML = '';
}

//function to fetch meal data using meal id
function getMealByID(mealID) {
    //api se data fetc kreinge hm 
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            //jska index 0 hai wo call krrhe hain hm aur save krrhe hain hm meal const mein.
            const meal = data.meals[0];         //data ke andar jo meals hai uske andar jo object hai 0 index pe usko save krrhe hain meal variable mein hm
            addMealToDOM(meal);                 //function bnaya hai take data show hojae dom mein jo call krlia hai hmne meal mein
        })

}

//function to add a meal to DOM
function addMealToDOM(meal) {
    const ingredients = [];   //20 hain ingredients array empty meinpush kreinge api se
    
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            //ingredient mein push kreinge 
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);          //ingredient hoga to ajaega 
        }
        else {
            //agar ingredient exist nhi krta to break krdo
            break;
        }
    }

    //main page pe show krarhe hain hm
    selectedMeal.innerHTML = `
    <div class="selected-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    
    <div class="selected-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p> ` : ''}
    ${meal.strArea ? `<p>${meal.strArea}</p> ` : ''}
    </div>

    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(ingredient =>
        `<li>${ingredient}</li>`
    )
        .join('')}
        </ul>
        </div>
        </div>

    `

}

//event listener
//1-jese hi submit button press krein data ae fetch hoke
submit.addEventListener('submit', searchMeal);

//2.when clicking the meal, meal recipe show hojae
mealContainer.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        }
        else {
            return false
        }
        //agar meal-info agae hai to ab usse meal id get kreinge hm take idse uski recipe leke aein hm

        if (mealInfo) {
            const mealID = mealInfo.getAttribute('data-mealid');
            getMealByID(mealID);                    //function call krrhe hain hm 
        }

    })
})