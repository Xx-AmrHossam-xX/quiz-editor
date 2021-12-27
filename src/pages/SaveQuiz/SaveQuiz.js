import { useEffect, useState } from "react";
// Router
import { useParams, useNavigate } from "react-router-dom";
// Libraries
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
} from "reactstrap";
import classNames from "classnames";
// Components
import Info from "./Info/Info";
import Questions from "./Questions/Questions";
// Redux
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { setCurrentQuiz, addQuiz, editQuiz } from "../../redux/Quizes/actions";
// Utilities
import emptyQuizObject from "../../utilities/constants";
// Css
import "./SaveQuiz.css";

function SaveQuiz (){
  //Use Selector
  const { currentQuiz, quizes } = useSelector(
    state => ({
      currentQuiz: state.quizes.currentQuiz,
      quizes: state.quizes.quizes,
    }),
    shallowEqual
  );
  // DISPATCH
  const dispatch = useDispatch();
  // Router
  let navigate = useNavigate();
  let { quizId } = useParams();

  const [ activeTab, setActiveTab ] = useState("1");

  useEffect(() => {
    if (quizId) {
      let requiredQuiz = quizes.find(quiz => quiz.id === quizId);
      dispatch(setCurrentQuiz(requiredQuiz));
    } else {
      // create
      dispatch(setCurrentQuiz(emptyQuizObject));
    }
    return () => {
      dispatch(setCurrentQuiz({}));
    };
  }, []);
  const save = () => {
    if (quizId) {
      // Edit
      dispatch(editQuiz(quizId));
    } else {
      // create
      dispatch(addQuiz());
    }
    navigate("/quizes");
  };
  return (
    <div>
      {!quizId ? <h1>Create</h1> : <h1>Edit</h1>}
      <button
        className="btn btn-large btn-success save-button"
        onClick={() => save()}
      >
        Save
      </button>
      {Object.keys(currentQuiz).length > 0 && (
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classNames({ active: activeTab === "1" })}
                onClick={() => setActiveTab("1")}
              >
                Info
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classNames({ active: activeTab === "2" })}
                onClick={() => setActiveTab("2")}
              >
                Questions
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Info currentQuiz={currentQuiz} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Questions currentQuiz={currentQuiz} />
            </TabPane>
          </TabContent>
        </div>
      )}
    </div>
  );
}
export default SaveQuiz;
