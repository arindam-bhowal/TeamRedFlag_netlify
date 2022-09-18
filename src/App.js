import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MainMap from './components/mainMap/MainMap'
import Start from './components/quiz/Start'
import Quiz from './components/quiz/Quiz'
import Chart from './components/charts/Chart';
import Emission from './components/emission/Emission';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <MainMap />} />
        <Route path="/quiz" element={ <Start />} />
        <Route path="/startQuiz" element={ <Quiz />} />
        <Route path="/charts" element={ <Chart />} />
        <Route path="/maps" element={ <MainMap />} />
        <Route path="/emission" element={ <Emission />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
