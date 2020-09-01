import React, { useState } from 'react'
import './style.css'
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'
import { MenuItemProps } from 'semantic-ui-react'
import Home from '../Home'
import Account from '../account/Account'

const NavBar = () => {
    const [active, setActive] = useState('Home')

    const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: MenuItemProps) => {
        const { name } = data
        setActive(name!)
    }

    return (
        <Router>
            <Menu secondary>

                <Menu.Item
                    as={Link} to="/accounts"
                    name='home'
                    active={active === 'home'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    //as={Link} to="#"
                    name='about'
                    active={active === 'about'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    //as={Link} to="#"
                    name='my profile'
                    active={active === 'profile'}
                    onClick={handleItemClick}
                />
            </Menu>

            <Switch>
                <Route exact path="/accounts">
                    <Home />
                </Route>
                <Route exact path='/accounts/:id'>
                    <Account />
                </Route>
            </Switch>
        </Router>



    )
}

export default NavBar