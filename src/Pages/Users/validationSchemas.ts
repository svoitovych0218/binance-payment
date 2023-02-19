import { checkEmailAvailable } from 'api/checkEmailExists';
import * as Yup from 'yup';

export const createUserSchema = Yup.object().shape({
  userName: Yup.string()
    .required()
    .min(5, "Логін має бути в межах від 5 до 15 символів")
    .max(15, "Логін має бути в межах від 5 до 15 символів")
    .matches(/^[a-zA-Z0-9_]+$/, "Допускаються лише латинські символи та знак _"),
  firstName: Yup.string()
    .required("Це поле обов'язково")
    .min(3, "Ім'я повинно бути в межах від 3 до 25 символів")
    .max(25, "Ім'я повинно бути в межах від 5 до 25 символів"),
  lastName: Yup.string()
    .required("Це поле обов'язково")
    .min(3, "Прізвище повинно бути в межах від 3 до 25 символів")
    .max(25, "Прізвище повинно бути в межах від 5 до 25 символів"),
  email: Yup.string()
    .required("Це поле обов'язково")
    .email('Невірний email')
    .test('checkIfEmailDoesNotExist', 'Такий email вже існує', async (value) => {
      if (!value)
        return false;
      return await checkEmailAvailable(value);
    }),
  password: Yup.string()
    .required("Це поле обов'язково")
    .matches(/^(?=.*[A-za-z@$!%*?&])(?=.*\d)[A-za-z\d@$!%*?&]{8,}$/, "Пароль має бути не менше 8 символів довжиною, а також складатись з хоча б однієї букви та однієї цифри"),
  userRole: Yup.string()
    .required("Це поле обов'язково")
})