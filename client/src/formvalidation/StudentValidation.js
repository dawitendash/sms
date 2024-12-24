import * as Yup from "yup";

const StudentValidation = Yup.object({
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    disabled: Yup.string().required('This box is required'),
    gender: Yup.string().required('Gender is required'),
    region: Yup.string().required('Region is required'),

    entrance: Yup.number()
        .required('Entrance mark is required')
        .min(0, 'Entrance mark must be at least 0')
        .max(700, 'Entrance mark cannot be more than 100'), // You can adjust the max limit based on your needs

    birth_date: Yup.string().required('Birthdate is required')
        .test('age', 'You are too young, please go to high school or elementary', function (value) {
            if (!value) return false;
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                return age - 1 >= 18;  // Check if the person is 18 or older
            }
            return age >= 18;  // If they have already had their birthday this year
        }),

    university_id: Yup.string()
        .required('University ID is required')
        .matches(/^WDU\d{6}$/, 'University ID must start with "WDU" followed by 6 digits'),

    gpa: Yup.string()
        .required('GPA is required')
        .matches(/^\d(\.\d{1,2})?$/, 'GPA must be a valid number, e.g., 3.5'), // Assuming GPA is a decimal number with up to 2 decimal places

    batch: Yup.string().required('Batch is required'),
    College: Yup.string().required('College is required'),
    department: Yup.string().required('Department is required'),

    role: Yup.string(), // Optional field, no validation here
});

export default StudentValidation;
