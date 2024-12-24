import * as Yup from 'yup';
const CourseValidation = Yup.object({
   CourseTitle: Yup.string().required('Course Title is required'),
   CourseCode: Yup.string().required('Course Code is required'),
   Lab: Yup.number().required('Lab is required').min(0, 'lab is minumim 0'),
   Tutorial: Yup.number().required('Tutorial is required').min(0, 'tutorial atleast 0'),
   CreditHour: Yup.string().required('Credit Hour is required'),
   // .test('is-correct', 'is credit hour must be equal to the sum of tutorial and lab',
   // function (value) {
   //    const { Lab, Tutorial } = this.parent;
   //    return value === (Number(Lab) + Number(Tutorial))
   // }),
   ActiveBatch: Yup.string().required('Active Batch is required').min(1, 'Minimun batch is 1').max(6, 'maximum batch is 6'),
   ActiveSemister: Yup.string().required('Active Semister is required').min(1, 'minimum semister is 1').max(2, 'maximum semister is 2'),
   College: Yup.string().required('College is required'),
   Department: Yup.string().required('Department is required'),
})
export default CourseValidation