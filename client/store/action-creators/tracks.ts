import axios from "axios"
import { Dispatch } from "react"
import { TrackAction, TrackActionTypes } from "../../types/track"
import { SERVER_URL } from '../../consts/consts';

export const fetchTracks = () => {
  console.log(SERVER_URL);
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get(SERVER_URL + 'tracks')
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data })
    } catch (event) {
      dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: `The error when fetching tracks from ${SERVER_URL}` })
    }
  }
}

export const searchTracks = (query: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get(SERVER_URL + 'tracks/search?query=' + query)
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data })
    } catch (event) {
      dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Track download error!' })
    }
  }
}