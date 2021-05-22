import actions from './actionsType';

const addQuestion = payload => {
  return {
    type: actions.ADD_QUESTION,
    payload,
  };
};

const removeQuestion = payload => {
  return {
    type: actions.REMOVE_QUESTION,
    payload,
  };
};

const addOptionsForQuestion = payload => {
  return {
    type: actions.ADD_OPTION_FOR_QUESTION,
    payload,
  };
};

const removeOptionsForQuestion = payload => {
  return {
    type: actions.REMOVE_OPTION_FOR_QUESTION,
    payload,
  };
};

export default {
  addQuestion, removeQuestion, addOptionsForQuestion, removeOptionsForQuestion
}