import Registration, { RegistrationStatus } from "~/types/registration";
import { get, post } from "./axios";

const RegistrationService = {
  postNewRegistration(newRegister: Registration) {
    const url = `/registrations`;
    const requestData = { ...newRegister, status: RegistrationStatus.REVIEW };

    return post(url, requestData)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  getRegistrationsList() {
    const url = `/registrations`;
    return get(url, {})
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
};

export default RegistrationService;
