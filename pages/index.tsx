import {Container, Grid} from "@material-ui/core"
import ScenarioProps from "./ScenarioProps"
import {Provider} from "react-redux"
import {store} from "../store"
import Paper from "@material-ui/core/Paper"
import PlayersList from "./PlayersList"

export default function Home() {
  return (
    <Provider store={store}>
      <Container>
        <Grid container style={{paddingTop: 75}}>
          <Grid item cx={12} style={{width: "100%"}} spacing={3}>
            <Grid item>
              <ScenarioProps/>
            </Grid>
            <Grid item>
              <PlayersList/>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Provider>
  )
}
