import {activeScenarioPropsSlice, playersSlice, scenarioPropsLeftSlice, scenarioPropsSlice, store} from "../../store"
import {v4} from "uuid"

export class GameLogic {
  SHEET_ID = '1DH88qZDu8wYytSK4CDT4XYfSMFUfjGfwPQ65luaUUlM'
  ACCESS_TOKEN = 'AIzaSyDYWsYcyYdhU7LgQZIHUJlpla0yV8BBfis'

  store = store

  requestScenarioProps = async () => {
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/A1:H30?key=${this.ACCESS_TOKEN}`)
    const resData = await res.json()
    const names = resData.values.shift()
    const result = resData.values.reduce((sum, valuesArr, i) => {
      const obj = names.reduce((resultPropObj, propName, j) => {
        resultPropObj[propName] = valuesArr[j]
        return resultPropObj
      }, {})
      sum.push(obj)
      return sum
    }, [])
    scenarioPropsSlice.actions
    this.store.dispatch(scenarioPropsSlice.actions.addBatch(result))
    this.store.dispatch(scenarioPropsLeftSlice.actions.addBatch(result))
  }

  addActiveScenarioProps = async () => {
    const scenarioPropsLeft = this.store.getState().scenarioPropsLeft
    if (scenarioPropsLeft.allIds.length === 0) return
    const randNum = Math.floor(Math.random() * scenarioPropsLeft.allIds.length)
    const activeProp = scenarioPropsLeft.byId[scenarioPropsLeft.allIds[randNum]]
    this.store.dispatch(activeScenarioPropsSlice.actions.add(activeProp))
    this.store.dispatch(scenarioPropsLeftSlice.actions.remove(activeProp.id))
  }

  removeActiveScenarioProps = async (scenarioProp) => {
    this.store.dispatch(scenarioPropsLeftSlice.actions.add(scenarioProp))
    this.store.dispatch(activeScenarioPropsSlice.actions.remove(scenarioProp.id))
  }

  addPlayer = () => {
    this.store.dispatch(playersSlice.actions.add({id: v4(), name: ""}))
  }

  updatePlayersName = (id: string, name: string) => {
    const player = this.store.getState().players.byId[id]
    this.store.dispatch(playersSlice.actions.update({ ...player, name}))
  }
}

export const gameLogicInstance = new GameLogic()