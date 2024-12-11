"use client";

const LoginComponent = () => <p>Hello, World</p>;

const Login = () => {
  const a = 1;

  return (
    <div>
      <p>${a}login page</p>
      <LoginComponent />
    </div>
  );
};

export default Login;
