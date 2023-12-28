import { Toast } from 'toastify-react-native'


const SuccessToastify = (text) => {
    Toast.success(text)
}


const ErrorToastify = (text) => {
    Toast.error(text)
}

const WarnToastify = (text) => {
    Toast.warn(text)
}

const InfoToastify = (text) => {
    Toast.info(text)
}


export {
    SuccessToastify,
    ErrorToastify,
    WarnToastify,
    InfoToastify
}