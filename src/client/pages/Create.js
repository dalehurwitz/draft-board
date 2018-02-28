import { h, Component } from 'preact'

const steps = ['NAME', 'TEAMS']

class Create extends Component {
  state = {
    step: 0,
    draftName: null,
    teamName: null,
    teams: [],
    inputKey: Date.now()
  }

  updateTextField = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  submitDraftName = e => {
    e.preventDefault()
    if (this.state.draftName) {
      this.nextStep()
    }
  }

  submitTeamName = e => {
    e.preventDefault()
    if (this.state.teamName) {
      const { teams, teamName } = this.state
      this.setState({
        teams: [...teams, teamName],
        teamName: null
      })
    }
  }

  toggleStep (dir) {
    this.setState({
      step: this.state.step + dir,
      inputKey: Date.now()
    })
  }

  nextStep = () => {
    this.toggleStep(1)
  }

  prevStep = () => {
    this.toggleStep(-1)
  }

  renderStep () {
    switch (steps[this.state.step]) {
      case 'NAME':
        return (
          <div>
            <h1>Create Draft</h1>
            <form onSubmit={this.submitDraftName}>
              <input
                type='text'
                name='draftName'
                placeholder='Enter a draft name'
                onInput={this.updateTextField}
                value={this.state.draftName}
                autoComplete='off'
                autoFocus />
            </form>
          </div>
        )
      case 'TEAMS':
        return (
          <div>
            <h1>Create Teams</h1>
            <form onSubmit={this.submitTeamName}>
              <input
                type='text'
                name='teamName'
                placeholder='Enter a team name'
                onInput={this.updateTextField}
                value={this.state.teamName}
                autoComplete='off'
                autoFocus />
            </form>
            <button onClick={this.prevStep}>Back</button>
            {!!this.state.teams.length && <button>Done</button>}
            <ol>
              {this.state.teams.map(team => <li>{team}</li>)}
            </ol>
          </div>
        )
    }
  }

  render () {
    return (
      <div className='fullscreen'>
        {this.renderStep()}
      </div>
    )
  }
}

export default Create
