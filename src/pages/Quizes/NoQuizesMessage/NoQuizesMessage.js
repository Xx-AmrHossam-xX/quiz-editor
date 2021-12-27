import { useNavigate } from "react-router-dom";
import "./NoQuizesMessage.css";
function NoQuizesMessage (){
  let navigate = useNavigate();
  return (
    <div>
      <i className="bi bi-inbox no-quiz-icon" />
      <p>There are currently no quizes</p>
      <button
        className="btn btn-large btn-primary d-block m-auto"
        onClick={() => navigate("/quizes/create")}
      >
        Create
      </button>
    </div>
  );
}
export default NoQuizesMessage;
