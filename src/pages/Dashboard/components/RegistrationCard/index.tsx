import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Registration, RegistrationStatus } from "~/types/registration";
import { ButtonSmall, IconButton } from "@components";
import * as S from "./styles";

type Props = {
  data: Registration;
};

const RegistrationCard = (props: Props) => {
  const { status, employeeName, email, admissionDate, id } = props.data;

  return (
    <S.Card key={id}>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        <div>
          {status === RegistrationStatus.REVIEW && (
            <>
              <ButtonSmall bgcolor="rgb(255, 145, 154)">Reprovar</ButtonSmall>
              <ButtonSmall bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
            </>
          )}
          {status !== RegistrationStatus.REVIEW && (
            <ButtonSmall bgcolor="#ff8858">Revisar novamente</ButtonSmall>
          )}
        </div>

        <IconButton aria-label="delete card" onClick={() => {}} color="#000">
          <HiOutlineTrash size={16} />
        </IconButton>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
