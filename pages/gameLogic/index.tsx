import {combineReducers, configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit"

const entitySliceInitialState = {
  allIds: [],
  byId: {},
}

function entitySliceFactory <T extends {id:string}>(name: string, initialState: {allIds: string[], byId: {[key:string]: T}} = entitySliceInitialState) {
  return createSlice({
    name,
    initialState,
    reducers: {
      addBatch: (state, action: PayloadAction<T[]>) => {
        return {
          allIds: [...state.allIds, ...action.payload.map(ent => ent.id)],
          byId: {
            ...state.byId,
            ...action.payload.reduce((sum: {[key:string]: T}, cur) => {
              sum[cur.id] = cur
              return sum
            }, {})
          }
        }
      },
      add: (state, action: PayloadAction<T>) => {
        return {
          allIds: [...state.allIds, action.payload.id],
          byId: {
            ...state.byId,
            [action.payload.id]: action.payload,
          }
        }
      },
      remove: (state, action: PayloadAction<string>) => {
        const key = action.payload
        const {[key]: value, ...rest} = state.byId
        return {
          allIds: state.allIds.filter(id => action.payload !== id),
          byId: rest,
        }
      },
      update: (state, action: PayloadAction<T>) => {
        return {
          allIds: state.allIds,
          byId: {
            ...state.byId,
            [action.payload.id]: action.payload,
          }
        }
      },
      reset: () => {
        return initialState
      }
    }
  })
}


const scenarioPropsSlice = entitySliceFactory("scenarioProps")
const scenarioPropsLeftSlice = entitySliceFactory("scenarioPropsLeft")
const activeScenarioPropsSlice = entitySliceFactory("activeScenarioProps")

const rootReducer = combineReducers({
  scenarioProps: scenarioPropsSlice.reducer,
  scenarioPropsLeft: scenarioPropsLeftSlice.reducer,
  activeScenarioProps: activeScenarioPropsSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export class GameLogic {
  SHEET_ID = '1DH88qZDu8wYytSK4CDT4XYfSMFUfjGfwPQ65luaUUlM'
  ACCESS_TOKEN = 'AIzaSyDYWsYcyYdhU7LgQZIHUJlpla0yV8BBfis'

  store = store

  // scenarioProps = []
  // scenarioPropsLeft = []
  // activeScenarioProps = []

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
}

export const gameLogicInstance = new GameLogic()