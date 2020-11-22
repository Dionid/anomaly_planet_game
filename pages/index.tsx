import {Container, Grid} from "@material-ui/core"
import ScenarioProps from "./ScenarioProps"
import {Provider} from "react-redux"
import {store} from "../store"
import PlayersList from "./PlayersList"

export default function Home() {
  return (
    <Provider store={store}>
      <Container>
        <Grid container style={{paddingTop: 75}} spacing={3}>
          <Grid item xs={12}>
            <ScenarioProps/>
          </Grid>
          <Grid item xs={12} style={{paddingTop: 30}}>
            <PlayersList/>
          </Grid>
        </Grid>
      </Container>
    </Provider>
  )
}
