import axios from 'axios'

const initialState = {
    username: '',
    city: '',
    state: ''
}

const GET_USER = 'GET_USER'
const RESET_USER = 'RESET_USER'

export function getUser() {
    let data = axios.get('/user').then(res => res.data)
    return {
        type: GET_USER,
        payload: data
    }
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER + '_FULFILLED':
            return {
                username: action.payload.username,
                city: action.payload.city,
                state: action.payload
            }
        case RESET_USER:
            return {...initialState}
        default:
            return state
    }
}

export default reducer