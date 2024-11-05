import styled from "styled-components";
import colors from "@colors";
const registrationStatusStyles: {
  [key in string]: { background: string; title: string };
} = {
  REVIEW: {
    background: colors.reviewBackground,
    title: colors.reviewTitle,
  },
  APPROVED: {
    background: colors.approvedBackground,
    title: colors.approvedTitle,
  },
  REPROVED: {
    background: colors.reprovedBackground,
    title: colors.reprovedTitle,
  },
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;
`;

export const Column = styled.div<{ status: any }>`
  height: auto;
  background-color: ${({ status }) =>
    registrationStatusStyles[status].background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;
`;

export const TitleColumn = styled.h3<{ status: any }>`
  margin: 0px;
  color: ${({ status }) => registrationStatusStyles[status].title};
  margin: 24px;
`;

export const CollumnContent = styled.div`
  overflow: auto;
  max-height: 85%;
`;
