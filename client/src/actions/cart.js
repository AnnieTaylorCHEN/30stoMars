import { 
    ADD_TO_CART, 
    DELETE_FROM_CART,
    UPDATE_ITEM_COUNT, 
    EMPTY_CART
} from './types'

export const addToCart = ({ _id, name, price, imgName, count = 1}) => async dispatch =>  {
    try {
        dispatch({
            type: ADD_TO_CART,
            payload: {_id, name, price, imgName, count }
        })
    } catch (error) {
        console.error(error)
    }
}

export const removeFromCart = ( _id ) => async dispatch =>  {
    try {
        dispatch({
            type: DELETE_FROM_CART,
            payload: {_id}
        })
    } catch (error) {
        console.error(error)
    }
}

export const updateItemCount = ({ _id, count}) => async dispatch =>  {
    try {
        dispatch({
            type: UPDATE_ITEM_COUNT,
            payload: {_id, count }
        })
    } catch (error) {
        console.error(error)
    }
}

export const emptyCart = () => async dispatch => {
    try {
        dispatch({
            type: EMPTY_CART, 
            payload: {}
        })
    } catch (error) {
        console.error(error)
    }
}