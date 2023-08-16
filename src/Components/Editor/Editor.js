import { useState } from "react";

const Editor = (props) => {
  const status = props.editionStatus;
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
    // {props.status && props.status ? (
    // <div className="row">
    //   <div className="col">
    //     <input
    //       value={props.status && props.status.title}
    //       onChange={setNewRecipe}
    //       name="title"
    //       className="form-control form-control-lg"
    //     />

    //     <input
    //       value={props.status && props.status.ingrediends}
    //       onChange={(e) => setNewRecipe(e)}
    //       name="ingrediends"
    //       className="form-control form-control-lg"
    //     />

    //     <input
    //       value={props.status && props.status.description}
    //       onChange={(e) => setNewRecipe(e)}
    //       name="description"
    //       className="form-control form-control-lg"
    //     />
    //   </div>
    //   <div className="col-auto">
    //     <button
    //       onClick={props.onChangeFn}
    //       className="btn btn-lg btn-primary mr-20"
    //     >
    //       Update
    //     </button>
    //     <button onClick={props.onCancelFn} className="btn btn-lg btn-danger">
    //       Cancel
    //     </button>
    //   </div>
    // </div>

    // ) : (
    <div className="row">
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
            <button className="btn btn-lg btn-danger" onClick={props.onCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleNewItem} className="btn btn-lg btn-primary">
            Add Recipe
          </button>
        )}
      </div>
    </div>
    //   )};
  );
};

export default Editor;
