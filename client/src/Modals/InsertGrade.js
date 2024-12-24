import { ErrorMessage, Field, Form, Formik } from "formik";
import { React } from "react";
import Modal from 'react-modal';
import '../App.css';
import style from '../Styles/display_student_iformation.module.css';
import InsertGradeValidation from '../formvalidation/insertGrade';
Modal.setAppElement('#root');
const InsertGrade = ({ isOpen, onRequestClose, ModalData }) => {
    const initialValues = {
        studentID: ModalData.university_id,
        StudentName: `${ModalData.fname} ${ModalData.lname}`,
        studentDepartment: ModalData.department,
        Course: '',
        quiz: '',
        midexam: '',
        project: '',
        finalexam: '',
    }
    return (
        <div className={style.modal}>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel='profile detail'
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                    },
                    content: {
                        top: '41%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-60%,-40%)',
                        width: '30rem',
                        height: '35rem',
                        padding: '20px',
                        animation: 'slidshow 0.5s forwards',
                    },
                }}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={InsertGradeValidation}
                >
                    {({ isvalid }) => (
                        <Form>
                            <div >
                                <span className='justify-content-center text-center m-2 border-bottom border-black' >
                                    Make Grade For
                                    <span className="text-primary ">{ModalData.university_id}</span>
                                    <br />
                                </span>
                                <div className='flex-cols justify-content-around '>
                                    <div className="d-inline-flex">
                                        <div className="flex ">
                                            <label htmlFor="Quiz" className="mt-5 mb-0">Quiz:</label>
                                            <Field type='number'
                                                name='quiz'
                                                className=" w-auto rounded border-1-gey outline:focus  h-1" />
                                            <ErrorMessage name='quiz' component='div' className='error' />
                                        </div>
                                        <div className="flex">
                                            <label
                                                htmlFor="MidExam"
                                                className="mt-5 mb-0">
                                                Mid Exam:
                                            </label>
                                            < Field
                                                type='number'
                                                name="midexam"
                                                className="w-auto rounded border-1-gey outline:focus  h-1" />
                                            <ErrorMessage name='midexam' component='div' className='error' />
                                        </div>
                                    </div>
                                    <div className="d-inline-flex">
                                        <div className="flex">
                                            <label
                                                htmlFor="Project"
                                                className="mt-5 mb-0">
                                                Project:
                                            </label>
                                            < Field
                                                type='number'
                                                name='project'
                                                className="w-auto rounded border-1-gey outline:focus  h-1" />
                                            <ErrorMessage name='project' component='div' className='error' />
                                        </div>
                                        <div className="flex">
                                            <label
                                                htmlFor="Final Exam"
                                                className="text-bold  mt-5 mb-0">Final Exam:</label>
                                            <Field
                                                type='number'
                                                name="finalexam"
                                                className="w-auto rounded border-1-gey outline:focus  h-1" />
                                            <ErrorMessage name='finalexam' component='div' className='error' />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary w-50 rounded-0">Insert Grade</button>
                                    </div>
                                </div>
                            </div>


                        </Form>
                    )}

                </Formik>
            </Modal>
        </div>
    )
}

export default InsertGrade;