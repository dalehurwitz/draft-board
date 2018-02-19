import { h } from 'preact'
import PLAYERS from '../_DATA/players.json'

function buildPlayers (list) {
  return list.map(player => ({ ...PLAYERS[player] }))
}

const DraftTeam = ({ team }) => {
  const players = buildPlayers(team.players)
  return (
    <div className='draft-team'>
      <h3>{team.name}</h3>
      {players.map(player => (
        <div className={`draft-player draft-player--${player.position}`}>
          <div className='draft-player__name'>{player.name}</div>
          {player.team}
        </div>
      ))}
    </div>
  )
}

export default DraftTeam
