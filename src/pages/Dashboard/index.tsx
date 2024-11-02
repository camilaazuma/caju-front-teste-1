import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import useFetchRegistrations from "@hooks/useFetchRegistrations";
import { Loading } from "~/components";
import { useState } from "react";

const DashboardPage = () => {
  const [cpf, setCpf] = useState<string>("");

  const { data, loading } = useFetchRegistrations(cpf);

  if (loading) {
    return <Loading />;
  }
  if (!data) {
    return <div>No registrations found.</div>;
  }
  return (
    <S.Container>
      <SearchBar
        searchString={cpf}
        setSearchString={setCpf}
        onRefetch={() => console.log("refetch")}
      />
      <Collumns registrations={data} />
    </S.Container>
  );
};
export default DashboardPage;
