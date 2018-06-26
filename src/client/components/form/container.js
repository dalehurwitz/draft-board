import { h, Component } from 'preact'

function form (WrappedComponent, { defaultValues, fieldErrorMessages }) {
  class Form extends Component {
    state = {
      fieldValues: {
        ...defaultValues
      },
      errors: {},
      submitError: null,
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
          this.setState({ loading: false, submitError: null })
          onSuccess(data)
        })
        .catch(error => {
          const submitError = error.error || error
          this.setState({ loading: false, submitError })
          onError(submitError)
        })
    }

    render (props, state) {
      return (
        <form onSubmit={this.onSubmit} noValidate>
          <WrappedComponent
            onInput={this.onInput}
            onSubmit={this.onSubmit}
            errors={state.errors}
            values={state.fieldValues}
            loading={state.loading}
            submitError={state.submitError}
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
