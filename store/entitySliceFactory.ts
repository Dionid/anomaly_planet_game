import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const entitySliceInitialState = {
  allIds: [],
  byId: {},
}

export function entitySliceFactory <T extends {id:string}>(name: string, initialState: {allIds: string[], byId: {[key:string]: T}} = entitySliceInitialState) {
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