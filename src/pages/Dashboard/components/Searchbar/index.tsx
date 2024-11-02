import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { Button, IconButton, TextField } from "@components/index";
import routes from "@router/routes";
import * as S from "./styles";
import { useState } from "react";
import MaskHelper from "@helpers/maskHelper";
import { validateCPF } from "@helpers/fiscalDocumentHelper";

interface SearchBarProps {
  searchString: string;
  setSearchString: (value: string) => void;
  onRefetch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchString,
  setSearchString,
  onRefetch,
}) => {
  const [isValid, setIsValid] = useState(true);
  const history = useHistory();
  const [cpf, setCpf] = useState(searchString);

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maskedCpf = MaskHelper.cpf(event.target.value);
    setCpf(maskedCpf);
    const valid = validateCPF(maskedCpf);
    setIsValid(valid);
    setSearchString(valid ? maskedCpf : "");
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        value={cpf}
        onChange={handleInputChange}
        error={!isValid}
        errorMessage={!isValid ? "CPF inválido" : ""}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={onRefetch}>
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
