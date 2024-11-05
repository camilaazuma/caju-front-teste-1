import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Registration, RegistrationStatus } from "~/types/registration";
import { ButtonSmall, IconButton } from "@components/index";
import {
  useConfirmationDialog,
  useLoadingContext,
  useRegistrationContext,
} from "@context/index";
import * as S from "./styles";
import RegistrationService from "~/services/registrationService";
import { toast } from "react-toastify";

type Props = {
  data: Registration;
};

const RegistrationCard = ({ data }: Props) => {
  const { refetch } = useRegistrationContext();
  const { setAppLoading } = useLoadingContext();
  const { getConfirmation } = useConfirmationDialog();

  const updateCardStatus = async (
    data: Registration,
    status: RegistrationStatus,
    message: string
  ) => {
    const confirmed = await getConfirmation({
      title: message,
    });

    if (confirmed) {
      setAppLoading(true);
      RegistrationService.updateRegistrationStatus(data, status)
        .then(async () => {
          await refetch();
          toast.success("Status atualizado");
          setAppLoading(false);
        })
        .catch((error) => {
          toast.error(`Houve um erro ao atualizar o status. ${error.code}`);
          setAppLoading(false);
        });
    }
  };

  const deleteCard = async (id: string) => {
    const confirmed = await getConfirmation({
      title: "Deseja remover o registro?",
    });

    if (confirmed) {
      RegistrationService.deleteRegistration(id)
        .then(async () => {
          await refetch();
          toast.success("Registro excluído");
        })
        .catch((error) => {
          toast.error(`Houve um erro ao remover o registro. ${error.code}`);
        });
    }
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
                  updateCardStatus(
                    data,
                    RegistrationStatus.REPROVED,
                    "Deseja reprovar o registro?"
                  )
                }
              >
                Reprovar
              </ButtonSmall>
              <ButtonSmall
                bgcolor="rgb(155, 229, 155)"
                onClick={() =>
                  updateCardStatus(
                    data,
                    RegistrationStatus.APPROVED,
                    "Deseja aprovar o registro?"
                  )
                }
              >
                Aprovar
              </ButtonSmall>
            </>
          )}
          {data.status !== RegistrationStatus.REVIEW && (
            <ButtonSmall
              bgcolor="#ff8858"
              onClick={() =>
                updateCardStatus(
                  data,
                  RegistrationStatus.REVIEW,
                  "Deseja revisar o registro novamente?"
                )
              }
            >
              Revisar novamente
            </ButtonSmall>
          )}
        </div>

        <IconButton
          aria-label="delete card"
          onClick={() => deleteCard(data.id ?? "")}
          color="#000"
        >
          <HiOutlineTrash size={16} />
        </IconButton>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
