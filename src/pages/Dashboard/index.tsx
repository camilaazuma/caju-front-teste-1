import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import useFetchRegistrations from "@hooks/useFetchRegistrations";
import { Loading } from "~/components";

const DashboardPage = () => {
  const { data, loading } = useFetchRegistrations("/registrations");

  if (loading) {
    return <Loading />;
  }
  if (!data) {
    return <div>No registrations found.</div>;
  }
  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={data} />
    </S.Container>
  );
};
export default DashboardPage;
