import { useEffect, useState } from "react";
import RegistrationService from "~/services/registrationService";

const useFetchRegistrations = (cpf: string = "") => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cpf !== "") {
          RegistrationService.queryRegistrationsByCpf(cpf).then((response) => {
            setData(response);
          });
        } else {
          RegistrationService.getRegistrationsList().then((response) => {
            setData(response);
          });
        }
      } catch (error) {
        console.error("API request failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cpf]);

  return { data, loading };
};

export default useFetchRegistrations;
