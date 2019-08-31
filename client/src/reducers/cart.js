import {
    ADD_TO_CART,
    DELETE_FROM_CART,
    UPDATE_ITEM_COUNT
} from '../actions/types'

const initialState = []

export default function (state=initialState, action) {
    const { type, payload } = action

    switch(type) {
        
        case ADD_TO_CART:
            let existingIndex = findProductIndex(state, payload._id)
            if (existingIndex !== -1) {
                state[existingIndex].count += 1
                return state.concat([])
            }
            return state.concat(payload)
        
        case UPDATE_ITEM_COUNT:
            let currentIndex = findProductIndex(state, payload._id)
            if (state[currentIndex].count === 1 && payload.count === -1) {
                return [...state]
            }
            state[currentIndex].count += payload.count
            return state.concat([])
            
        case DELETE_FROM_CART:
            let indexToDel = findProductIndex(state, payload._id)
            return [...state.slice(0, indexToDel), ...state.slice(indexToDel+1)]
        default:
            return state
    }

    function findProductIndex(products, id){
        return products.findIndex(p => p._id === id)
    }
    
}