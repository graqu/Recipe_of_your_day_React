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

//Temp State

const [updateData, setUpdateData] = useState("");

//Add Recipe
const addRecipe = () => {
  if (newRecipe.title && newRecipe.ingrediends && newRecipe.description) {
    let num = recipe.length + 1;
    let newEntry = {
      id: num,
      title: newRecipe.title,
      ingrediends: newRecipe.ingrediends,
      description: newRecipe.description,
      opened: false,
    };
    setRecipe([...recipe, newEntry]);
    setNewRecipe({
      title: "",
      ingrediends: "",
      description: "",
    });
  }
};
//Delete Recipe
const deleteRecipe = (id) => {
  let newRecipes = recipe.filter((item) => item.id !== id);
  setRecipe(newRecipes);
};
//Mark/extend Recipe
const markRecipe = (id) => {
  let newRecipe = recipe.map((item) => {
    if (item.id === id) {
      return { ...item, opened: !item.opened };
    }
    return item;
  });
  setRecipe(newRecipe);
};
//cancelUpdate
const cancelUpdate = () => {
  setUpdateData({
    ...updateData,
    ingrediends: "",
    description: "",
  });
};
//Change Recipe
const changeRecipe = (e) => {
  let newEntry = {
    id: updateData.id,
    title: updateData.title,
    opened: updateData.opened,
    ingrediends: updateData.ingrediends,
    description: updateData.description,
  };

  switch (e.target.name) {
    case "title":
      newEntry.title = e.target.value;
      break;
    case "ingrediends":
      newEntry.ingrediends = e.target.value;
      break;
    case "description":
      newEntry.description = e.target.value;
      break;
    default:
      break;
  }

  setUpdateData(newEntry);
};
//Update Recipe
const updateRecipe = () => {
  let filteredRecords = [...recipe].filter((item) => item.id !== updateData.id);
  let updatedObject = [...filteredRecords, updateData];
  setRecipe(updatedObject);
  setUpdateData("");
};

function App() {
  // Recipes (Ideas for dish) states

  return (
    <div className="container App">
      <h1 className="app__heading">Recipe of your day - React App</h1>

      {/* {Update Recipe} */}
      <Editor
        status={updateData}
        newItem={newRecipe}
        onInputChange={setNewRecipe}
        onCancelFn={cancelUpdate}
        onSubmitFn={addRecipe}
        onChangeFn={updateRecipe}
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
                        onClick={() => markRecipe(item.id)}
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                      </span>
                    ) : (
                      <span
                        title="Extended / not extended"
                        onClick={() => markRecipe(item.id)}
                      >
                        <FontAwesomeIcon icon={faArrowDown} />
                      </span>
                    )}

                    <span
                      title="Edit"
                      onClick={() =>
                        setUpdateData({
                          id: item.id,
                          title: item.title,
                          ingrediends: item.ingrediends,
                          description: item.description,
                          opened: item.opened,
                        })
                      }
                    >
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
