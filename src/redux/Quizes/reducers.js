import { SET_CURRENT_QUIZ, ADD_QUIZ, EDIT_QUIZ } from "./actionTypes";
import update from "immutability-helper";
import uuid from "react-uuid";

const defaultVal = {
  currentQuiz: {},
  quizes: [],
};

function quizes (state = defaultVal, action){
  let newData;
  const currentDate =
    new Date().toLocaleDateString("en-US").replace(/\//g, "-") +
    " " +
    new Date().toLocaleTimeString("en-US");
  switch (action.type) {
    case SET_CURRENT_QUIZ:
      newData = update(state, {
        currentQuiz: { $set: action.newCurrentQuiz },
      });
      return newData;
    case ADD_QUIZ:
      let tempQuestionsAnswers = state.currentQuiz.questions_answers;
      for (let i = 0; i < tempQuestionsAnswers.length; i++) {
        tempQuestionsAnswers[i].answer_id = uuid();
        for (let j = 0; j < tempQuestionsAnswers[i].answers.length; j++) {
          tempQuestionsAnswers[i].answers[j].id = uuid();
        }
      }

      const currentQuizWithIds = update(state, {
        currentQuiz: {
          id: { $set: uuid() },
          created: { $set: currentDate },
          modified: { $set: currentDate },
          questions_answers: { $set: tempQuestionsAnswers },
        },
      });
      newData = update(state, {
        quizes: { $push: [ currentQuizWithIds.currentQuiz ] },
      });
      return newData;
    case EDIT_QUIZ:
      let requiredIndex;
      for (let i = 0; i < state.quizes.length; i++) {
        if (state.quizes[i].id === action.quizId) {
          requiredIndex = i;
          console.log(requiredIndex, " requiredIndex - inside if condition");
          break;
        }
      }
      const currentQuizWithDate = update(state, {
        currentQuiz: {
          modified: { $set: currentDate },
        },
      });
      newData = update(state, {
        quizes: {
          $splice: [ [ requiredIndex, 1, currentQuizWithDate.currentQuiz ] ],
        },
      });

      return newData;
    default:
      return state;
  }
}
export default quizes;
