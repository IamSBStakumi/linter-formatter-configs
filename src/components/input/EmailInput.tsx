import { ChangeEvent, ComponentProps } from "react";
import Input from "./Input";

type Props = {
  setIsFormatInvalid?: (v: boolean) => void;
  value?: ComponentProps<typeof Input>["value"];
  size?: ComponentProps<typeof Input>["size"];
  onChange?: ComponentProps<typeof Input>["onChange"];
};

// 簡単にされたメールアドレス・パターン。（正確なパターンは非常に複雑である。）
const EMAIL_INPUT_PATTERN = /^[A-Za-z0-9.\-_+~=]+@[A-Za-z0-9.\-_+~=]+$/;

const EmailInput = ({ setIsFormatInvalid, value, size, onChange }: Props) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }

    const newValue = e.target.value;
    setIsFormatInvalid?.(
      newValue ? !EMAIL_INPUT_PATTERN.test(newValue) : false,
    );
  };

  return (
    <Input
      name="email"
      type="email"
      placeholder="メールアドレス"
      onChange={handleInputChange}
      {...{ value, size }}
    />
  );
};

EmailInput.defaultProps = {
  setIsFormatInvalid: undefined,
  value: "",
  size: undefined,
  onChange: undefined,
};

export default EmailInput;
