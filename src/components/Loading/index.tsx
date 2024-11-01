import styled from "styled-components";

export const Loading = styled.span<{
  color?: string;
}>`
    border-color: #fff;
    border-style: solid;
    border-bottom-color: ${(props) => props.color ?? "#000"};
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    height: 1.5rem;
    width: 1.5rem;
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
