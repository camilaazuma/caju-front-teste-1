const MaskHelper = {
  cpf(cpf: string) {
    if (!cpf) {
      return cpf;
    }
    let value = cpf.replace(/\D/g, "").slice(0, 11);

    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return value;
  },

  date(date: string) {
    if (!date) {
      return date;
    }
    return date.replace(/(\d{2})(\d{2})(\d{4}$)/, "$1/$2/$3").substring(0, 10);
  },
};

export default MaskHelper;
