import { Registration, RegistrationStatus } from "~/types/registration";
import { get, post, put, remove } from "./axios";
import { sanitizeCPF } from "@helpers/fiscalDocumentHelper";

const RegistrationService = {
  postNewRegistration(newRegister: Registration) {
    const url = `/registrations`;
    const { cpf, ...rest } = newRegister;

    return post(url, {
      cpf: sanitizeCPF(cpf),
      status: RegistrationStatus.REVIEW,
      ...rest,
    })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  updateRegistrationStatus(data: Registration, status: RegistrationStatus) {
    const url = `/registrations/${data.id}`;

    return put(url, {
      ...data,
      status,
    })
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

  queryRegistrationsByCpf(cpf: string) {
    const url = `/registrations?cpf=${sanitizeCPF(cpf)}`;
    return get(url, {})
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  deleteRegistration(id: string) {
    const url = `/registrations/${id}`;
    return remove(url, {})
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
};

export default RegistrationService;
