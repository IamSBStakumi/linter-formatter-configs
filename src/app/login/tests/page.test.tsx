import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../page";

describe("ログインコンポーネントのテスト", () => {
  test("Hello, Worldがあるか", () => {
    render(<Login />);

    expect(screen.getByText("Hello, World"));
  });
});
