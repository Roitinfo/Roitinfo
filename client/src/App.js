import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Articoli from './components/Articoli';
import Post from './components/Post'
import Profile from './components/Profile'
import Page404 from './components/Page404'
import { AuthProvider } from './context/AuthContext';

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
