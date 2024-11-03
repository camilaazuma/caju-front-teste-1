import styled from "styled-components";

export const _IconButtonStyled = styled.button<{
  color?: string;
}>`
  cursor: pointer;
  border: 2px solid ${(props) => props.color ?? "#64a98c"};
  width: fit-content;
  padding: 4px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  svg {
    color: ${(props) => props.color ?? "#64a98c"};
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
