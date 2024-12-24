import * as Yup from 'yup';
const Annonce = Yup.object({
    title: Yup.string().required('title is reqiuerd'),
    time: Yup.string().required('date is required').test('correct', 'the data must be greater than today ', function (value) {
        if (!value) return false;
        const today = new Date();
        const announceData = new Date(value)
        const monthdiff = announceData.getMonth() - today.getMonth()
        const yearDiff = announceData.getFullYear() - today.getFullYear()
        return monthdiff >= 1 || yearDiff >= 1
    }),
    message: Yup.string().required('message is required')
});

export default Annonce