const Editor = (props) => {
  return    {props.status && props.status ? (
    <>
      <div className="row">
        <div className="col">
          <input
            value={props.status && props.status.title}
            onChange={(e) => changeRecipe(e)}
            name="title"
            className="form-control form-control-lg"
          />

          <input
            value={props.status && props.status.ingrediends}
            onChange={(e) => changeRecipe(e)}
            name="ingrediends"
            className="form-control form-control-lg"
          />

          <input
            value={props.status && props.status.description}
            onChange={(e) => changeRecipe(e)}
            name="description"
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-auto">
          <button
            onClick={updateRecipe}
            className="btn btn-lg btn-primary mr-20"
          >
            Update
          </button>
          <button onClick={cancelUpdate} className="btn btn-lg btn-danger">
            Cancel
          </button>
        </div>
      </div>
      <br />
    </>
  ) : (
    <>
      <div className="row">
        <div className="col">
          <input
            value={props.newItem.title}
            onChange={(e) =>
              props.onInputChange({ ...props.newItem, title: e.target.value })
            }
            className="form-control form-control-lg"
            placeholder="Foodname"
          />
          <input
            value={props.newItem.ingrediends}
            onChange={(e) =>
              props.onInputChange({ ...props.newItem, ingrediends: e.target.value })
            }
            className="form-control form-control-lg"
            placeholder="Ingrediends"
          />
          <input
            value={props.newItem.description}
            onChange={(e) =>
              props.onInputChange({ ...props.newItem, description: e.target.value })
            }
            className="form-control form-control-lg"
            placeholder="Introduction"
          />
        </div>
        <div className="col-auto">
          <button onClick={addRecipe} className="btn btn-lg btn-primary">
            Add Recipe
          </button>
        </div>
      </div>
      <br />
    </>
  )};
};

export default Editor;
