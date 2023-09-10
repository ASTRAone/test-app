import React, { useState } from "react";
import { useStyles } from "../../hooks/useStyles";
import styles from "./styles.module.scss";
import { ListTasksItem } from "./ListTasksItem";
import { TodosProps } from "../../pages/Todo/Todo";
import { ModalTodo } from "../ModalTodo/ModalTodo";
import { usePopupControls } from "../../hooks/usePopupControls";
import { TextField, Button } from "@mui/material";

type Props = {
  todos: TodosProps[];
  deleteTodo: (value: number) => void;
  onChangeCompleteTodo: (value: number) => void;
  onEditTodo: (todo: TodosProps) => void;
};

export const ListTasks: React.FC<Props> = ({
  todos,
  deleteTodo,
  onChangeCompleteTodo,
  onEditTodo,
}) => {
  const cx = useStyles(styles);
  const [todoEdit, setTodoEdit] = useState<TodosProps>({
    id: 0,
    label: "",
    completed: false,
  });
  const { openPopup, isOpened, closePopup } = usePopupControls();
  const [changeField, setChangeField] = useState("");

  const handleDeleteTodo = (id: number) => {
    return () => {
      deleteTodo(id);
    };
  };

  const handleOnChangeCompleteTodo = (id: number) => {
    return () => {
      onChangeCompleteTodo(id);
    };
  };

  const openModalChangeTodo = (todo: TodosProps) => {
    return () => {
      setTodoEdit(todo);
      setChangeField(todo.label);
      openPopup();
    };
  };

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChangeField(value);
  };

  const handleEditTodo = () => {
    onEditTodo({
      ...todoEdit,
      label: changeField,
    });
    closePopup();
  };

  return (
    <ul className={cx("container")}>
      {todos.map((todo, index) => {
        const isFirst = index === 0;
        return (
          <ListTasksItem
            todo={todo}
            key={String(todo.id)}
            isFirst={isFirst}
            deleteTodo={handleDeleteTodo(todo.id)}
            onChangeCompleteTodo={handleOnChangeCompleteTodo(todo.id)}
            openModalChangeTodo={openModalChangeTodo(todo)}
          />
        );
      })}
      <ModalTodo opened={isOpened} closeModal={closePopup}>
        <div className={cx("todo-modal")}>
          <TextField value={changeField} onChange={handleChangeField} />
          <Button
            onClick={handleEditTodo}
            variant="contained"
            className={cx("btn")}
            disabled={!changeField.length}
          >
            Edit
          </Button>
        </div>
      </ModalTodo>
    </ul>
  );
};
