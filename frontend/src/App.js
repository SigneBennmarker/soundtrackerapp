import './App.css';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Spotify from './Spotify'
import SearchForm from "../src/components/SearchForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Heeeeeejsan!
        </p>
        
        <Switch>
          <Route path="/spotify" component={Spotify} />
        </Switch>
        <SearchForm></SearchForm>
      </header>
    </div>
  );
}

export default App;
