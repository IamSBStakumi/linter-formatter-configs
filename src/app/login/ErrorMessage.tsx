import styled from "styled-components";

const ErrorMessage = styled.div<{ $isDisplayed: boolean }>`
  ${(props) => (!props.$isDisplayed ? `visibility:hidden;` : ``)}
  color: #c03;
  text-align: center;
`;

export default ErrorMessage;
