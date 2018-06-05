import { h, Component } from 'preact'

function validateFormElements (elements) {
  return [].reduce.call(
    elements,
    (list, elem) => {
      // Input is valid
      if (elem.checkValidity()) return list

      // Input is invalid - find the first validation error
      for (var errorKey in elem.validity) {
        if (elem.validity[errorKey]) {
          list[elem.name] = errorKey
          return list
        }
      }
    },
    {}
  )
}

// Returns an object without keys that
// exist in exclusions list
function exclude (state, exclusions) {
  return Object.keys(state).reduce((list, nextKey) => {
    if (exclusions.hasOwnProperty(nextKey)) return list
    list[nextKey] = state[nextKey]
    return list
  }, {})
}

function form (
  WrappedComponent,
  { defaultValues, onSubmit, onSuccess, onError }
) {
  const initialState = {
    dirtyFields: {},
    errors: {},
    submitted: false
  }

  return class extends Component {
    state = {
      ...initialState,
      ...defaultValues
    }

    onInput = event => {
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

      if (Object.keys(errors).length) {
        return this.setState({ errors })
      }

      this.setState({ loading: true })

      const values = exclude(this.state, initialState)
      const submit = onSubmit(values)

      submit.then(onSuccess).catch(onError)
    }

    render (props) {
      const values = exclude(this.state, initialState)
      return (
        <form onSubmit={this.onSubmit} noValidate>
          <WrappedComponent
            onInput={this.onInput}
            onSubmit={this.onSubmit}
            errors={this.state.errors}
            values={values}
            {...props}
          />
        </form>
      )
    }
  }
}

export default form
