
const apiUrl = import.meta.env.VITE_APP_SERVERURL;

//App component functions

export const addItemsToBag = async (signedInUserInfo) => {
    try {
        const response = await fetch(`${apiUrl}/${signedInUserInfo.username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...signedInUserInfo})
        });

        if (!response.ok) {
            throw new Error('Data cannot be sent');
        }
    } catch (error) {
        console.error(error);
    }
  }


//Bag component functions

export const totalBagPrice = (items) => {
   const total = items?.reduce((acc, item) => {    
        if (item.value[0] === '$') {
            return acc + Number((item.value.slice(1)) * item.quantity);
        } else {
            return acc + Number((item.value) * item.quantity);
        }
    }, 0);
    return total;
};


//Dashboard component functions

export const countItemsInBag = (items) => {
    return items?.reduce((acc, item) => {return item.quantity + acc}, 0);
}


//SignUp component functions

export const changeBorderColor = (borderColors, password, verifyPassword, setInputColor, inputColor) => {
    const { green, gray, red } = borderColors;
    
    if (verifyPassword && (password === '' || verifyPassword !== password)){
        setInputColor({
            ...inputColor,
            password: red,
            verifyPassword: red
        });

    } else if (password) {
        setInputColor({
            ...inputColor,
            password: green, 
            verifyPassword: !verifyPassword ? gray : green
        });
    } else {
        setInputColor({
            ...inputColor,
            password: gray,
            verifyPassword: gray
        });
    }
}

//CreateUserButton component functions

export const addUsername = async (newUserInfo) => {
    try {
        const response = await fetch(`${apiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...newUserInfo})
        });

        if (!response.ok) {
            throw new Error('Username already exists');
        } else if (!newUserInfo.passwordMatch) {
            throw new Error ('Passwords do not match');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


//LogIn component functions 

export const checkUserInfo = async (userInputInfo, setSignedInUserInfo, setSignInError, setUserSignedIn) => {
    try {
        if (!userInputInfo.username || !userInputInfo.password) {
            throw new Error('Please fill in both fields');
        }

        const response = await fetch(`${apiUrl}/${userInputInfo.username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userInputInfo.username,
                password: userInputInfo.password
            })
        });

        if (response.ok) {
            const [{ username, password, items, total }] = await response.json();
              
            setSignedInUserInfo({
                username: username,
                password: password,
                items: items, 
                total: total
            });      
        } else {
            throw new Error();
        }
      
        setUserSignedIn(true);
    } catch (error) {
        console.log(error.message);
        if (error.message === 'Please fill in both fields') {
            setSignInError(error.message)
        } else {
            setSignInError('Username or password is incorrect');
        }
    }
}
