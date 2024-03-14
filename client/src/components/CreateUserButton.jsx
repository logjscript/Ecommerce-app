import { addUsername } from "../utils";

export default function CreateUserButton({ newUserInfo, setNewUserInfo, setInputColor, setExistingAccount, setSignInError, borderColors, loading, setLoading }) {

    async function handleCreateClick() {        
        try {
            if (!newUserInfo.username || 
                !newUserInfo.password || 
                !newUserInfo.verifyPassword) {
                
                throw new Error('Please fill in all required fields')
            }
            setLoading(true);

            if (newUserInfo.username &&
                newUserInfo.password &&
                newUserInfo.verifyPassword &&
                newUserInfo.passwordMatch) {
    
                setNewUserInfo({
                    username: '', 
                    password: '', 
                    verifyPassword: '',
                    passwordMatch: true
                });
                setInputColor({
                    user: borderColors[1], 
                    password: borderColors[1], 
                    verifyPassword: borderColors[1]
                });
                await addUsername(newUserInfo);
                setSignInError(null);
                setExistingAccount(true);
            } 
        } catch (error) {
            setSignInError(error.message);
        }   
        setLoading(false);
    }


    return (
        <button 
            onClick={handleCreateClick} 
            className='bg-gray-800 text-white rounded-3xl w-44 h-11 text-xl hover:opacity-50 ease-in-out duration-200'
        >
            Create Account
        </button>
    )
}