import * as Yup from 'yup';
const InsertGradeValidation = Yup.object({
    quiz: Yup.string().required('Quiz is required').min(0, 'min value is 0').max(10, 'max value is 10'),
    midexam: Yup.string().required('MidExam is required').min(0, 'min value is 0').max(20, 'max value is 20'),
    project: Yup.string().required('Project is required').min(0, 'min value is 0').max(30, 'max value is 30'),
    finalexam: Yup.string().required('FinalExam is required').min(0, 'min value is 0').max(50, 'max vlaue is 50'),
})
export default InsertGradeValidation;