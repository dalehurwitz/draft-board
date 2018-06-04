import { h, Component } from 'preact'

function validateFormElements (elements) {
  return [].reduce.call(elements, (list, elem) => {
    if (elem.checkValidity()) return list

    for (var errorKey in elem.validity) {
      if (elem.validity[errorKey]) {
        list[elem.name] = errorKey
        return list
      }
    }
  }, {})
}

function form (WrappedComponent, initialState) {
  return class extends Component {
    state = {
      submitted: false,
      dirtyFields: {},
      errors: {},
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

      const errors = validateFormElements(event.target.elements)
      this.setState({ errors })
    }

    render (props) {
      return (
        <form onSubmit={this.onSubmit} noValidate>
          <WrappedComponent
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            errors={this.state.errors}
            {...props}
          />
        </form>
      )
    }
  }
}

export default form
