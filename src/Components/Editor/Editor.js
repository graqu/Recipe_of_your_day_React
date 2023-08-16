import { useState } from "react";

const Editor = (props) => {
  const status = props.status;
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingrediends: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const dataToChange = e.target.getAttribute("data-item");

    setNewRecipe({
      ...newRecipe,
      [dataToChange]: e.target.value,
    });
    console.log(newRecipe);
  };

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
        <button
          // onClick={addRecipe}
          className="btn btn-lg btn-primary"
        >
          Add Recipe
        </button>
      </div>
    </div>
    //   )};
  );
};

export default Editor;
