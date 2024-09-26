import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Typography } from '@mui/material';
import { validationSchema } from './resolver';
import { useLoginMutation } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/utils/setCookie';
import { toast } from 'react-toastify';
interface LoginFormInputs {
    username: string;
    password: string;
}
const LoginForm = () => {
    const router = useRouter()
    const [toLogin] = useLoginMutation()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        const signin = await toLogin(data);
        if (signin.data) {
            const { tokens } = signin.data as { tokens: { accessToken: string; refreshToken: string; } };
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            setCookie('access_token', tokens.accessToken, 7);
            router.push('/admin')
        }
        else {
            toast.error('Login Fail')
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{
                            height: "42px",
                            color: "#C5C5C5",
                            '& .MuiInputLabel-root': {
                                color: '#C5C5C5',
                                borderRadius: "9px"
                            },
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#485159',
                            },
                            '& input': {
                                color: '#C5C5C5',
                            },
                            marginBottom: "12px"

                        }}
                        label="이메일 / 전화번호"
                        variant="outlined"
                        fullWidth
                        error={!!errors.username}
                        helperText={errors.username ? errors.username.message : ''}
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{
                            height: "42px",
                            color: "#C5C5C5",
                            '& .MuiInputLabel-root': {
                                color: '#C5C5C5',
                                borderRadius: "9px"
                            },
                            '& input': {
                                color: '#C5C5C5',

                            },
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#485159',
                            },
                            marginBottom: "12px"
                        }}
                        type="password"
                        label="비밀번호"
                        variant="outlined"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />
                )}
            />
            <Typography sx={{
                fontWeight: "600",
                fontSize: "12px",
                display: "flex",
                justifyContent: "end",
                color: "#5176FF",
                cursor: "pointer"
            }}>비밀번호를 잊으셨나요?</Typography>
            <button type='submit' className='w-full h-[42px] flex items-center justify-center bg-[#5176FF] text-white mt-0 rounded-[9px]'>로그인</button>
            <div className='flex gap-1'>
                <Typography sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    cursor: "pointer"
                }}>TV888  에 새로 온 건가요?</Typography>
                <Typography sx={{
                    fontWeight: "600",
                    fontSize: "12px",
                    cursor: "pointer",
                    color: "#5176FF"
                }}>계정 생성</Typography>
            </div>
        </form>
    );
};

export default LoginForm;
