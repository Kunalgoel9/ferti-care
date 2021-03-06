import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,

  GET_LIST
} from './types'
import setAlert from './alert'
import axios from 'axios'

import setAuthtoken from '../utils/setAuthToken'
//Load User

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthtoken(localStorage.token)
    }

    try {
        const res = await axios.get('api/auth')

        dispatch({
            type: LOAD_USER,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        })
    }
}

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const body = JSON.stringify({ name, email, password })
    try {
        const res = await axios.post('/api/users', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
        console.log(err)

        dispatch({
            type: REGISTER_FAIL,
        })
    }
}
//LOGIN USER
export const login = (name, password) => async (dispatch) => {
 
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const body = JSON.stringify({ name, password })

   
    try {
        const res = await axios.post('/api/auth', body, config)
        console.log(res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }
        console.log(err)

        dispatch({
            type: LOGIN_FAIL,
        })
    }
}

//lOGOUT USER

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT })


}

//List lane ke liye


export const getList=()=>async dispatch=>{

  try {
   
  
     
    const res=await axios.get('/api/vender/list')
 dispatch({
     type:GET_LIST,
     payload:res.data
 })
      
  } catch (err) {
      
   console.error(err.message)

  }

}




export default register
