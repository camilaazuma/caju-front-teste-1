import { useEffect, useState, useCallback } from "react";
import RegistrationService from "~/services/registrationService";

const useFetchRegistrations = (cpf: string = "") => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = cpf
        ? await RegistrationService.queryRegistrationsByCpf(cpf)
        : await RegistrationService.getRegistrationsList();
      setData(response);
    } catch (error) {
      console.error("API request failed", error);
    } finally {
      setLoading(false);
    }
  }, [cpf]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
};

export default useFetchRegistrations;
