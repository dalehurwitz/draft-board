import { h, Component } from 'preact'

function form (WrappedComponent, initialState) {
  return class extends Component {
    state = {
      submitted: false,
      dirtyFields: {},
      ...initialState
    }

    onChange = event => {
      const { name, value } = event.target
      this.setState({
        dirtyFields: {
          ...this.state.dirtyFields,
          [name]: true
        },
        [name]: value
      })
    }

    onSubmit = event => {
      event.preventDefault()
      console.log(event)
    }

    render (props) {
      return (
        <WrappedComponent
          {...props}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      )
    }
  }
}

export default form
