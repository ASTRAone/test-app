import React, { useEffect, useState } from "react";
import { useStyles } from "../../hooks/useStyles";
import styles from "./styles.module.scss";
import Context from "../../Context/ContextTodo";
import { FormTasks } from "../../components/FormTask";
import { ListTasks } from "../../components/ListTasks";
import { TabPanel } from "../../components/TabPanel";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IMAGE_ROUTE } from "../../utility/constants";

type Props = {
  id: number;
  completed: boolean;
  label: string;
};

export const Todo: React.FC = () => {
  const cx = useStyles(styles);
  const navigate = useNavigate();

  const [todos, setTodos] = useState<Props[]>(
    JSON.parse(localStorage.getItem("todos") || "[]") as Props[]
  );
  const [filteredTodos, setFilteredTodos] = useState<Props[]>(todos);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addedTodo = (label: string) => {
    const newTodo: Props = {
      label: label,
      id: Date.now(),
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const onChangeCompleteTodo = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const clearCompletedTodos = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const onEditTodo = (todo: Props) => {
    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === todo.id) {
          item.label = todo.label;
        }
        return item;
      })
    );
  };

  const goToImagePage = () => navigate(IMAGE_ROUTE);

  const todosActive = filteredTodos.filter((todo) => !todo.completed).length;

  return (
    <Context.Provider
      value={{
        todosActive: todosActive,
        todos: todos,
        clearCompletedTodos: clearCompletedTodos,
        setFilteredTodos: setFilteredTodos,
      }}
    >
      <>
        <div className={cx("app")}>
          <div className={cx("btns")}>
            <Button variant="outlined" onClick={goToImagePage}>
              go to Image Page
            </Button>
          </div>
          <div className={cx("container")}>
            <FormTasks addedTodo={addedTodo} />
            <ListTasks
              todos={filteredTodos}
              deleteTodo={deleteTodo}
              onChangeCompleteTodo={onChangeCompleteTodo}
              onEditTodo={onEditTodo}
            />
            <TabPanel />
          </div>
        </div>
      </>
    </Context.Provider>
  );
};

export type { Props as TodosProps };
