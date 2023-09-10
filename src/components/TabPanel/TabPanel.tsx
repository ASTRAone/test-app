import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { useStyles } from "../../hooks/useStyles";
import { CountIActiveItems } from "../CountIActiveItems";
import { FilterTodos } from "../FilterTodos";
import Context from "../../Context/ContextTodo";

export const TabPanel: React.FC = () => {
  const cx = useStyles(styles);
  const { clearCompletedTodos } = useContext(Context);

  return (
    <div className={cx("container")}>
      <CountIActiveItems />
      <FilterTodos />
      <button className={cx("btn")} onClick={clearCompletedTodos}>
        Clear completed
      </button>
    </div>
  );
};
