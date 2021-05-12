import './App.css';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Spotify from './Spotify'

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
      </header>
    </div>
  );
}

export default App;
