import { React } from "react"
import NavBar from "./components/NavBar"
import "./App.css";

function App() {
<<<<<<< Updated upstream
=======
  //const { loading, error, data } = useQuery(GET_MOVIE)
  //  console.log("data: ", data)
  const [loggedIn, setLoggedIn] = useState('false')

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setLoggedIn('true');
    }
  }, []);
>>>>>>> Stashed changes

  return (
    <div className="App">

      <NavBar></NavBar>
    </div>
  );
}

export default App;
