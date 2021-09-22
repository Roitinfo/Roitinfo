import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Components/Home'
import Articoli from './Components/Articoli';
import Post from './Components/Post'
import Profile from './Components/Profile'
import Page404 from './Components/Page404'
import { AuthProvider } from './Context/AuthContext';

import 'rsuite/dist/styles/rsuite-default.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/articoli" component={Articoli} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/profile" component={Profile} />
          <Route path="*" component={Page404} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
