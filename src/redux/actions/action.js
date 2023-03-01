export const ADD = (item) =>{
    return{
        type:"ADD_CART",
        payload:item
    }
}

//romove
export const DLT = (id) =>{
    return{
        type:"RMV_CART",
        payload:id
    }
}

//remove single item

export const REMOVE = (iteam) =>{
    return{
        type:"RMV_ONE",
        payload:iteam
    }
}