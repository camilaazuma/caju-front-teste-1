import styled from "styled-components";
import colors from "@colors";

export const _IconButtonStyled = styled.button<{
  color?: string;
}>`
  cursor: pointer;
  border: 2px solid ${(props) => props.color ?? colors.success};
  width: fit-content;
  padding: 4px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  svg {
    color: ${(props) => props.color ?? colors.success};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

type IconButtonProps = {
  children?: React.ReactNode;
  color?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = (props: IconButtonProps) => {
  return <_IconButtonStyled {...props}>{props.children}</_IconButtonStyled>;
};
