import {entitySliceFactory} from "./entitySliceFactory"
import {combineReducers} from "redux"
import {configureStore} from "@reduxjs/toolkit"

export const scenarioPropsSlice = entitySliceFactory("scenarioProps")
export const scenarioPropsLeftSlice = entitySliceFactory("scenarioPropsLeft")
export const activeScenarioPropsSlice = entitySliceFactory("activeScenarioProps")

export const playersSlice = entitySliceFactory("playersSlice")

const rootReducer = combineReducers({
  scenarioProps: scenarioPropsSlice.reducer,
  scenarioPropsLeft: scenarioPropsLeftSlice.reducer,
  activeScenarioProps: activeScenarioPropsSlice.reducer,
  players: playersSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
