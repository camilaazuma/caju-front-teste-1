import { InputHTMLAttributes } from "react";
import styled from "styled-components";

export const Input = styled.input<{
  width?: number | string | undefined;
}>`
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  width: ${(props) => props.width ?? ""};
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;
  :focus {
    outline: none;
    border: 1px solid #007c89;
    box-shadow: inset 0 0 0 1px #007c89;
  }
`;
Input.defaultProps = {
  width: "100%",
};

type Props = {
  label?: string;
  error?: string | boolean;
  errorMessage?: string;
} & InputHTMLAttributes<any>;

const TextField = ({ label, error, errorMessage, ...rest }: Props) => {
  return (
    <div>
      <label htmlFor={rest.id}>{label}</label>
      <Input {...rest} />
      {error && (
        <span style={{ fontSize: 12, color: "red" }} role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default TextField;
