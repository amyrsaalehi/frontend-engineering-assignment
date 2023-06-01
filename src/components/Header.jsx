import React from "react";
import "./Header.css";

export const Header = ({
  todos,
  data,
  config,
  onToggleAll,
  sortValue,
  onSortChange,
}) => {
  const completedTodosCount = todos.filter((todo) => todo.completed).length;
  const areAllTodosCompleted = completedTodosCount === data?.results.length;

  const onChangeHandler = (event) => {
    onSortChange(event.target.value);
    config.sorted = true;
  };

  return (
    <div className="header">
      <div className="header-completes">
        Completed Todos {completedTodosCount} / {todos.length}
      </div>

      <div className="header-filter_wrapper">
        <div>
          <span className="header-sort_label">Sort by</span>
          <select
            className="header-sort_select"
            value={sortValue}
            onChange={(event) => onChangeHandler(event)}
          >
            <option value="">default</option>
            <option value="title">Title</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <span className="header-toggle_label">Complete all</span>
          <input
            type="checkbox"
            checked={areAllTodosCompleted}
            onChange={() => onToggleAll(areAllTodosCompleted)}
          />
        </div>
      </div>
    </div>
  );
};
