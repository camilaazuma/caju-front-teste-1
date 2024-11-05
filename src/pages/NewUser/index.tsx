import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Button, IconButton, TextField } from "@components/index";
import routes from "@router/routes";
import * as S from "./styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import { validateCPF } from "@helpers/fiscalDocumentHelper";
import MaskHelper from "@helpers/maskHelper";
import RegistrationService from "~/services/registrationService";
import { toast } from "react-toastify";
import { formatDate } from "@helpers/dateHelper";
import { useConfirmationDialog, useLoadingContext } from "@context/index";

const NewUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("Campo obrigatório")
    .max(100, "O nome pode ter no máximo 100 caracteres.")
    .matches(
      /^(?!\d)[a-zA-Z]+(?: [a-zA-Z]+)+$/,
      "Nome inválido. Use apenas letras e espaços."
    ),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  fiscal_document: Yup.string()
    .required("Campo obrigatório")
    .max(14, "CPF inválido")
    .test("is-fiscal-doc-valid", "CPF inválido", (value) => {
      if (value.replace(/\.|-|\//g, "").length === 11) {
        return validateCPF(value);
      }
    }),
  admission_date: Yup.date()
    .max(new Date(), "A data de admissão deve ser igual a hoje ou anterior.")
    .required("Campo obrigatório"),
});

const NewUserPage = () => {
  const history = useHistory();
  const { setAppLoading } = useLoadingContext();
  const { getConfirmation } = useConfirmationDialog();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const emptyData = {
    name: "",
    email: "",
    fiscal_document: "",
    admission_date: "",
  };

  const formik = useFormik({
    initialValues: emptyData,
    validationSchema: NewUserSchema,
    onSubmit: async (values) => {
      const confirmed = await getConfirmation({
        title: "Confirmação de novo registro",
      });

      if (confirmed) {
        setAppLoading(true);
        const registrationData = {
          admissionDate: formatDate(values.admission_date),
          employeeName: values.name,
          cpf: values.fiscal_document,
          email: values.email,
        };
        RegistrationService.postNewRegistration(registrationData)
          .then(() => {
            toast.success("Nova admissão criada.");
            setAppLoading(false);
            goToHome();
          })
          .catch((error) => {
            toast.error(`Houve um erro ao salvar os dados. ${error.code}`);
            setAppLoading(false);
          });
      }
    },
  });

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="Voltar">
          <HiOutlineArrowLeft size={24} />
        </IconButton>

        <form onSubmit={formik.handleSubmit}>
          <S.FormContainer>
            <TextField
              id="name"
              placeholder="Nome completo"
              label="Nome completo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name}
              errorMessage={formik.errors.name}
              aria-invalid={formik.touched.name && formik.errors.name !== ""}
            />
            <TextField
              id="email"
              placeholder="Email"
              label="Email"
              type="email"
              error={formik.touched.email && formik.errors.email}
              errorMessage={formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              aria-invalid={formik.touched.email && formik.errors.email !== ""}
            />
            <TextField
              id="fiscal_document"
              placeholder="CPF"
              label="CPF"
              error={
                formik.touched.fiscal_document && formik.errors.fiscal_document
              }
              errorMessage={formik.errors.fiscal_document}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={MaskHelper.cpf(String(formik?.values?.fiscal_document))}
              aria-invalid={
                formik.touched.fiscal_document &&
                formik.errors.fiscal_document !== ""
              }
            />
            <TextField
              id="admission_date"
              label="Data de admissão"
              type="date"
              error={
                formik.touched.admission_date && formik.errors.admission_date
              }
              errorMessage={formik.errors.admission_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.admission_date}
              aria-invalid={
                formik.touched.admission_date &&
                formik.errors.admission_date !== ""
              }
            />
            <Button type="submit">{"Cadastrar"}</Button>
          </S.FormContainer>
        </form>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
