const API_URL = "https://fsa-async-await.herokuapp.com/api/demo/recipes/";

const recipesContainer = document.querySelector("#recipes-container");
const formContainer = document.querySelector("#form-container");

const fetchURL = async (url) => {
  try {
    const response = await fetch(url);
    const item = await response.json();
    return item;
  } catch (error) {
    console.log(error);
  }
};

const fetchAllRecipes = async () => {
  return await fetchURL(API_URL);
};

const fetchSingleRecipe = async (id) => {
  return await fetchURL(`${API_URL}/${id}`);
};

// POST (create new item)
// URL = API_URL
// Give the server title, image_url, instructions
const createNewRecipe = async (title, image_url, instructions) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      //A stringified JSON object
      body: JSON.stringify({
        title,
        image_url,
        instructions,
      }),
      headers: {
        "Content-Type": `application/json`,
      },
    });
    const recipe = await response.json();
    return recipe;
  } catch (error) {
    console.log(error);
  }
};

// DELETE http Method
// need id
// URL = API_URL/{id}
const removeRecipe = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const recipe = await response.json();
    return recipe;
  } catch (error) {
    console.log(error);
  }
};

// Append each recipe to the page
const renderAllRecipes = (recipeList) => {
  //check for empty/undefined lists
  if (!recipeList || recipeList.length === 0) {
    recipesContainer.innerHTML = "<h3>No recipes found</h3>";
    return;
  }

  //Clear the page
  recipesContainer.innerHTML = "";

  //Define each recipe
  recipeList.forEach((recipe) => {
    //create element
    const recipeElement = document.createElement("div");
    recipeElement.classList.add('recipe-card');
    //add details
    recipeElement.innerHTML = `
      <h4>${recipe.title}</h4>
      <img class="recipe-img" src="${recipe.image_url}" alt="${recipe.title}"/>
      <p>${recipe.instructions}</p>
    `;

    //TODO
    //create a button with a listner
    //handler should call removeRecipe

    //append to container
    recipesContainer.appendChild(recipeElement);
  });
};

//Create a form that will create a new recipe when submitted
const createNewRecipeForm = () => {
  // create the form (Created in HTML)

  // formContainer.innerHTML = `
  // <form>
  // <label for="title">Title</label>
  // <input type="text" id="title" name="title" placeholder="Enter Title" />
  // <label for="img_url">Image URL</label>
  // <input type="text" id="image_url" name="image_url" placeholder="ImageURL" />
  // <label for="instructions">Instructions</label>
  // <textarea id="instructions" name="instructions" placeholder="Enter Instructions"></textarea>
  // <button type="submit">Create</button>
  // </form>
  // `;

  const form = formContainer.querySelector('form');

  // Set up event listener for the form
  form.addEventListener('submit', submitHandler);
}

const submitHandler = async (event) => {
  event.preventDefault();
  //eventlistener should call createNewRecipe 
  const form = event.target;

  const title = form.title.value;
  const image_url = form.image_url.value;
  const instructions = form.instructions.value;

  await createNewRecipe(title, image_url, instructions);

  form.title.value = "";
  form.image_url.value = "";
  form.instructions.value = "";
 
  
  const recipes = await fetchAllRecipes();
  renderAllRecipes(recipes);
}

const init = async () => {

  createNewRecipeForm();

  const recipes = await fetchAllRecipes();
  renderAllRecipes(recipes);
};

init();
