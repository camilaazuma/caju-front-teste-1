import styled from "styled-components";
import Loading from ".";
import colors from "~/styles/colors";

export const _AppLoadingStyled = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: ${colors.error};
  border-radius: 24px;
  margin: 24px;
  padding: 0.5rem;
  width: 1.75rem;
  height: 1.75rem;
`;

export const AppLoading = () => {
  return (
    <_AppLoadingStyled>
      <Loading
        color={colors.white}
        bordercolor={colors.error}
        width="1.75rem"
        height="1.75rem"
      />
    </_AppLoadingStyled>
  );
};
