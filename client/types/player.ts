import { ITrack } from "./track";

export interface PlayerState {
  active: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
  isFirstPageLoad: boolean;
}

export enum PlayerActionTypes {
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  SET_VOLUME = "SET_VOLUME",
  SET_ACTIVE = "SET_ACTIVE",
  SET_DURATION = "SET_DURATION",
  SET_CURRENT_TIME = "SET_CURRENT_TIME",
  SET_IS_FIRST_PAGE_LOAD = "SET_IS_FIRST_PAGE_LOAD"
}

interface PlayAction {
  type: PlayerActionTypes.PLAY;
}

interface PauseAction {
  type: PlayerActionTypes.PAUSE;
}

interface SetVolumeAction {
  type: PlayerActionTypes.SET_VOLUME;
  payload: number;
}

interface SetAciveAction {
  type: PlayerActionTypes.SET_ACTIVE;
  payload: ITrack;
}

interface SetDurationAction {
  type: PlayerActionTypes.SET_DURATION;
  payload: number;
}

interface SetCurrentTimeAction {
  type: PlayerActionTypes.SET_CURRENT_TIME;
  payload: number;
}

interface SetIsFirstPageLoadAction {
  type: PlayerActionTypes.SET_IS_FIRST_PAGE_LOAD;
  payload: boolean
}

export type PlayerAction =
  PlayAction |
  PauseAction |
  SetVolumeAction |
  SetAciveAction |
  SetDurationAction |
  SetCurrentTimeAction |
  SetIsFirstPageLoadAction 
