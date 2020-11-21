import Paper from "@material-ui/core/Paper/Paper"
import {Button} from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import {connect} from "react-redux"
import {gameLogicInstance} from "./gameLogic"

const PlayersList = (props) => {
  return (
    <Paper style={{padding: 15}}>
      <h2>Players</h2>
      <Button onClick={gameLogicInstance.addPlayer} variant="contained" color="primary">Add player</Button>
      <Grid container style={{paddingTop: 30}} spacing={3}>
          {
            props.allIds.map((id:string) => props.byId[id]).map((player) => {
              const onChange = (event) => {
                gameLogicInstance.updatePlayersName(player.id, event.target.value)
              }
              return (
                <Grid item xs={4}>
                  <Paper style={{padding: 15}}>
                    <TextField id="outlined-basic" label="Name" variant="outlined" onChange={onChange} value={player.name}/>
                  </Paper>
                </Grid>
              )
            })
          }
      </Grid>
    </Paper>
  )
}

const mapStateToProps = state => {
  return state.players
}

export default connect(mapStateToProps)(PlayersList)