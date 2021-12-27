// Router
import { useNavigate } from "react-router-dom";
// Redux
import { shallowEqual, useSelector } from "react-redux";
// Components
import NoQuizesMessage from "./NoQuizesMessage/NoQuizesMessage";
// Css
import "./Quizes.css";

function Quizes (){
  //Use Selector
  const { quizes } = useSelector(
    state => ({
      quizes: state.quizes.quizes,
    }),
    shallowEqual
  );
  let navigate = useNavigate();

  return (
    <div>
      <h1>Quizes</h1>
      {quizes.length === 0 ? (
        <NoQuizesMessage />
      ) : (
        <div>
          <button
            className="d-block btn btn-primary ms-auto me-3 mb-3"
            onClick={() => navigate("/quizes/create")}
          >
            Add
          </button>
          <div className="quizes-wrapper">
            {quizes.map((quiz, key) => (
              <button
                onClick={() => navigate(`/quizes/${quiz.id}`)}
                className="quiz-button"
                key={quiz.id}
              >
                <div className="card mb-3" style={{ maxWidth: 540 }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${quiz.url
                          .trim()
                          .replace("https://youtu.be/", "")}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{quiz.title}</h5>
                        <p className="card-text">{quiz.description}</p>
                        <span>Final Score : {quiz.score}</span>
                        <p className="card-text">
                          <small className="text-muted">
                            Created {quiz.created}
                          </small>
                          <small className="text-muted">
                            Last updated {quiz.modified}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Quizes;
