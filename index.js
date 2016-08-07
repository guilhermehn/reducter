const cloneDeep = require('lodash.clonedeep')

const reducter = (actions, initialState) => (state = initialState, action = {}) => {
  const actionNames = Object.keys(actions)

  const result = actionNames.reduce((nextState, name) => {
    if (action.type === name) {
      return actions[name](nextState, action)
    }

    return nextState
  }, cloneDeep(state))

  return result
}

export default reducter
