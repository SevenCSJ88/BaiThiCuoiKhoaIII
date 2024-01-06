
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        vi: {
            translation: {
                header1: 'Bạn có ',
                header2: ' công việc còn lại!',
                header3: 'Công việc chưa hoàn thành',
                header4: 'Tất cả công việc',
                date: ' còn lại',
                placeholder1: 'Nhập công việc ...',
                buttonSubmit: 'Nhập',
                footer1: 'Có giá trị trên: '
            },
        },
        en: {
            translation: {
                header1: 'You have ',
                header2: ' tasks left!',
                header3: 'Incomplete Tasks',
                header4: 'All Tasks',
                date: ' left',
                placeholder1: 'Enter task ...',
                buttonSubmit: 'Submit',
                footer1: 'Available on: '
            },
        },
    },
    fallbackLng: 'en', 
    interpolation: {
        escapeValue: false, 
    },
});

export default i18n;
