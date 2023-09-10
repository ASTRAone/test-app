import React from "react";
import styles from "./styles.module.scss";
import { useStyles } from "../../../hooks/useStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { TodosProps } from "../../../pages/Todo/Todo";

type Props = {
  todo: TodosProps;
  isFirst: boolean;
  deleteTodo: () => void;
  onChangeCompleteTodo: () => void;
  openModalChangeTodo: () => void;
};

export const ListTasksItem: React.FC<Props> = ({
  todo,
  isFirst,
  deleteTodo,
  onChangeCompleteTodo,
  openModalChangeTodo,
}) => {
  const cx = useStyles(styles);
  const { completed, label } = todo;

  return (
    <li className={cx("container", { isFirst })}>
      <div className={cx("content")}>
        <div onClick={onChangeCompleteTodo}>
          {completed ? (
            <CheckCircleIcon className={cx("icon", { completed })} />
          ) : (
            <PanoramaFishEyeIcon className={cx("icon")} />
          )}
        </div>
        <p className={cx("text", { completed })}>{label}</p>
      </div>
      <div>
        <EditIcon onClick={openModalChangeTodo} className={cx("icon")} />
        <DeleteIcon onClick={deleteTodo} className={cx("icon")} />
      </div>
    </li>
  );
};
