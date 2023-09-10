import { createContext } from "react";
import { TodosProps } from "../pages/Todo/Todo";

type Props = {
  todosActive: number;
  clearCompletedTodos: () => void;
  setFilteredTodos: (value: TodosProps[]) => void;
  todos: TodosProps[];
};

const Context = createContext<Props>({
  todosActive: 0,
  todos: [],
  clearCompletedTodos: () => {},
  setFilteredTodos: () => {},
});

export default Context;
