# reducter
> Create simple reducers for Redux with ease

## Install

    npm i guilhermehn/reducter --save

## Usage
~~~ js
import reducter from 'reducter'
import { createStore } from 'redux'

const counter = reducter({
  'INCREMENT': state => state + 1,
  'DECREMENT': state => state - 1
})

const store = createStore(counter, 0)
console.log(store.getState())
// => 0

store.dispatch({ type: 'INCREMENT' })
console.log(store.getState())
// => 1

store.dispatch({ type: 'DECREMENT' })
console.log(store.getState())
// => 0
~~~

## API
~~~ js
reducter(
  actionsObject,
  // object of { ACTION_NAME: function action(state, action) }

  initialState
  // optional initial state; Must be present when used with
  // combineReducers from Redux
)
~~~

## Using with `combineReducers`
Remember to **always** pass the inital state to `reducter` when using `combineReducers` or Redux will throw an error.
~~~ js
const name = reducter({
  'SET_NAME': (state, action) => action.name
}, '')

const id = reducter({
  'SET_ID': (state, action) => action.id
}, '')

const user = combineReducers({ name, id })
const store = createStore(user)
~~~

## License
MIT
