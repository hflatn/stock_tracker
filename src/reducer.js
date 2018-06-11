const initialState = {
userstockstring: null,
userstockliststring: null,
newquantitystring: null,
newsymbolstring: null,
piedatastring: null,
url: null,
resets: null
};

const USERSTOCK = "USERSTOCK"
const USERSTOCKLIST = "USERSTOCKLIST"
const NEWQUANTITY = "NEWQUANTITY"
const NEWSYMBOL = "NEWSYMBOL"
const PIEDATA = "PIEDATA"
const URL = "URL"
const RESETS = "RESETS"

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

        case NEWSYMBOL:
            return Object.assign({}, state, {
                newsymbolstring: payload
            })
       

        case PIEDATA: 
            return Object.assign({}, state, {
                piedatastring: payload
            })

        case URL:
            return Object.assign({}, state, {
                urlstring: payload
            })

       
        case RESETS:
        return Object.assign({}, action.payload)
        
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

export function newsymbol(newsymbolstring){
    return {
        type: NEWSYMBOL,
        payload: newsymbolstring
    }
}


export function piedata(piedatastring){
    return {
        type: PIEDATA,
        payload: piedatastring
    }
}

export function url(urlstring){
    return {
        type: URL,
        payload: urlstring
    }
}

export function resets(user){
    return{
        type: RESETS,
        payload: {
            newquantitystring: '',
            newsymbolstring: ''
        }
    }
}