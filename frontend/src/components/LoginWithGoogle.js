import { useGoogleLogin } from '@react-oauth/google';

const LoginWithGoogle = ({ onLogin }) => {
    const login = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            console.log('Login Success:', credentialResponse);
            onLogin(credentialResponse); 
        },
        onError: (error) => {
            console.log('Login Failed:', error);
        },
    });
};

export default LoginWithGoogle;
