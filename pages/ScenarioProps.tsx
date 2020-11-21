import {useEffect} from "react"
import {gameLogicInstance} from "./gameLogic"
import {Button, Grid, Paper} from "@material-ui/core"
import { connect } from "react-redux"

const ScenarioProps = (props) => {
  useEffect(async () => {
    await gameLogicInstance.requestScenarioProps()
  }, []);

  const addProp = () => {
    gameLogicInstance.addActiveScenarioProps()
  }

  const removeProp = (prop) => {
    gameLogicInstance.removeActiveScenarioProps(prop)
  }

  return <Paper style={{padding: 15}} elevation={3}>
    <h2>Свойства сценария</h2>
    <Button onClick={addProp} variant="contained" color="primary">Добавить свойства</Button>
    <Grid container spacing={3} style={{paddingTop: 30}}>
      {
        props.activeScenarioProps.allIds.map((id:string) => props.activeScenarioProps.byId[id]).map((scenarioProp) => {
          return <Grid item key={scenarioProp.id} xs={4}>
            <Paper style={{padding: 15}} elevation={3}>
              <h3>{scenarioProp.name}</h3>
              <p>{scenarioProp.description}</p>
              <Button color={"default"} variant="contained" onClick={() => removeProp(scenarioProp)}>Убрать</Button>
            </Paper>
          </Grid>
        })
      }
    </Grid>
  </Paper>
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(ScenarioProps)