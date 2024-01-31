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

