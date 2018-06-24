import { h, Component } from 'preact'

function form (WrappedComponent, { defaultValues, fieldErrorMessages }) {
  class Form extends Component {
    state = {
      fieldValues: {
        ...defaultValues
      },
      errors: {},
      submitted: false
    }

    onInput = event => {
      const { name, value } = event.target
      this.setState({
        fieldValues: {
          ...this.state.fieldValues,
          [name]: value
        }
      })
    }

    onSubmit = event => {
      event.preventDefault()

      const errors = validateFormElements(
        event.target.elements,
        fieldErrorMessages
      )

      if (Object.keys(errors).length) {
        return this.setState({ errors })
      }

      this.setState({ loading: true, errors: {} })

      const { onSubmit, onSuccess, onError } = this.props

      const submit = onSubmit(this.state.fieldValues)

      submit
        .then(data => {
          this.setState({ loading: false })
          onSuccess(data)
        })
        .catch(onError)
    }

    render (props) {
      return (
        <form onSubmit={this.onSubmit} noValidate>
          <WrappedComponent
            onInput={this.onInput}
            onSubmit={this.onSubmit}
            errors={this.state.errors}
            values={this.state.fieldValues}
            loading={this.state.loading}
            {...props}
          />
        </form>
      )
    }
  }

  Form.defaultProps = {
    onSubmit: noop,
    onSuccess: noop,
    onError: noop
  }

  return Form
}

function noop () {}

function validateFormElements (elements, fieldErrorMessages = {}) {
  return [].reduce.call(
    elements,
    (list, elem) => {
      // Input is valid
      if (elem.checkValidity()) return list

      // Input is invalid - find the first validation error
      for (var errorKey in elem.validity) {
        if (elem.validity[errorKey]) {
          const errorMessage =
            (fieldErrorMessages[elem.name] &&
              fieldErrorMessages[elem.name][errorKey]) ||
            errorKey
          list[elem.name] = errorMessage
          return list
        }
      }
    },
    {}
  )
}

export default form
