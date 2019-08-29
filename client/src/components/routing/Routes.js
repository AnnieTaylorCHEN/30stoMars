import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Register from '../auth/Register'
import Login from '../auth/Login'
import Echelon from '../echelon/Echelon'
// import Alert from '../layout/Alert'
import CreateProfile from '../echelon/CreateProfile'
import EditProfile from '../echelon/EditProfile'
import AllProfiles from '../echelon/AllProfiles'
import Discussion from '../echelon/Discussion'
import EditPost from '../echelon/EditPost'
// import Posts from '../posts/Posts'
// import Post from '../post/Post'
import NotFound from '../layout/NotFound'
import PrivateRoute from '../routing/PrivateRoute'

const Routes = () => {

    return (
        <section >
        {/*<Alert />*/}
            <Switch>
                <Route exact path="/echelon/register" component={Register} />
                <Route exact path="/echelon/login" component={Login} />
                <PrivateRoute exact path="/echelon" component ={Echelon} />
                <PrivateRoute exact path="/echelon/create-profile" component={CreateProfile} />
                <PrivateRoute exact path="/echelon/edit-profile" component={EditProfile} />
                <PrivateRoute exact path="/echelon/users" component={AllProfiles} />
                <PrivateRoute exact path="/echelon/posts" component={Discussion} />
                <PrivateRoute exact path="/echelon/edit-post" component={EditPost} />
               {/* 
                <PrivateRoute exact path="/echelon/posts/:id" component={Post} />*/}
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

export default Routes