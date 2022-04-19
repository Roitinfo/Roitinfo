import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'rsuite/dist/styles/rsuite-default.css';

import './App.css';

import {Home, Articoli, Page404, Post, UserProfile} from './pages'
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/articoli" component={Articoli} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/profile" component={UserProfile} />
          <Route path="*" component={Page404} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
