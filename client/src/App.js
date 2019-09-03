import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import NotFound from './components/layout/NotFound'
import Home from './components/Home'
import Story from './components/Story'
import Shop from './components/Shop'
import Routes from './components/routing/Routes'

//redux
import { Provider } from 'react-redux'
import store from './store'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'

//css
import './css/app.css';

//check if there is any user logged in, get their token if so
if (localStorage.token) {
    setAuthToken(localStorage.token)
}


const App = () => {

  useEffect(()=> {
    store.dispatch(loadUser())
  },[])

  return (
      <Provider store={store}>
          <Router> 
          <Navbar />  
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/story" component={Story} />
                  <Route path="/shop" component={Shop} />
                  <Route path="/shop?category=music" component={Shop} />
                  <Route path="/shop?category=merch" component={Shop} />
                  <Route path="/shop?sortBy=price:asc" component={Shop} />
                  <Route path="/echelon" component={Routes} />
                  <Route component={NotFound} />
              </Switch>   
          </Router>
    </Provider>
  )
}

export default App
