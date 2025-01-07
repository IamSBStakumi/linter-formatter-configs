"use client";

import { useState, useActionState } from "react";
import styled from "styled-components";
import authenticate from "../../lib/next-auth/actions";
import Button from "../../components/input/Button";
import PasswordInput from "../../components/input/PasswordInput";
import EmailInput from "../../components/input/EmailInput";

import { LoginPageWrapper, LoginForm } from "./LoginPageLayouts";
import ErrorMessage from "./ErrorMessage";

const LoginButton = styled(Button)`
  margin-top: 3em;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const [state, dispatch, isPending] = useActionState(authenticate, undefined);

  return (
    <LoginPageWrapper>
      <LoginForm action={dispatch}>
        <EmailInput
          value={email}
          size={25}
          onChange={(e) => setEmail(e.target.value)}
          setIsFormatInvalid={setIsEmailInvalid}
        />
        <ErrorMessage $isDisplayed={isEmailInvalid}>
          無効なメールアドレスです
        </ErrorMessage>
        <PasswordInput
          value={password}
          size={25}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton disabled={!email || !password || isPending}>
          ログイン
        </LoginButton>
        <ErrorMessage $isDisplayed={!!state}>
          メールアドレスまたはパスワードが間違っています
        </ErrorMessage>
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default Login;
