import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase'
import {  useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleGoogle = async() => {
        
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            console.log('result',result)

            const res = await fetch('/api/auth/google', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                }, 
                body : JSON.stringify({
                    name : result.user.displayName,
                    email : result.user.email,
                    photo : result.user.photoURL,
                })
            });
            const data = await res.json();
            console.log(data)
            dispatch(signInSuccess(data))
            navigate('/', { replace: true })
        }

        catch(error){
            console.log('Couldnt login with google account', error)
        }
    }
    return (
        <div>
            <div className="flex items-center justify-center w-4/4 mb-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500 text-sm">or</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>

            <div className='flex justify-center items-center'>
                <button type='button'
                    onClick={handleGoogle}
                    className='rounded-full p-2.5 cursor-pointer margin-auto uppercase px-5 py-2'>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.1 0 5.9 1.1 8.1 3.1l6.1-6.1C34.6 2.4 29.7 0 24 0 14.8 0 6.9 5.6 2.7 13.7l7.5 5.8C12.4 12.3 17.7 9.5 24 9.5z"
                        />
                        <path
                            fill="#4285F4"
                            d="M46.1 24.5c0-1.6-.1-2.7-.3-3.9H24v7.3h12.8c-.5 3-2.1 5.5-4.4 7.3l6.8 5.3c4.3-4 6.9-9.9 6.9-16z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M10.2 28.1c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-7.5-5.8C1.1 15.7 0 19.7 0 23.3s1.1 7.6 2.7 10.6l7.5-5.8z"
                        />
                        <path
                            fill="#34A853"
                            d="M24 47c5.7 0 10.6-1.9 14.1-5.2l-6.8-5.3c-1.9 1.3-4.4 2.1-7.3 2.1-6.3 0-11.6-4.3-13.5-10.2l-7.5 5.8C6.9 42.4 14.8 47 24 47z"
                        />
                    </svg>

                </button>
            </div>
        </div>
    )
}

export default OAuth
