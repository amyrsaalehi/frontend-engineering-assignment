import React from "react";
import { useGetTodos } from "./http";
import { Header, Todo } from "./components";
import "./App.css";

import config from "./config.json"

const makeTitle = (value) => `${value.name.title}${value.name.first}${value.name.last}`

const getSortingStrategy = ({ sortValue }) => {
  switch (sortValue) {
    case "title":
      return (todos) => todos.sort((a, b) => makeTitle(b)?.localeCompare(makeTitle(a)));
    case "completed":
      return (todos) => todos.sort((a, b) => !!b.completed - !!a.completed);
    default:
      return (todos) => todos.sort((a, b) => b.login.uuid.localeCompare(a.login.uuid));
  }
};

export default function App() {
  const { data, error, isLoading } = useGetTodos();
  const [todos, setTodos] = React.useState([]);
  const [sortValue, setSortValue] = React.useState("");
  const [showTodos, setShowTodos] = React.useState([]);

  const handleShowMore = () => {
    const len = showTodos.length;

    setShowTodos(() => sortedTodos.slice(0, len + 10))
  }

  React.useEffect(() => {
    const d = data?.results.map((d) => ({...d, completed: false}))
    setTodos(() => d || []);
  }, [data]);

  const sortedTodos = React.useMemo(() => {
    return getSortingStrategy({ sortValue })(todos);
  }, [todos, sortValue]);

  React.useEffect(() => {
    setShowTodos(() => sortedTodos?.slice(0, 10));
  }, [sortedTodos, sortValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="app">
      <Header
        todos={todos}
        data={data}
        config={config}
        sortValue={sortValue}
        onSortChange={setSortValue}
        onToggleAll={(areAllTodosCompleted) => {
          setTodos(
            todos.map((todo) => ({
              ...todo,
              completed: !areAllTodosCompleted
            }))
          );
        }}
      />

      <div className="grid">
        {showTodos.map((todo, idx) => (
          <Todo
            key={todo.login.uuid}
            todo={todo}
            isCompleted={todo.completed}
            onChange={() => {
              setTodos((curr) => {
                return curr.map((item, i) =>
                  i === idx ? { ...item, completed: !item.completed } : item
                );
              });
            }}
          />
        ))}
      </div>
      {
        showTodos.length !== todos.length && (
          <button className="show-more-btn" onClick={handleShowMore}>
            Show More
          </button>
        )
      }
    </div>
  );
}
