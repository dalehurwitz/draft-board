import { h, Component } from 'preact'
import './styles/main.scss'
import DraftTeam from './components/DraftTeam'
import mockDraft from './_DATA/mock-draft.json'

export default class App extends Component {
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
