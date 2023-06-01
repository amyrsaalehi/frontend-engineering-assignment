import React, { useMemo } from "react";
import {Modal} from "./";
import { getLocation, getPicture, getNames } from "../utils";
import "./Todo.css";

export const Todo = ({ todo, onChange, isCompleted }) => {
  const [showModal, setShownModal] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const showHideClassName = showModal
    ? "modal display-block"
    : "modal display-none";

  const handleModal = () => {
    setShownModal(!showModal);
  };

  const closeModal = () => {
    setShownModal(false);
  };

  React.useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  const userName = useMemo(() => getNames(todo), [todo]);

  const userLocation = useMemo(() => getLocation(todo), [todo]);

  return (
    <div className="todo">
      <div className="todo_title">{userName}</div>
      <div className="todo_image">{getPicture(todo)}</div>
      <div className="todo_location">{userLocation}</div>
      <span>
        Completed:{" "}
        <input
          type="checkbox"
          checked={completed}
          className="todo_checked"
          onChange={onChange}
        />
      </span>
      <div className="todo_details">
        <button onClick={handleModal}>
          Details
        </button>
      </div>
      <Modal showHideClassName={showHideClassName} todo={todo} closeModal={closeModal} />
    </div>
  );
};




