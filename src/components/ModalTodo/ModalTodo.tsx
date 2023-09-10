import React from "react";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useStyles } from "../../hooks/useStyles";
import styles from "./styles.module.scss";

type Props = {
  opened: boolean;
  closeModal: () => void;
  children: JSX.Element;
};

export const ModalTodo: React.FC<Props> = ({
  opened,
  closeModal,
  children,
}) => {
  const cx = useStyles(styles);
  return (
    <Modal open={opened} onClose={closeModal}>
      <div className={cx("container")}>
        <CloseIcon onClick={closeModal} className={cx("icon")} />
        {children}
      </div>
    </Modal>
  );
};
