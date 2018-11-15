import { combineReducers } from 'redux'
import { ADD, DELETE } from '../constants/todos'

const INIT_STATE = {
  todos: [
    {
      id: 0,
      text: 'first'
    }
  ]
}

function todos (state = INIT_STATE, action) {
  const todoNum = state.todos.length

  switch (action.type) {
    case ADD:
      return {
        ...state,
        todos: state.todos.concat({
          id: todoNum,
          text: action.text
        })
      }
      break

    case DELETE: 
      let newTodos = state.todos.filter(item => {
        return item.id !== action.id
      })
      break

    default:
      return state
  }
}

export default combineReducers({
  todos
})
