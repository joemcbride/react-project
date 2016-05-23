import React from 'react'
import Title from 'react-title-component'
import { connect } from 'react-redux'
import * as counterActions from './counter'

const mapStateToProps = (state) => {
  const { count } = state.counter
  return {
    count
  }
}

const Counter = React.createClass({

  propTypes: {
    count: React.PropTypes.number.isRequired,
    increment: React.PropTypes.func.isRequired
  },

  render() {
    let { count, increment } = this.props
    return (
      <div>
        <Title render={prev => `${prev} | Counting`}/>
        <h2>Counting</h2>
        <span>{count}</span>
        <div><button onClick={increment}>Click</button></div>
      </div>
    )
  }
})

export default connect(mapStateToProps, counterActions)(Counter)
