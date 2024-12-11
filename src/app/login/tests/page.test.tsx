import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../page";

describe("ログインコンポーネントのテスト", () => {
  render(<Login />);

  expect(screen.getByLabelText("hello, world"));
});
