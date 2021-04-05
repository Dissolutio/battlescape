export interface SetupDataType {
  passAndPlay: boolean
}

export type PlayerInfo = {
  name: string
  color: number
  ready: boolean
}

export const passAndPlaySetupData: SetupDataType = {
  passAndPlay: true,
}
export const multiplayerSetupData: SetupDataType = {
  passAndPlay: false,
}

export const MAX_PLAYERS = 6

export const NUM_COLORS = 7

export const PLAYER_NAME_MAX_LEN = 16

// We also use the constants on the backend server, for which `window` is not defined.
const isDeploymentEnv = process.env.NODE_ENV === "production"
const isDevEnv = process.env.NODE_ENV === "development"
const isSeparateServer = Boolean(process.env.REACT_APP_WITH_SEPARATE_SERVER)
const isLocalApp = isDevEnv && !isSeparateServer

// use appropriate address for server
const hostname = window?.location?.hostname ?? ""
const protocol = window?.location?.protocol ?? ""
const port = window?.location?.port ?? ""
const deploymentServerAddr = `${protocol}//${hostname}${port ? `:${port}` : ``}`
const localServerAddr = `http://localhost:8000`
export const SERVER = isDeploymentEnv ? deploymentServerAddr : localServerAddr
