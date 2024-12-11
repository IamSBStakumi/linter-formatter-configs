"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ServerStyleSheet,
  StyleSheetManager,
  createGlobalStyle,
} from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: "Helvetica Neue", Arial, Helvetica, "Yu Gothic", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
    background: rgb(218 227 243);
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const StyledComponentsRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();

    return styles;
  });

  if (typeof window !== "undefined") return children;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <GlobalStyle />
      {children}
    </StyleSheetManager>
  );
};

export default StyledComponentsRegistry;
