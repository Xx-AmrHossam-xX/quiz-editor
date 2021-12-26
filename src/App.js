import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quizes from "./pages/Quizes/Quizes";
import SaveQuiz from "./pages/SaveQuiz/SaveQuiz";
import "./App.css";

function App (){
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Quizes />} />
          <Route path="/quizes" element={<Quizes />} />
          <Route path="/quizes/:quizId" element={<SaveQuiz />} />
          <Route path="/quizes/create" element={<SaveQuiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
