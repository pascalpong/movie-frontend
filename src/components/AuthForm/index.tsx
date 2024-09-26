"use client"

import { FormEvent } from 'react';
import { Button, TextField, Typography, Box, Container } from '@mui/material';
import { useLoginMutation } from '@/services/authService';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
    const router = useRouter()
    
    const [ toLogin ] = useLoginMutation()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        const signin = await toLogin({username, password});
        if(signin.data) {
            const { tokens } = signin.data as { tokens: { accessToken: string; refreshToken: string; }};
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            router.push('/admin')
        }
    };

    return (
        <Container>
            <Box className="flex items-center justify-center h-screen">
                <Box className="p-8 rounded-lg shadow-md w-full bg-gray-100">
                    <Typography variant="h4" className="mb-6 text-center text-primary">
                        {'Sign In'}
                    </Typography>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextField
                            fullWidth
                            label="username"
                            variant="outlined"
                            type="username"
                            name='username'
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="password"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="mt-4"
                        >
                        {'Sign In'}
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
}

export default AuthForm;
