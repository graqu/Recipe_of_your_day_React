import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import { Toast } from "bootstrap";
import Editor from "./Components/Editor/Editor";

function App() {
  // Recipes (Ideas for dish) states
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

  return (
    <div className="container App">
      <h1 className="app__heading">Recipe of your day - React App</h1>

      <Editor />

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
                        // onClick={() => markRecipe(item.id)}
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                      </span>
                    ) : (
                      <span
                        title="Extended / not extended"
                        // onClick={() => markRecipe(item.id)}
                      >
                        <FontAwesomeIcon icon={faArrowDown} />
                      </span>
                    )}

                    <span
                      title="Edit"
                      // onClick={() =>
                      //   setUpdateData({
                      //     id: item.id,
                      //     title: item.title,
                      //     ingrediends: item.ingrediends,
                      //     description: item.description,
                      //     opened: item.opened,
                      //   })
                      // }
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </span>

                    <span
                      title="Delete"
                      // onClick={() => deleteRecipe(item.id)}
                    >
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
