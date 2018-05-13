const initialState = {
userstockstring: '',
userstockliststring: null
};

const USERSTOCK = "USERSTOCK"
const USERSTOCKLIST = "USERSTOCKLIST"

export default function manager( state = initialState, action) {
    let { payload } = action;
    switch (action.type) { 
    
        case USERSTOCK: 
            return Object.assign({}, state, {
                userstockstring: payload
            })
        
        case USERSTOCKLIST: 
            return Object.assign({}, state, {
                userstockliststring: payload
            })
    }}

export function userstock(userstockstring) {
    return {
        type: USERSTOCK,
        payload: userstockstring
    }
}

export function userstocklist(userstockliststring){
    return {
        type: USERSTOCKLIST,
        payload: userstockliststring
    }
}
