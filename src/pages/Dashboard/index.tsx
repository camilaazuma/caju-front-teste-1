import Columns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import useFetchRegistrations from "@hooks/useFetchRegistrations";
import { useEffect, useState } from "react";
import { RegistrationProvider, useLoadingContext } from "@context/index";

const DashboardPage = () => {
  const [cpf, setCpf] = useState<string>("");
  const { data, loading, refetch } = useFetchRegistrations(cpf);
  const { setAppLoading } = useLoadingContext();

  useEffect(() => {
    setAppLoading(loading);
  }, [loading, setAppLoading]);

  return (
    <RegistrationProvider onRefetch={refetch} cpf={cpf} setCpf={setCpf}>
      <S.Container>
        <SearchBar
          searchString={cpf}
          setSearchString={setCpf}
          onRefetch={refetch}
        />
        <Columns registrations={data} />
      </S.Container>
    </RegistrationProvider>
  );
};
export default DashboardPage;
