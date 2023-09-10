import React from "react";
import { FormUserView } from "./Form.view";
import { Form } from "../../Form";
import { useNavigate } from "react-router-dom";
import { TODO_ROUTE } from "../../utility/constants";

export const FormUser: React.FC = () => {
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    console.log(data);
    navigate(TODO_ROUTE)
  };
  return (
    <Form style={{ height: "100%" }} onSubmit={onSubmit}>
      <FormUserView />
    </Form>
  );
};
