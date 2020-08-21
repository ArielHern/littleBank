import React from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';

import { ME } from "../graphql/queries";
import Account from './account/Accounts';

interface greeating {
    message: String
}

const Home: React.FC = () => {
    const { data, loading } = useQuery(ME)
    const [greeting, setGreating] = React.useState<greeating>();

    React.useEffect(() => {
        const message = getGreatings()
        setGreating({ message })
    }, [])

    const getGreatings = () => {
        const today = new Date()
        const curHr = today.getHours()

        if (curHr < 12) {
            return 'Good Morning';
        } else if (curHr < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    }
    if (loading) return <span>Loadin...</span>


    return (
        <Container>
            {data.me && (
                <div>
                    <Divider />
                    <h1 style={{ textTransform: "capitalize" }}>{greeting?.message}, {data.me.name}</h1>
                    <Divider />
                    <Account accounts={data.me.accounts} />
                </div>
            )}


        </Container>
    )
}

export default Home;