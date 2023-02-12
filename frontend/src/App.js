import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Home/>
      <ToastContainer autoClose={2500} />
    </div>
  );
}

export default App;
