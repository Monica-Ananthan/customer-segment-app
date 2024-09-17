import './assets/css/style.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateSegment from './Components/CreateSegment/CreateSegment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='' element={<CreateSegment />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
