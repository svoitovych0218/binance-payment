import { checkEmailAvailable } from 'api/checkEmailExists';
import * as Yup from 'yup';

export const createUserSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Це поле обов'язково")
    .min(5, "Username повинно буде в межах від 5 до 25 символів")
    .max(25, "Username повинно буде в межах від 5 до 25 символів"),
  firstName: Yup.string()
    .required("Це поле обов'язково")
    .min(5, "Ім'я повинно буде в межах від 5 до 25 символів")
    .max(25, "Ім'я повинно буде в межах від 5 до 25 символів"),
  lastName: Yup.string()
    .required("Це поле обов'язково")
    .min(5, "Прізвище повинно буде в межах від 5 до 25 символів")
    .max(25, "Прізвище повинно буде в межах від 5 до 25 символів"),
  email: Yup.string()
    .required("Це поле обов'язково")
    .email('Невірний email')
    .test('checkIfEmailDoesNotExist', 'Такий email вже існує' , async (value) => {
      if(!value)
        return false;
      return await checkEmailAvailable(value);
    }),
  password: Yup.string()
    .required("Це поле обов'язково")
    .matches(/^(?=.*[A-za-z@$!%*?&])(?=.*\d)[A-za-z\d@$!%*?&]{8,}$/),
  userRole: Yup.string()
    .required("Це поле обов'язково")
})