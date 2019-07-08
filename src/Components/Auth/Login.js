import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {getUser} from '../../redux/reducers/userReducer'
import styled from 'styled-components'
import axios from 'axios';

function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPass] = useState('')
    const dispatch = useDispatch()
    function handleSubmit() {
        axios.post('/user/login')
    }
    return (
        <LoginForm onSubmit={e => e.preventDefault()}>
            <input value={username} placeholder='Username' onChange={e => setUsername(e.target.value)} />
            <input value={password} placeholder='Password' type='password' onChange={e => setPass(e.target.value)} />
            <button onClick={handleSubmit}>Login</button>
        </LoginForm>
    )
}

const LoginForm = styled.form`
    height: 65%;
    width: 65%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
`

export default Login