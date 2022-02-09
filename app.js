const application_id="6c2c805b"
const application_key="24163cdf334cf9f81f72f770bce7ac0f"
const input=document.querySelector('#search input')
const button=document.querySelector('#search button')
const container=document.querySelector('div.recipe-container')

const getRecipe=async (query)=>{
    //clear the previoes images if any
    container.innerHTML=null
     const endpoint=`https://api.edamam.com/search?q=${query}&app_id=${application_id}&app_key=${application_key}`

     console.log(endpoint);

     const res=await fetch(endpoint)
     const data=await res.json()
     console.log(data)
     const {hits}=data
     return hits

    }


    const createRecipeCard=(image,Name,cookTime,recipeUrl,dishtype,cuisine,label,ingredients)=>{
    
        return `<div class="ft-recipe"> 
            <div class="ft-recipe__thumb">
            <span id="close-modal">
            <i class="ion ion-md-close"></i>
            </span>
               <h3>Recipe</h3><img src=${image} alt="Strawberry Waffle"/>
            </div>
            <div class="ft-recipe__content">
                <header class="content__header">
                    <div class="row-wrapper">
                        <h2 class="recipe-title" style="color:white" >${label.toUpperCase()}</h2>
                            <div class="user-rating"></div>
                    </div>
                    <ul class="recipe-details">
                        <li class="recipe-details-item time">
                           <i class="ion ion-ios-clock-outline"></i>
                           <span class="value">${cookTime}</span>
                           <span class="title" style="color:white">Minutes</span>
                        </li>
                        <li class="recipe-details-item ingredients"> 
                           <i class="ion ion-ios-book-outline"></i>
                           <span class="value">${dishtype}</span>
                           <span class="title" style="color:white">Type</span>
                        </li>
                        <li class="recipe-details-item servings">
                           <i class="ion ion-ios-person-outline"></i>
                           <span class="value">${cuisine}</span>
                           <span class="title" style="color:white">Cuisine</span>
                        </li>
                    </ul>
                </header>
                <br/>
                <footer class="content__footer"><a href=${recipeUrl}>View Recipe</a></footer>
            </div>
        </div>`
    }
const handleSearch=async()=>{
    const query=input.value
    const hits=await getRecipe(query)
    
    hits.forEach(hit => {
        // console.log(hit);
        const {recipe}=hit
        const ele=document.createElement('div')
        const markup=createRecipeCard(recipe.image,query,recipe.totalTime, recipe.url,recipe.dishType,recipe.cuisineType, recipe.label,recipe.ingredientLines)
        ele.innerHTML=markup
        container.appendChild(ele)
        console.log(recipe);

    });
}


button.addEventListener('click',handleSearch)