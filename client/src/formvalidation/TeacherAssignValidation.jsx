import * as Yup from 'yup'
const TeacherAssignValidation = Yup.object({
    TeacherId: Yup.string().required('Teacher id is reqiuerd'),
    Course: Yup.string().required('Course is reqiuerd'),
})
export default TeacherAssignValidation