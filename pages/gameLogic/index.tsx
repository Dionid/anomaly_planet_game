import {activeScenarioPropsSlice, playersSlice, scenarioPropsLeftSlice, originScenarioPropsSlice, store} from "../../store"
import {PlayerModelService} from "./playerModel"
import {EnhancedStore} from "@reduxjs/toolkit"

export class GoogleSheetRepo {
  SHEET_ID = '1DH88qZDu8wYytSK4CDT4XYfSMFUfjGfwPQ65luaUUlM'
  ACCESS_TOKEN = 'AIzaSyDYWsYcyYdhU7LgQZIHUJlpla0yV8BBfis'

  public async getScenarioPropsData(): Promise<any> {
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
    return result
  }
}

export interface GameLogicRepo {
  getScenarioPropsData: any
}

export class GameLogic {
  constructor(
    private store: EnhancedStore,
    private repo: GameLogicRepo,
  ) {

  }

  initGame = async () => {
    this.requestScenarioProps()
  }

  requestScenarioProps = async () => {
    const scenarioPropsData = await this.repo.getScenarioPropsData()
    this.store.dispatch(originScenarioPropsSlice.actions.addBatch(scenarioPropsData))
    this.store.dispatch(scenarioPropsLeftSlice.actions.addBatch(scenarioPropsData))
  }

  addActiveScenarioProps = async () => {
    const scenarioPropsLeft = this.store.getState().scenarioPropsLeft
    if (scenarioPropsLeft.allIds.length === 0) return
    const randNum = Math.floor(Math.random() * scenarioPropsLeft.allIds.length)
    const activeProp = scenarioPropsLeft.byId[scenarioPropsLeft.allIds[randNum]]
    this.store.dispatch(activeScenarioPropsSlice.actions.add(activeProp))
    this.store.dispatch(scenarioPropsLeftSlice.actions.remove(activeProp.id))
  }

  removeActiveScenarioProps = async (scenarioPropId: string) => {
    const scenarioProp = this.store.getState().originScenarioProps.byId[scenarioPropId]
    this.store.dispatch(scenarioPropsLeftSlice.actions.add(scenarioProp))
    this.store.dispatch(activeScenarioPropsSlice.actions.remove(scenarioPropId))
  }

  addPlayer = () => {
    this.store.dispatch(playersSlice.actions.add(PlayerModelService.createPlayer()))
  }

  removePlayer = (id: string) => {
    this.store.dispatch(playersSlice.actions.remove(id))
  }

  updatePlayersName = (id: string, name: string) => {
    const player = this.store.getState().players.byId[id]
    this.store.dispatch(playersSlice.actions.update({ ...player, name }))
  }

  addPositiveBuffToPlayer = (id: string) => {
    const player = this.store.getState().players.byId[id]
    this.store.dispatch(playersSlice.actions.update({
      ...player,
      buffs: [
        // Here will be new random buff
      ]
    }))
  }

  setNewLeader = (playerId: string) => {
    const playersStore = this.store.getState().players
    const newLeaderPlayer = playersStore.byId[playerId]
    const oldLeaderPlayer = Object.values(playersStore.byId).filter(player => {
      return player.isLeader
    })[0]
    this.store.dispatch(playersSlice.actions.update({ ...newLeaderPlayer, isLeader: true }))
    if (oldLeaderPlayer) this.store.dispatch(playersSlice.actions.update({ ...oldLeaderPlayer, isLeader: false }))
  }
}

export const gameLogicInstance = new GameLogic(store, new GoogleSheetRepo())