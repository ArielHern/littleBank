import React from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/queries'

interface props {
    setToken: React.Dispatch<string>
}


const LoginForm: React.FC<props> = ({ setToken }) => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    React.useEffect(() => {
        if (result.data) {
            // set token and local storage from the result 
            const token = result.data.login.value
            localStorage.setItem('littleBank-user-token', token);
            setToken(token)

        }
    }, [result.data])

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        login({ variables: { username, password } })
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm