import styled from "styled-components";
import colors from "~/styles/colors";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 4px solid ${colors.white};
  margin: 16px;
  border-radius: 8px;
  padding: 16px;
  background-color: ${colors.white};
  h3,
  p {
    margin: 0;
  }
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;

  button {
    border: none;
    margin-right: 4px;
  }
`;
