import { h, Component } from 'preact'
import DraftTeam from '../components/DraftTeam'
import mockDraft from '../_DATA/mock-draft.json'

class Draft extends Component {
  render () {
    return (
      <div>
        <h1>{mockDraft.name}</h1>
        <div className='draft-board'>
          {mockDraft.teams.map(team => <DraftTeam team={team} />)}
        </div>
      </div>
    )
  }
}

export default Draft
