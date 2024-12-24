import * as Yup from 'yup';  
const  signupValidation =   Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  idnumber: Yup.string().required('id number is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().min(10, "phone number must be 10").max(10, "phone number must be 10").required('Phone number is required'),
  userName: Yup.string().required('User Name is required'),
  password: Yup.string().matches(/[a-z]/, 'Password must be contain at least one lowercase').matches(/[A-Z]/, 'Password must be contain at least one uppercase').matches(/[0-9]/, 'Password must be contain at least one number').matches(/[^a-zA-Z0-9]/, 'Password must be contain at least one speacial character').min(8, 'Password must be at least 8 characters').required('Password is required'),
  agree: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions')
});
export default signupValidation;