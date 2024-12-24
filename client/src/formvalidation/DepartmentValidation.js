import * as Yup from 'yup';
const DepartmentValidation = Yup.object({
    dep_name: Yup.string().required('Department name is required').min(4, 'Department name must be 5 character').matches(/[a-z]/, 'Department name must contain one lowercase'),
    dep_id: Yup.string().required('Department id is reqiured').min(9, 'Department id must 9 character').max(9, 'Department id Maximum 9 character'),
    college: Yup.string().required('College is reqiured'),
    max_capacity: Yup.string().required('Maximum number of student is reqiured'),
    min_capacity: Yup.string().required('Minimum number of student is reqiured'),
    total_course: Yup.string().required('Total number of course is reqiuerd'),
    total_teacher: Yup.string().required('Total number of teacher is requierd'),
    location: Yup.string().required('Location is reqiuerd'),
});
export default DepartmentValidation