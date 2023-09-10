import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { useStyles } from "../../hooks/useStyles";
import Context from "../../Context/ContextTodo";

export type FiltersTypes = "all" | "completed" | "active";

export const FilterTodos: React.FC = () => {
  const cx = useStyles(styles);
  const { todos, setFilteredTodos } = useContext(Context);

  const handleChangeFilter = (filter: FiltersTypes) => {
    return () => {
      filteredTodosList(filter);
    };
  };

  const filteredTodosList = (filter: FiltersTypes) => {
    switch (filter) {
      case "all":
        setFilteredTodos(todos);
        break;
      case "active":
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  };

  return (
    <div className={cx("container")}>
      <button onClick={handleChangeFilter("all")}>All</button>
      <button onClick={handleChangeFilter("active")}>Active</button>
      <button onClick={handleChangeFilter("completed")}>Completed</button>
    </div>
  );
};
