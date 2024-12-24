import * as Yup from 'yup';
const CollegeValidation = Yup.object({
    college_name: Yup.string().required('College name is required'),
    college_id: Yup.string().required('college id is reuired'),
});
export default CollegeValidation;
