import { SET_CURRENT_QUIZ, ADD_QUIZ, EDIT_QUIZ } from "./actionTypes";

export const setCurrentQuiz = newCurrentQuiz => {
  return {
    type: SET_CURRENT_QUIZ,
    newCurrentQuiz,
  };
};
export const addQuiz = () => {
  return {
    type: ADD_QUIZ,
  };
};
export const editQuiz = quizId => {
  return {
    type: EDIT_QUIZ,
    quizId,
  };
};
