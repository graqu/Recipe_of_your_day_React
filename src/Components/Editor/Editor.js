import { useState } from "react";
import "./Editor.css";

const Editor = (props) => {
  const [inputsStatus, setInputsStatus] = useState(false);
  const newRecipe = props.items;

  const handleInputChange = (e) => {
    const dataToChange = e.target.getAttribute("data-item");
    props.onInputChange(dataToChange, e.target.value);
  };

  //Functions

  const handleNewItem = () => {
    if (newRecipe.title && newRecipe.ingrediends && newRecipe.description) {
      let num = parseFloat(props.currentNum) + 1;
      let newEntry = {
        id: num,
        title: newRecipe.title,
        ingrediends: newRecipe.ingrediends,
        description: newRecipe.description,
        opened: false,
      };
      props.onNewSubmit(newEntry);
    }
  };
  const handleUpdate = () => {
    if (newRecipe.title && newRecipe.ingrediends && newRecipe.description) {
      let newEntry = {
        title: newRecipe.title,
        ingrediends: newRecipe.ingrediends,
        description: newRecipe.description,
      };
      props.onUpdateSubmit(newEntry);
    }
  };

  //Elements to show

  return (
    <div className="row">
      {inputsStatus ? (
        <>
          <div className="col">
            <input
              value={newRecipe.title}
              onChange={handleInputChange}
              className="form-control form-control-lg"
              placeholder="Foodname"
              data-item="title"
            />
            <input
              value={newRecipe.ingrediends}
              onChange={handleInputChange}
              className="form-control form-control-lg"
              placeholder="Ingrediends"
              data-item="ingrediends"
            />
            <input
              value={newRecipe.description}
              onChange={handleInputChange}
              className="form-control form-control-lg"
              placeholder="Introduction"
              data-item="description"
            />
          </div>
          <div className="col-auto">
            {props.editionStatus ? (
              <>
                <button
                  className="btn btn-lg btn-primary mr-20"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="btn btn-lg btn-danger"
                  onClick={props.onCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleNewItem}
                  className="btn btn-lg btn-primary mr-20"
                >
                  Add Recipe
                </button>
                <button
                  onClick={() => setInputsStatus(false)}
                  className="btn btn-lg btn-warning"
                >
                  hide
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="container editor-button-block">
          <button
            onClick={() => setInputsStatus(true)}
            className="btn btn-lg btn-primary"
          >
            Create New Recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default Editor;
