import {
  CLASS_LIST_FAIL,
  CLASS_LIST_REQUEST,
  CLASS_LIST_SUCCESS,
} from '../constants/classActionConstants';

const classListReducer = (state = {classes: []}, action) => {
  switch (action.type) {
    case CLASS_LIST_REQUEST:
      return {loading: true, error: false};
    case CLASS_LIST_SUCCESS:
      return {
        loading: false,
        error: false,
        classes: action.payload,
        success: true,
      };
    case CLASS_LIST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export {classListReducer};
