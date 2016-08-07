import { expect } from 'chai'
import reducter from '../'
import { createStore, combineReducers } from 'redux'

describe('reducter', () => {
  it('should return a reducer function', () => {
    expect(reducter({ 'FOO': () => 'foo' })).to.be.a.function
  })

  it('should be a valid reducer function', () => {
    const reducer = reducter({ 'FOO': () => 'foo' })

    expect(reducer()).to.be.equal(undefined)
    expect(reducer(undefined, { type: 'FOO' })).to.be.equal('foo')
  })

  it('should accept the initial state as second argument', () => {
    const initialState = 'bar'
    const reducer = reducter({ 'FOO': () => 'foo' }, initialState)

    expect(reducer()).to.be.equal(initialState)
    expect(reducer(undefined, { type: 'FOO' })).to.be.equal('foo')
  })

  it('should work as a redux reducer', () => {
    const store = createStore(reducter({ 'INCREMENT': state => state + 1 }, 0))
    expect(store.getState()).to.be.equal(0)
    store.dispatch({ type: 'INCREMENT' })
    expect(store.getState()).to.be.equal(1)
  })

  it('should work with multiple actions', () => {
    const reducer = reducter({
      'INCREMENT': state => state + 1,
      'DECREMENT': state => state - 1
    }, 0)

    const store = createStore(reducer)
    expect(store.getState()).to.be.equal(0)

    store.dispatch({ type: 'INCREMENT' })
    expect(store.getState()).to.be.equal(1)

    store.dispatch({ type: 'DECREMENT' })
    expect(store.getState()).to.be.equal(0)
  })

  it('should work with redux#createStore() initialState argument', () => {
    const store = createStore(reducter({ 'INCREMENT': state => state + 1 }), 0)

    expect(store.getState()).to.be.equal(0)
  })

  it('should work when matching action exists', () => {
    const reducer = reducter({
      'FOO': () => 'foo',
      'BAR': () => 'bar'
    })

    expect(reducer(undefined, { type: 'FOOBAR' })).to.be.equal(undefined)
  })

  it('should work with redux#combineReducers()', () => {
    const foo = reducter({ 'FOO': () => 'foo' }, '')
    const bar = reducter({ 'BAR': () => 'bar' }, '')

    const store = createStore(
      combineReducers({ foo, bar })
    )

    expect(store.getState()).to.be.deep.equal({
      foo: '',
      bar: ''
    })

    store.dispatch({ type: 'FOO' })

    expect(store.getState()).to.be.deep.equal({
      foo: 'foo',
      bar: ''
    })

    store.dispatch({ type: 'BAR' })

    expect(store.getState()).to.be.deep.equal({
      foo: 'foo',
      bar: 'bar'
    })
  })
})
