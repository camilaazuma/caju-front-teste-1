import styled from "styled-components";
import colors from "@colors";

const Button = styled.button<{
  bgcolor?: string;
  color?: string;
}>`
  outline: none;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 36px;
  padding: 8px 32px;
  background-color: ${(props) => props.bgcolor ?? colors.success};
  color: ${(props) => props.color ?? colors.white};
  cursor: pointer;
  height: 56px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 16px;
  font-weight: 600;
`;

export const ButtonSmall = styled.button<{
  bgcolor?: string;
  color?: string;
}>`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${(props) => props.bgcolor ?? "none"};
  color: ${(props) => props.color ?? colors.black};
  cursor: pointer;
`;

export default Button;
