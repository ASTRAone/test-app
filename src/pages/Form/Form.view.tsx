import React from "react";
import { useStyles } from "../../hooks/useStyles";
import styles from "./styles.module.scss";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const FormUserView: React.FC = () => {
  const cx = useStyles(styles);

  const form = useFormContext();
  const {
    control,
    watch,
    formState: { errors },
  } = form;

  const [checkbox] = watch(["checkbox"]);

  return (
    <div className={cx("app")}>
      <div className={cx("container")}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value = "", onChange } }) => (
            <TextField
              error={!!errors.name}
              label="Name"
              value={value}
              onChange={onChange}
            />
          )}
          name="name"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value = "", onChange } }) => (
            <TextField
              error={!!errors.email}
              label="Email"
              type="email"
              value={value}
              onChange={onChange}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value = "", onChange } }) => (
            <TextField
              error={!!errors.phone}
              label="Phone"
              value={value}
              onChange={onChange}
            />
          )}
          name="phone"
        />

        <Controller
          control={control}
          rules={{
            required: true,
            validate: {
              samePass: (value) => value === form.getValues("confirmPassword"),
            },
          }}
          render={({ field: { value = "", onChange } }) => (
            <TextField
              error={!!errors.password}
              type="password"
              label="Password"
              value={value}
              onChange={onChange}
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{
            required: true,
            validate: {
              passConfirm: (value) => value === form.getValues("password"),
            },
          }}
          render={({ field: { value = "", onChange } }) => (
            <TextField
              error={!!errors.confirmPassword}
              label="Confirm password"
              type="password"
              value={value}
              onChange={onChange}
            />
          )}
          name="confirmPassword"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value = false, onChange } }) => (
            <FormControlLabel
              label="Даю согласие на обработку своих данных"
              control={
                <Checkbox
                  className={cx("checkbox")}
                  checked={value}
                  onChange={onChange}
                />
              }
            />
          )}
          name="checkbox"
        />

        <Button variant="contained" type="submit" disabled={!checkbox}>
          Success
        </Button>
      </div>
    </div>
  );
};
