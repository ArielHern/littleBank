import React from 'react';
import { Divider, Icon } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';

import { ME } from "../graphql/queries";
import Accounts from './account/Accounts';

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
        <div >
            {data.me && (
                <div>
                    <Divider />
                    <Icon.Group size='big' style={{ float: "left" }}>
                        <Icon size='big' name='circle outline' />
                        <Icon name='user' />
                    </Icon.Group>
                    <h1>{greeting?.message}, {data.me.name}</h1>

                    <Divider />
                    <Accounts accounts={data.me.accounts} />
                </div>
            )}
        </div>
    )
}

export default Home;