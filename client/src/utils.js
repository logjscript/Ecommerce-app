//App component functions

export const itemToBag = async (userInfo) => {
    try {
        const response = await fetch(`http://localhost:5200/api/v1/users/${userInfo.username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...userInfo})
        });

        if (!response.ok) {
            throw new Error('Data cannot be sent');
        }
    } catch (error) {
        console.error(error);
    }
  }

//Bag component functions

export const userTotalPrice = (items) => {
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

export const itemsInBag = (items) => {
    return items?.reduce((acc, item) => {return item.quantity + acc}, 0);
}

//SignUp component functions

export const changeBorderColor = (green, gray, red, password, verifyPassword, setInputColor, inputColor) => {
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

export const addUsername = async (newUserInfo) => {
    try {
        const response = await fetch('http://localhost:5200/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...newUserInfo})
        });

        if (!response.ok) {
            throw new Error('Username already exists');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//LogIn component functions 


export const fetchUsername = async (userInfo, setUserInfo, setSignInError, signedInFunc) => {
    try {
        const response = await fetch(`http://localhost:5200/api/v1/users/${userInfo.username}`);
        if (response.ok) {
            const [{ username, password, items, total }] = await response.json();

            if (!userInfo.username || !userInfo.password) {
                throw new Error('Please fill in both fields');
            } else if (userInfo.password !== password) {
                throw new Error('Password is incorrect');
            }
              
            setUserInfo({
                username: username,
                password: password,
                items: items, 
                total: total
            });
        } else {
            throw new Error('Username does not exist');
        } 
      
        signedInFunc();
    } catch (error) {
        console.error(error);
        setSignInError(error.message);
    }
}
