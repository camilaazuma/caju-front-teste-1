import Registration, { RegistrationStatus } from "~/types/registration";
import { post } from "./axios";

const RegistrationService = {
  postNewRegistration(newRegister: Registration) {
    const url = `/registrations`;
    const requestData = { ...newRegister, status: RegistrationStatus.REVIEW };

    return post(url, requestData).then((response) => response);
  },
};

export default RegistrationService;
