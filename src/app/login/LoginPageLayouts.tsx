"use client";

import styled from "styled-components";

const LoginPageWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  align-items: center;
  justify-content: start;
  width: 100vw;
  height: 100vh;
  padding: 3.5em;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
  justify-content: start;
`;

export { LoginPageWrapper, LoginForm };
