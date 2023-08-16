import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faClose,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import { Toast } from "bootstrap";
import Editor from "./Components/Editor/Editor";

function App() {
  // Recipes (Ideas for dish) states
  const [editorMode, setEditorMode] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingrediends: "",
    description: "",
  });
  const [updateData, setUpdateData] = useState("");
  const [recipe, setRecipe] = useState([
    {
      id: 1,
      title: "spagetti",
      ingrediends: "pasta,meat,sauce",
      description: "cook Pasta, fry meat and mix all with sauce. Enyoy!",
      opened: false,
    },
    {
      id: 2,
      title: "Scrambled Eggs",
      ingrediends: "Eggs, butter, bread, sausage",
      description: "fry Eggs and cutted sausage on butter - Eat with bread",
      opened: false,
    },
  ]);

  const inputsHandler = (entry, value) => {
    setNewRecipe({
      ...newRecipe,
      [entry]: value,
    });
    console.log(newRecipe);
  };
  const newRecipeHandler = (newEntry) => {
    setRecipe([...recipe, newEntry]);
    setNewRecipe({
      title: "",
      ingrediends: "",
      description: "",
    });
  };
  const extendRecipe = (id) => {
    let newRecipe = recipe.map((item) => {
      if (item.id === id) {
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
    console.log(item);
    setUpdateData(item);
    setNewRecipe({
      title: item.title,
      ingrediends: item.ingrediends,
      description: item.description,
    });
  };
  const handleUpdate = (entry) => {
    console.log(`zamienię 1 na 2`);
    console.log(updateData);
    console.log(entry);
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

  return (
    <div className="container App">
      <h1 className="app__heading">Recipe of your day - React App</h1>

      <Editor
        currentNum={recipe.length}
        onNewSubmit={newRecipeHandler}
        onUpdateSubmit={handleUpdate}
        onInputChange={inputsHandler}
        onCancel={cancelUpdate}
        editionStatus={editorMode}
        items={newRecipe}
      />

      {/* {Display recipes} */}
      {recipe && recipe.length ? "" : "No Recipes on your list..."}
      {recipe &&
        recipe
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((item, index) => {
            return (
              <React.Fragment key={item.id}>
                <div className="col itemBg">
                  <div>
                    <span className="itemNumber">{index + 1}</span>
                    <span className="itemText">{item.title}</span>
                  </div>
                  <div className="iconsWrap">
                    {item.opened ? (
                      <span
                        title="Extended / not extended"
                        onClick={() => extendRecipe(item.id)}
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                      </span>
                    ) : (
                      <span
                        title="Extended / not extended"
                        onClick={() => extendRecipe(item.id)}
                      >
                        <FontAwesomeIcon icon={faArrowDown} />
                      </span>
                    )}

                    <span title="Edit" onClick={() => startEdition(item)}>
                      <FontAwesomeIcon icon={faPen} />
                    </span>

                    <span title="Delete" onClick={() => deleteRecipe(item.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                  <div
                    className={
                      item.opened ? "extended description" : "description"
                    }
                  >
                    <p>{item.ingrediends}</p>
                    <div>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
}

export default App;
