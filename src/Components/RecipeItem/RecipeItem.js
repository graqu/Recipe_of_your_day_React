import IconsWrap from "./IconsWrap";
import "./RecipeItem.css";

const RecipeItem = (props) => {
  const handleIconsFn = (type, element) => {
    const id = element.id;
    switch (type) {
      case "edit":
        props.onEditFn(element);
        break;
      case "extend":
        props.onExtendFn(id);
        break;
      case "delete":
        props.onDeleteFn(id);
        break;
      default: {
      }
    }
  };

  return (
    <div className="col itemBg sm recipe-item">
      <div>
        <span className="itemNumber">{props.orderNumber + 1}</span>
        <span className="itemText">{props.data.title}</span>
      </div>
      <IconsWrap itemData={props.data} onIcons={handleIconsFn} />
      <div
        className={props.data.opened ? "extended description" : "description"}
      >
        <p>{props.data.ingrediends}</p>
        <div>
          <p>{props.data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
