import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './stylesheets/App.css';
import FormView from './components/FormView';
import QuestionView from './components/Home.js';
import Header from './components/Header';
import QuizView from './components/QuizView';
import PageNotFound from './components/PageNotFound';
import axios from 'axios';

useEffect(() => {
  fetch('/api/testdata')
    .then(response => response.json())
    .then(data => setComposers(data))
    .catch(error => console.error(error));
}, []);


function App() {
  useEffect(() => {
    fetch('/api/testdata')
      .then(response => response.json())
      .then(data => setComposers(data))
      .catch(error => console.error(error));
  }, []);

  
  return (
    <div className="App">
      <Header path />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/add">
            <FormView />
          </Route>
          <Route path="/play">
            <QuizView />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
