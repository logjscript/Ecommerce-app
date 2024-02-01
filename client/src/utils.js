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

