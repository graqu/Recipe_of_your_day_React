import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const IconsWrap = (props) => {
  return (
    <div className="iconsWrap">
      {props.itemData.opened ? (
        <span
          title="Extended / not extended"
          onClick={() => props.onIcons("extend", props.itemData)}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </span>
      ) : (
        <span
          title="Extended / not extended"
          onClick={() => props.onIcons("extend", props.itemData)}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </span>
      )}

      <span title="Edit" onClick={() => props.onIcons("edit", props.itemData)}>
        <FontAwesomeIcon icon={faPen} />
      </span>

      <span
        title="Delete"
        onClick={() => props.onIcons("delete", props.itemData)}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </span>
    </div>
  );
};

export default IconsWrap;
