import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Components/Home'
import Articoli from './Components/Articoli';
import Post from './Components/Post'
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
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
