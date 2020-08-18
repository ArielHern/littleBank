import React from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/queries'
import { Segment, Grid, Form, Button, Divider } from 'semantic-ui-react'

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
    }, [result.data, setToken])

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        login({ variables: { username, password } })
    }

    return (
        <Segment placeholder>
            <Grid columns={2} relaxed='very' stackable>
                <Grid.Column>
                    <Form onSubmit={submit}>
                        <Form.Input
                            icon='user'
                            iconPosition='left'
                            label='Username'
                            onChange={({ target }) => setUsername(target.value)}
                        />
                        <Form.Input
                            icon='lock'
                            iconPosition='left'
                            label='Password'
                            type='password'
                            onChange={({ target }) => setPassword(target.value)}
                        />

                        <Button content='Login' primary />
                    </Form>
                </Grid.Column>

                <Grid.Column verticalAlign='middle'>
                    <Button content='Sign up' icon='signup' size='big' />
                </Grid.Column>
            </Grid>
            <Divider vertical>Or</Divider>
        </Segment>
    )
}

export default LoginForm