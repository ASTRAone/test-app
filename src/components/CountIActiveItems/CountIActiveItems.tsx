import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { useStyles } from "../../hooks/useStyles";
import Context from "../../Context/ContextTodo";

export const CountIActiveItems: React.FC = () => {
  const cx = useStyles(styles);
  const { todosActive } = useContext(Context);

  return (
    <div className={cx("container")}>
      <span className={cx("text")}>
        {todosActive} {todosActive > 1 ? "items" : "item"}
      </span>
    </div>
  );
};
