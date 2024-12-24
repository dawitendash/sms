import * as Yup from "yup";
export const Loginvalidation = Yup.object({
  username: Yup.string().required("Please enter the username."),
  password: Yup.string().min(8).required("Please enter the password."),
  remember: Yup.boolean().oneOf([true], 'please fill the box'),
});
