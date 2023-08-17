import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faClose,
  faClosedCaptioning,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import { Toast } from "bootstrap";
import Editor from "./Components/Editor/Editor";
import IconsWrap from "./Components/RecipeItem/IconsWrap";
import RecipeItem from "./Components/RecipeItem/RecipeItem";

function App() {
  // Recipes (Ideas for dish) states
  const [editorMode, setEditorMode] = useState(false);
  const [inputsShowStatus, setInputsShowStatus] = useState(false);

  const handleShowingInputs = (value) => {
    setInputsShowStatus(value);
  };

  //states
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingrediends: "",
    description: "",
  });
  const [updateData, setUpdateData] = useState("");
  const [recipe, setRecipe] = useState([
    {
      id: 1,
      title: "Grilled basil chicken",
      ingrediends:
        "fresh basil leaves, boneless skinless chicken breast halves  2 tbsp olive oil, 1 garlic clove, minced, 4 plum tomatoes, balsamic vinegar",
      description:
        "After washing basil and tomatoes, blot them dry with clean paper towel.Using a clean cutting board, cut tomatoes into quarters. For marinade, place first six ingredients in a blender. Cover and process until well blended. Place chicken breasts in a shallow dish. Cover with marinade. Cover dish. Refrigerate about 1 hour, turning occasionally.Place chicken on an oiled grill rack over medium heat.Grill chicken 4-6 minutes per side.",
      opened: false,
    },
    {
      id: 2,
      title: "Skillet Macaroni and Cheese",
      ingrediends:
        "6 ounces macaroni, water to cover, 1 can evaporated milk, 1 ounce heavy cream, 6 ounces grated Colby cheese",
      description: `Place a medium skillet over medium-high heat. Pour in dry macaroni noodles. Pour in enough water to barely cover macaroni. Bring to a boil, stirring continuously. Continue stirring the macaroni until water is almost evaporated and pasta is tender yet firm to the bite, about 8 minutes. Pour in evaporated milk and cream. Add grated cheese and stir until cheese has melted and everything is well combined. Serve immediately.`,
      opened: false,
    },
    {
      id: 3,
      title: "spaghetti",
      ingrediends: "pasta,meat,sauce in bag",
      description:
        "cook Pasta, fry meat and mix all with sauce (prepared as in introduction). Enyoy!",
      opened: false,
    },
  ]);

  //functions

  const inputsHandler = (entry, value) => {
    setNewRecipe({
      ...newRecipe,
      [entry]: value,
    });
  };
  const newRecipeHandler = (newEntry) => {
    setRecipe([...recipe, newEntry]);
    setNewRecipe({
      title: "",
      ingrediends: "",
      description: "",
    });
  };
  const handleExtendRecipe = (id) => {
    let newRecipe = recipe.map((item) => {
      if (item.id === id && !item.opened) {
        collapseAll();
        return { ...item, opened: !item.opened };
      } else if (item.id === id) {
        return { ...item, opened: !item.opened };
      }
      return item;
    });
    setRecipe(newRecipe);
  };
  const deleteRecipe = (id) => {
    let newRecipes = recipe.filter((item) => item.id !== id);
    setRecipe(newRecipes);
  };
  const startEdition = (item) => {
    setEditorMode(true);
    setUpdateData(item);
    setNewRecipe({
      title: item.title,
      ingrediends: item.ingrediends,
      description: item.description,
    });
    handleShowingInputs(true);
  };
  const handleUpdate = (entry) => {
    let filteredRecords = [...recipe].filter(
      (item) => item.id !== updateData.id
    );
    const newEntry = {
      id: updateData.id,
      title: entry.title,
      ingrediends: entry.ingrediends,
      description: entry.description,
      opened: false,
    };
    let updatedObject = [...filteredRecords, newEntry];
    setRecipe(updatedObject);
    cancelUpdate();
    handleShowingInputs(false);
  };
  const cancelUpdate = () => {
    setEditorMode(false);
    setUpdateData("");
    setNewRecipe({
      title: "",
      ingrediends: "",
      description: "",
    });
  };
  const collapseAll = () => {
    const allItemsClosed = recipe.map((item) => (item.opened = false));
    setRecipe(allItemsClosed);
  };

  return (
    <div className="container App">
      <h1 className="app__heading">Recipe of your day - React App</h1>

      <Editor
        currentNum={recipe.length}
        onNewSubmit={newRecipeHandler}
        onUpdateSubmit={handleUpdate}
        onInputChange={inputsHandler}
        onCancel={cancelUpdate}
        onInputsShow={handleShowingInputs}
        editionStatus={editorMode}
        showStatus={inputsShowStatus}
        items={newRecipe}
      />

      {/* {Display recipes} */}
      {recipe && recipe.length ? "" : <h2>No Recipes on your list...</h2>}
      {recipe &&
        recipe
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((item, index) => {
            return (
              <RecipeItem
                key={item.id}
                orderNumber={index}
                data={item}
                onDeleteFn={deleteRecipe}
                onExtendFn={handleExtendRecipe}
                onEditFn={startEdition}
              />
            );
          })}
    </div>
  );
}

export default App;
