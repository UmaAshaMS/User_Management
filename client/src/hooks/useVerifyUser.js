// src/hooks/useVerifyUser.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';

const useVerifyUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log('hook reached')

    useEffect(() => {
        const verify = async () => {
            try {
                console.log('try')
                const res = await fetch('/api/auth/profile', {
                    method: 'GET',
                    credentials: 'include', // send cookies
                });

                

                const data = await res.json();
                console.log('data : ', data)

                if (!res.ok || data.success === false) {
                    dispatch(signOut()); // clear redux user state
                    navigate('/signup');
                }
            } catch (error) {
                console.error('Error verifying user:', error);
                dispatch(signOut());
                navigate('/signup');
            }
        };

        verify();
    }, [navigate, dispatch]);
};

export default useVerifyUser;
