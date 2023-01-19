import axios from "axios"
import { Dispatch } from "react"
import { TrackAction, TrackActionTypes } from "../../types/track"

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get('http://localhost:7000/tracks')
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data })
    } catch (event) {
      dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Track download error!' })
    }
  }
}

export const searchTracks = (query: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get('http://localhost:7000/tracks/search?query=' + query)
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data })
    } catch (event) {
      dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Track download error!' })
    }
  }
}