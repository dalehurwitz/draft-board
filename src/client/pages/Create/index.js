import { h, Component } from 'preact'
import Team from './Team'
import { createDraft } from '../../api/draft'

const steps = ['NAME', 'TEAMS']

class Create extends Component {
  state = {
    step: 0,
    draftName: null,
    teamName: null,
    teams: [],
    loading: false,
    error: null
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

  createDraft = () => {
    this.setState({ loading: true })

    createDraft(this.state.draftName, this.state.teams)
      .then(() => {
        this.setState({
          loading: false,
          info: 'Draft successfully created!',
          teams: []
        })
      })
      .catch(e => {
        this.setState({
          loading: false,
          error: true,
          info: JSON.stringify(e)
        })
      })
  }

  onEditTeam = index => {
    return e => {
      const newTeams = [...this.state.teams]
      newTeams[index] = e.target.value
      this.setState({ teams: newTeams })
    }
  }

  onDeleteTeam = index => {
    return () => {
      const newTeams = [...this.state.teams]
      newTeams.splice(index, 1)
      this.setState({ teams: newTeams })
    }
  }

  toggleStep (dir) {
    this.setState({
      step: this.state.step + dir
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
                autoFocus
              />
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
                autoFocus
              />
            </form>
            <button onClick={this.prevStep}>Back</button>
            {!!this.state.teams.length && (
              <button onClick={this.createDraft}>Done</button>
            )}
            <ol>
              {this.state.teams.map((team, index) => (
                <Team
                  name={team}
                  onEdit={this.onEditTeam(index)}
                  onDelete={this.onDeleteTeam(index)}
                />
              ))}
            </ol>
          </div>
        )
    }
  }

  render () {
    return (
      <div className='fullscreen'>
        {this.state.loading && <span>Loading...</span>}
        {!this.state.loading && (
          <div>
            {this.renderStep()}
            {this.state.info && (
              <div style={{ color: this.state.error ? 'red' : 'green' }}>
                {this.state.info}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default Create
