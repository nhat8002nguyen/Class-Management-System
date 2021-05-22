import actions from '../actions/actionsType';

export default recuder = (state = [], action) =>{
  switch(action.type){
    case actions.ADD_QUESTION:
      return [...state, action.payload]
    case actions.REMOVE_QUESTION: 
      return state.filter((item, index)=> index != action.payload)
    default: 
      return state;
  }
}