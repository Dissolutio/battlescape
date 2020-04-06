import React, { useContext, useReducer } from 'react'

const BoardContext = React.createContext([{}, () => { }])

const initialState = {
  topConsole: '',
  mainDisplay: '',
  bottomConsole: '',
  counter: 1,
}
function reducer(state, action) {
  switch (action.type) {
    case 'setTopConsole':
      return { ...state, topConsole: action.payload };
    case 'setMainDisplay':
      return { ...state, mainDisplay: action.payload };
    case 'setBottomConsole':
      return { ...state, bottomConsole: action.payload };
    case 'incrementCounter':
      return { ...state, counter: state.counter++ };
    case 'decrementCounter':
      return { ...state, counter: state.counter-- };
    default:
      return state
  }
}

const BoardContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BoardContext.Provider value={[state, dispatch]}>
      {props.children}
    </BoardContext.Provider>
  )
}

const useBoardContext = () => {
  const [boardState, dispatch] = useContext(BoardContext);
  return {
    boardState,
    dispatch
  }
}

export { BoardContextProvider, useBoardContext }