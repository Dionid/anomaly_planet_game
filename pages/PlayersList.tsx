import Paper from "@material-ui/core/Paper/Paper"
import {Button} from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import {connect} from "react-redux"
import {gameLogicInstance} from "./gameLogic"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import {Fragment, FunctionComponent, useState} from "react"
import FormGroup from "@material-ui/core/FormGroup"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"

export enum DIFFICULT_TYPES {
  Easy= "Easy",
  Medium= "Medium",
  Epic= "Epic",
}

interface TypeOfPropButtonProps {
  text: string
  onSelected: (p: DIFFICULT_TYPES) => void
}

export const TypeOfPropButton: FunctionComponent<TypeOfPropButtonProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (type: DIFFICULT_TYPES) => {
    props.onSelected(type);
    handleClose();
  }

  return (
    <Fragment>
      <Button color={"default"} variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        { props.text }
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick(DIFFICULT_TYPES.Easy)}>Easy</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(DIFFICULT_TYPES.Medium)}>Medium</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(DIFFICULT_TYPES.Epic)}>Epic</MenuItem>
      </Menu>
    </Fragment>
  )
}


const PlayersList = (props) => {
  return (
    <Paper style={{padding: 15}} elevation={0}>
      <h2>Players</h2>
      <Grid container spacing={3}>
        <Grid item>
          <Button onClick={gameLogicInstance.addPlayer} variant="contained" color="primary">Add player</Button>
        </Grid>
        <Grid item>
          <Button onClick={gameLogicInstance.setRandomLeader} variant="contained" color="primary">Set random Leader</Button>
        </Grid>
      </Grid>
      <Grid container style={{paddingTop: 30}} spacing={3}>
          {
            props.allIds.map((id) => props.byId[id]).map((player) => {
              const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                gameLogicInstance.updatePlayersName(player.id, event.target.value)
              }
              return (
                <Grid item xs={12} key={player.id}>
                  <Paper style={{padding: 15}}>
                    <FormGroup row>
                      <TextField id="outlined-basic" label="Name" variant="outlined" onChange={onChange} value={player.name} style={{width: "100%"}}/>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={player.isLeader}
                            onChange={() => gameLogicInstance.setNewLeader(player.id)}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label="Is leader"
                      />
                    </FormGroup>
                    <Grid container style={{marginTop: 15}}>
                      <Grid item>
                        <TypeOfPropButton onSelected={ () => {} } text={"Add buff"}/>
                        <TypeOfPropButton onSelected={ () => {} } text={"Add debuff"}/>
                      </Grid>
                      <Grid item>
                        <Button color={"default"} variant="contained" onClick={() => gameLogicInstance.removePlayer(player.id)}>Remove</Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              )
            })
          }
      </Grid>
    </Paper>
  )
}

const mapStateToProps = (state) => {
  return state.players
}

export default connect(mapStateToProps)(PlayersList)