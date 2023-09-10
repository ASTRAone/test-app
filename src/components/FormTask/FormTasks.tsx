import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useStyles } from "../../hooks/useStyles";

type Props = {
  addedTodo: (value: string) => void;
};

export const FormTasks: React.FC<Props> = ({ addedTodo }) => {
  const cx = useStyles(styles);
  const [value, setValue] = useState("");

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (value.trim()) {
        addedTodo(value);
        setValue("");
      }
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("iconContainer")}></div>
      <input
        type="text"
        className={cx("input")}
        placeholder="What needs to be done?"
        value={value}
        onChange={handleChangeValue}
        onKeyDown={keyPressHandler}
      />
    </div>
  );
};
