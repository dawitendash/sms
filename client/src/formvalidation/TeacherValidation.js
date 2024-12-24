import * as Yup from 'yup';
const TeacherValidation = Yup.object({
  fname: Yup.string().required('First Name is required'),
  lname: Yup.string().required('Last Name is required'),
  gender: Yup.string().required('Gender is reqiuerd'),
  university_id: Yup.string().required('Id is reqiured').matches(/^LEC\d{6}$/, 'University ID must start with "LEC" followed by 6 digits'),
  experince: Yup.string().required('experince is reqiuerd'),
  level: Yup.string().required('Level is required'),
  birth_date: Yup.string().required('birthdate is reqiuerd').test('age', 'you are a child go to high school or elementry', function (value) {
    if (!value) return false;
    const today = new Date();
    const bd = new Date(value)
    const age = today.getFullYear() - bd.getFullYear() 
    return age >= 18

  }),
  College: Yup.string().required('College is requierd'),
  Department: Yup.string().required('Department is required'),
  role: Yup.string().required('role is reqiuerd'),
})
export default TeacherValidation
