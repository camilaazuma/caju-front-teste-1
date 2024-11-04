import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Registration, RegistrationStatus } from "~/types/registration";
import { ButtonSmall, IconButton } from "@components";
import { useRegistrationContext } from "@context";
import * as S from "./styles";
import RegistrationService from "~/services/registrationService";
import { toast } from "react-toastify";

type Props = {
  data: Registration;
};

const RegistrationCard = ({ data }: Props) => {
  const { refetch } = useRegistrationContext();

  const updateCardStatus = (data: Registration, status: RegistrationStatus) => {
    RegistrationService.updateRegistrationStatus(data, status)
      .then(async () => {
        await refetch();
        toast.success("Status atualizado");
      })
      .catch((error) => {
        toast.error(`Houve um erro ao atualizar o status. ${error.code}`);
      });
  };

  return (
    <S.Card key={data.id}>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        <div>
          {data.status === RegistrationStatus.REVIEW && (
            <>
              <ButtonSmall
                bgcolor="rgb(255, 145, 154)"
                onClick={() =>
                  updateCardStatus(data, RegistrationStatus.REPROVED)
                }
              >
                Reprovar
              </ButtonSmall>
              <ButtonSmall
                bgcolor="rgb(155, 229, 155)"
                onClick={() =>
                  updateCardStatus(data, RegistrationStatus.APPROVED)
                }
              >
                Aprovar
              </ButtonSmall>
            </>
          )}
          {data.status !== RegistrationStatus.REVIEW && (
            <ButtonSmall
              bgcolor="#ff8858"
              onClick={() => updateCardStatus(data, RegistrationStatus.REVIEW)}
            >
              Revisar novamente
            </ButtonSmall>
          )}
        </div>

        <IconButton aria-label="delete card" onClick={refetch} color="#000">
          <HiOutlineTrash size={16} />
        </IconButton>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
