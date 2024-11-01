import { useEffect, useState } from "react";
import RegistrationService from "~/services/registrationService";

const useFetchRegistrations = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        RegistrationService.getRegistrationsList().then((response) => {
          setData(response);
        });
      } catch (error) {
        console.error("API request failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};

export default useFetchRegistrations;
