import {Container, Grid} from "@material-ui/core"
import {store} from "./gameLogic"
import ScenarioProps from "./ScenarioProps"
import {Provider} from "react-redux"

export default function Home() {
  return (
    <Provider store={store}>
      <Container>
        <Grid container style={{paddingTop: 75}}>
          <Grid item cx={12} style={{width: "100%"}}>
            <ScenarioProps/>
          </Grid>
        </Grid>
      </Container>
    </Provider>
  )
}
