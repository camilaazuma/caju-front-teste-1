import styled from "styled-components";
import colors from "~/styles/colors";

export const Loading = styled.span<{
  color?: string;
  bordercolor?: string;
  width?: string;
  height?: string;
}>`
    border-color: ${(props) => props.bordercolor ?? colors.white};
    border-style: solid;
    border-bottom-color: ${(props) => props.color ?? colors.black};
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    height: ${(props) => props.height ?? "1.5rem"};
    width: ${(props) => props.width ?? "1.5rem"};
    border-width: 4px;
    
    animation: rotation 1s linear infinite;

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export default Loading;
