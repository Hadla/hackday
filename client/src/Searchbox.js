import React, { Component } from 'react'

class Searchbox extends Component {

  state = {
    text: ''
}

  render() {
    return (
      <form className="form" >
        <input className="searchbox" placeholder='Search' type="text" onChange={(e) => {
            this.props.searchFilter(e.target.value)
            // this.setState({ text: e.target.value },
            // () => this.props.searchFilter(this.state.text)
          // )
        }} />
      </form>
    )
  }
}

export default Searchbox;