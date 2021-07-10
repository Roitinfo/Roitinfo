# Roitinfo

## Workflow del progetto

1) Da App.js inserire tutte le pagine principali incapsulate in un router react
   ### npm install --save react-router-dom 
   ```
    import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
    import Homepage from './pages/homepage'
    import LoginPage from './pages/LoginPage'

    function App(){
        return(
            <Router>
              <Switch>

                <Route path="/" exact>
                    <Homepage></Homepage>
                </Route>
                
                <Route path="/secondaPagina" exact>
                    <LoginPage></LoginPage>
                </Route>

              </Switch>
            </Router>
        )
    }
   ```
2) Le pagine importate nell'esempio sopra (./pages/...) sono organizzate come insiemi di componenti 

3) I componenti sono definiti in './src/components'