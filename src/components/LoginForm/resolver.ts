import * as Yup from 'yup';
export const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('이메일 / 전화번호를 입력해주세요'),
    password: Yup.string()
        .required('비밀번호를 입력해주세요')
        .min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});