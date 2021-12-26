import { useNavigate } from "react-router-dom";
function NoQuizesMessage (){
  let navigate = useNavigate();
  return (
    <div>
      <p>There are currently no quizes</p>
      <button onClick={() => navigate("/quizes/create")}>Create</button>
    </div>
  );
}
export default NoQuizesMessage;
