import * as Yup from "yup";
export const fogetPasswordValidayion = Yup.object({
    id: Yup.string().required('Id is reqiured'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
});
// export default fogetPasswordValidayion;