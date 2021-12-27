// libraries
import { Form, FormGroup, Label, Col, Input } from "reactstrap";
import update from "immutability-helper";
// redux
import { useDispatch } from "react-redux";
import { setCurrentQuiz } from "../../../redux/Quizes/actions";

function Questions ({ currentQuiz }){
  // DISPATCH
  const dispatch = useDispatch();

  const change = (key, property, value) => {
    const newCurrentQuiz = update(currentQuiz, {
      questions_answers: { [key]: { [property]: { $set: value } } },
    });
    dispatch(setCurrentQuiz(newCurrentQuiz));
  };
  const changeAnswers = (parentKey, childKey, property, value) => {
    let newArray = [];
    if (typeof value === "boolean") {
      newArray = currentQuiz.questions_answers[
        parentKey
      ].answers.map((answer, key) => ({
        ...answer,
        is_true: key === childKey,
      }));
    }
    const newCurrentQuiz =
      typeof value === "boolean"
        ? update(currentQuiz, {
            questions_answers: {
              [parentKey]: {
                answers: { $set: newArray },
              },
            },
          })
        : update(currentQuiz, {
            questions_answers: {
              [parentKey]: {
                answers: { [childKey]: { [property]: { $set: value } } },
              },
            },
          });
    dispatch(setCurrentQuiz(newCurrentQuiz));
  };
  const addAnswer = key => {
    const newCurrentQuiz = update(currentQuiz, {
      questions_answers: {
        [key]: {
          answers: {
            $push: [
              {
                id: "",
                is_true: false,
                text: "",
              },
            ],
          },
        },
      },
    });
    dispatch(setCurrentQuiz(newCurrentQuiz));
  };
  const addQuestion = () => {
    const newCurrentQuiz = update(currentQuiz, {
      questions_answers: {
        $push: [
          {
            answer_id: "",
            answers: [
              {
                id: "",
                is_true: true,
                text: "",
              },
              {
                id: "",
                is_true: false,
                text: "",
              },
            ],
            feedback_false: "",
            feedback_true: "",
            id: "",
            text: "",
          },
        ],
      },
    });
    dispatch(setCurrentQuiz(newCurrentQuiz));
  };

  return (
    <div>
      {currentQuiz.questions_answers.map((questions_answersObj, key) => (
        <div key={`question-${key}`}>
          <Form className="p-3">
            <FormGroup row>
              <Label htmlFor="question-text" sm={2}>
                Text
              </Label>
              <Col sm={10}>
                <Input
                  id="question-text"
                  name="question-text"
                  placeholder="text"
                  type="text"
                  value={questions_answersObj.text}
                  onChange={e => change(key, "text", e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="correct-feedback" sm={2}>
                Correct Feedback
              </Label>
              <Col sm={10}>
                <Input
                  id="correct-feedback"
                  name="correct-feedback"
                  placeholder="correct-feedback"
                  type="text"
                  value={questions_answersObj.feedback_true}
                  onChange={e => change(key, "feedback_true", e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="incorrect-feedback" sm={2}>
                Incorrect Feedback
              </Label>
              <Col sm={10}>
                <Input
                  id="incorrect-feedback"
                  name="incorrect-feedback"
                  placeholder="incorrect-feedback"
                  type="text"
                  value={questions_answersObj.feedback_false}
                  onChange={e => change(key, "feedback_false", e.target.value)}
                />
              </Col>
            </FormGroup>
          </Form>
          <h5>Answers :</h5>
          <ol className="list-group list-group-numbered">
            {questions_answersObj.answers.map((answer, answerKey) => (
              <li
                className="list-group-item align-items-center d-flex p-3"
                key={`answer-${key}-${answerKey}`}
              >
                <Input
                  className="mx-2"
                  placeholder="answer"
                  type="text"
                  value={answer.text}
                  onChange={e =>
                    changeAnswers(key, answerKey, "text", e.target.value)}
                />
              </li>
            ))}
          </ol>
          <h5 className="my-2">Correct Answer :</h5>
          {questions_answersObj.answers.map((answer, answerKey) => (
            <div
              className="form-check form-check-inline"
              key={`answer_istrue-${key}-${answerKey}`}
            >
              <input
                className="form-check-input"
                type="radio"
                name={`answer_istrue-${key}`}
                id={`answer_istrue-${key}-${answerKey}`}
                value="option1"
                checked={answer.is_true}
                onChange={e =>
                  changeAnswers(key, answerKey, "is_true", e.target.checked)}
              />
              <label
                className="form-check-label"
                htmlFor={`answer_istrue-${key}-${answerKey}`}
              >
                {answerKey + 1}
              </label>
            </div>
          ))}
          <button
            className="btn btn-sm btn-primary "
            onClick={() => addAnswer(key)}
          >
            Add Answer
          </button>
          <hr />
        </div>
      ))}
      <button
        className="btn btn-primary m-auto d-block"
        onClick={() => addQuestion()}
      >
        Add Question
      </button>
    </div>
  );
}
export default Questions;
