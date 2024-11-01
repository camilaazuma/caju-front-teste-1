import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type Props = {
  registrations?: any[];
};
const Collumnns = (props: Props) => {
  return (
    <S.Container>
      {allColumns.map((collumn) => {
        return (
          <S.Column status={collumn.status} key={collumn.title}>
            <>
              <S.TitleColumn status={collumn.status}>
                {collumn.title}
              </S.TitleColumn>
              <S.CollumnContent>
                {props?.registrations?.map((registration) => {
                  return (
                    registration.status === collumn.status && (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                      />
                    )
                  );
                })}
              </S.CollumnContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumnns;
