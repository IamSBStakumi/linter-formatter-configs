"use client";

import styled from "styled-components";
import { ReactNode, useCallback, useEffect, useRef } from "react";

type Props = {
  isDisplayed: boolean;
  setIsDisplayed: (v: boolean) => void;
  children: ReactNode;
};

const PositionHolder = styled.div`
  position: relative;
  display: block;
  width: 0;
  height: 0;
  padding: 0;
  margin: 0;
`;

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  width: 0;
  height: 0;
`;

const PullDownMenu = ({ isDisplayed, setIsDisplayed, children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const hideMenuOnClickOutside = useCallback(
    (e: MouseEvent) => {
      let clickedElement = e.target as HTMLElement | null;
      while (
        clickedElement != null &&
        clickedElement !== containerRef.current
      ) {
        clickedElement = clickedElement.parentElement;
      }

      if (clickedElement == null) {
        setIsDisplayed(false);
      }
    },
    [setIsDisplayed],
  );

  useEffect(() => {
    if (isDisplayed) {
      document.addEventListener("click", hideMenuOnClickOutside);
    }

    return () => {
      if (isDisplayed) {
        document.removeEventListener("click", hideMenuOnClickOutside);
      }
    };
  }, [isDisplayed, hideMenuOnClickOutside]);

  return isDisplayed ? (
    <PositionHolder>
      <Container ref={containerRef}>{children}</Container>
    </PositionHolder>
  ) : (
    false
  );
};

export default PullDownMenu;
