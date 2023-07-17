const API_URL = "https://fsa-async-await.herokuapp.com/api/demo/recipes/";

const recipiesContainer = document.querySelector("#recipes-container");

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

const init = async () => {
  const recipes = await fetchAllRecipes();

  console.log("RECIPES", recipes);

  // const hamburger = await fetchSingleRecipe(580);
  // //console.log("HAMBURGER", hamburger);

  // const title = "Chimichanga55";
  // const image_url = "https://thesaltedpepper.com/wp-content/uploads/2020/04/chimichanga-sq.jpg";
  // const instructions = "Fry a burrito and eat up!";

  // const newRecipe = await createNewRecipe(title, image_url, instructions);
  // console.log("CHIMI?", newRecipe);

  const deleted = await removeRecipe(1848);
  console.log("DELETED: ", deleted);

  const newRecipes = await fetchAllRecipes();

  console.log("NEW Recipes", newRecipes);
};

init();
