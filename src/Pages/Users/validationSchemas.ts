import * as Yup from 'yup';

export const createUserSchema = Yup.object().shape({
  userName: Yup.string()
    .required(),
  firstName: Yup.string()
    .required(),
  lastName: Yup.string()
    .required(),
  email: Yup.string()
    .required()
    .email()
    .test('checkIfEmailDoesNotExist', () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(true), 10000);
      });
    }),
  password: Yup.string()
    .required()
    .matches(/^(?=.*[A-za-z@$!%*?&])(?=.*\d)[A-za-z\d@$!%*?&]{8,}$/),
  userRole: Yup.string()
    .required()
})