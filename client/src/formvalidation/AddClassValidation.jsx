import * as Yup from 'yup';
const AddClassValidation = Yup.object({
    StartTime: Yup.string().required('Start Time is required'),
    EndTime: Yup.string().required('End TIme isRequired'),
    Day: Yup.string().required('Day is required'),
    Course: Yup.string().required('Course is required'),
})
export default AddClassValidation;