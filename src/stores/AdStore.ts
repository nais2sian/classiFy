import { createSlice, configureStore } from '@reduxjs/toolkit'
import { type Ad } from '../types'

export type AdsSliceType = {
    ads: Ad[]
    selectedAd: Ad | undefined
}

const initialState: AdsSliceType = {
    ads: [],
    selectedAd: undefined
}

export const adsSlice = createSlice({
  name: 'adsSlice',
  initialState,
  reducers: {
    addAd(state, action) {
        state.ads.push(action.payload)
        return state
    },
    setAds(state, action) {
        // Action is an object like this = { type: string, payload: any }
        // adsSlice.actions.setAds(res.data)
        //                         ^^^^^^^^ this is the payload
        state.ads = action.payload
        return state
    },
    setSelectedAd(state, action) {
        state.selectedAd = action.payload
        return state
    }
  }
})

export const { addAd } = adsSlice.actions

export const adsStore = configureStore({
  reducer: adsSlice.reducer
})
