const initialState = {
userstockstring: null,
userstockliststring: null,
newquantitystring: null
};

const USERSTOCK = "USERSTOCK"
const USERSTOCKLIST = "USERSTOCKLIST"
const NEWQUANTITY = "NEWQUANTITY"

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
    
        
        case NEWQUANTITY: 
            return Object.assign({}, state, {
                newquantitystring: payload
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

export function newquantity(newquantitystring){
    return {
        type: NEWQUANTITY,
        payload: newquantitystring
    }
}