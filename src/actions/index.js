import { ADD, DELETE } from '../constants/todos'

export const add = (text) => {
  return {
    text,
    type: ADD
  }
}

export const del = (id) => {
  return {
    type: DELETE,
    id
  }
}
