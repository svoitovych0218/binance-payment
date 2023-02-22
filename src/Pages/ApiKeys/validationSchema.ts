import * as yup from 'yup';

export const apiKeysSchema = yup.object().shape({
  clientId: yup.string().required(`Обов'язкове поле`),
  secret: yup.string().required(`Обов'язкове поле`)
});