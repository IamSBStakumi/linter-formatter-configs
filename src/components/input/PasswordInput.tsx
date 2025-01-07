import { ComponentProps } from "react";
import Input from "./Input";

type Props = {
  value?: ComponentProps<typeof Input>["value"];
  size?: ComponentProps<typeof Input>["size"];
  onChange?: ComponentProps<typeof Input>["onChange"];
};

const PasswordInput = ({ value, size, onChange }: Props) => (
  <Input
    name="password"
    type="password"
    placeholder="パスワード"
    {...{ value, size, onChange }}
  />
);

PasswordInput.defaultProps = {
  value: "",
  size: undefined,
  onChange: undefined,
};

export default PasswordInput;
