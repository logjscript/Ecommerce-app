import { addUsername } from "../utils";

const CreateUserButton = ({ newUserInfo, setNewUserInfo, setInputColor, setExistingAccount, setSignInError, gray, setLoading }) => {
    const handleClick = async () => {        
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
                    user: gray, 
                    password: gray, 
                    verifyPassword: gray
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
            onClick={handleClick} 
            className='bg-gray-800 text-white rounded-3xl w-44 h-11 text-xl hover:opacity-50 ease-in-out duration-200'
        >
            Create Account
        </button>
    )
}

export default CreateUserButton;