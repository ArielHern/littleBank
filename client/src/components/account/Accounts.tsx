import React from 'react'
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { Account } from '../../graphql/types';

const Accounts: React.FC<{ accounts: Account[] }> = ({ accounts }) => {

    return (
        <Container>
            <h2>Accounts</h2>
            {accounts.map((acc) => <div key={acc.name}><b><Link to={`/accounts/${acc.id}`}>{acc.name}</Link></b> - ${acc.balance}</div>)}
        </Container>
    )
}

export default Accounts;