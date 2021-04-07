import React, { useState, useEffect, useRef } from "react"
import { SERVER } from "App"
import { PlayerInfo } from "game/types"
import { FilteredMetadata } from "boardgame.io"
import { GiPencil } from "react-icons/gi"
import { useBgioClientInfo, useBgioG, useBgioMoves } from "bgio-contexts"

// We need this to close the popup when we click outside.
// https://stackoverflow.com/a/42234988
function useOutsideAlerter(ref, onClickOutside: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, onClickOutside])
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props: {
  onClickOutside: () => void
  children: JSX.Element | JSX.Element[]
  className?: string
}) {
  const { className, children, onClickOutside } = props

  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef, onClickOutside)

  return (
    <div {...{ className }} ref={wrapperRef}>
      {children}
    </div>
  )
}

interface ColorPickerProps {
  color: number
  onColorChange?: (number) => void
  colorAvailabilityMap: boolean[]
  disabled?: boolean
}

const ColorPicker = (props: ColorPickerProps) => {
  const { color, onColorChange, colorAvailabilityMap, disabled } = props
  const [visible, setVisible] = useState(false)

  let btnClassName = `btn gameSetupColorButton bgcolor${color}`
  if (disabled) {
    btnClassName += " gameSetupColorButtonDisabled"
  }

  return (
    <div className="colorWrap">
      <div>
        <button
          className={btnClassName}
          onClick={() => setVisible(true)}
          disabled={disabled}
        >
          {!disabled && <GiPencil />}
        </button>
      </div>
      {visible && (
        <OutsideAlerter onClickOutside={() => setVisible(false)}>
          <div className="colorPopupWrap">
            {colorAvailabilityMap.map((available, i) => {
              // Skip colors that are not available.
              if (!available) {
                return null
              }
              return (
                (available || i === color) && (
                  <button
                    className={`btn gameSetupColorButton bgcolor${i}`}
                    onClick={() => {
                      onColorChange && onColorChange(i)
                      setVisible(false)
                    }}
                    key={i}
                    tabIndex={0}
                  ></button>
                )
              )
            })}
          </div>
        </OutsideAlerter>
      )}
    </div>
  )
}

interface PlayerProps {
  moves: any
  itsMe: boolean
  playerInfo: PlayerInfo
  playerID: string
  colorAvailabilityMap: boolean[]
  passAndPlay: boolean
  isConnected: boolean
}

export const Player = (props: PlayerProps): JSX.Element => {
  const {
    moves,
    playerInfo,
    itsMe,
    playerID,
    colorAvailabilityMap,
    passAndPlay,
    isConnected,
  } = props

  const { name, color, ready } = playerInfo

  // Using an intenral state instead of only using the prop makes the changing more
  // responsive.
  const [currentName, setCurrentName] = useState(name)
  const [currentReady, setCurrentReady] = useState(ready)
  const [editingName, setEditingName] = useState(false)

  // Update the name when it changes in the server.
  useEffect(() => {
    setCurrentName(name)
  }, [name])

  // Same for the ready status.
  useEffect(() => {
    setCurrentReady(ready)
  }, [ready])

  const setReady = (ready: boolean): void => {
    // This was the simplest way to not have any effects when clicking on other player's
    // names.
    if (!itsMe) {
      return
    }

    setCurrentReady(ready)

    moves.setReady(playerID, ready)
  }

  /*
   * Set the state's `currentName` as the player's name.
   */
  const setName = (): void => {
    setEditingName(false)
    moves.setName(currentName, playerID)
    if (!passAndPlay && currentName !== name) {
      localStorage.setItem("playerName", currentName)
    }
  }

  const setColor = (color: number): void => {
    moves.setColor(color, playerID)
    if (!passAndPlay) {
      localStorage.setItem("playerColor", color.toString())
    }
  }

  let nameElement: JSX.Element

  if (itsMe && editingName) {
    nameElement = (
      <OutsideAlerter
        className="playerNameInput"
        onClickOutside={() => setName()}
      >
        <input
          type="text"
          className="form-control user-select-all"
          onChange={(e) => setCurrentName(e.target.value)}
          placeholder="Enter your name"
          maxLength={16}
          size={3}
          value={currentName}
          autoFocus={true}
          onFocus={(e) => e.target.select()}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              setName()
              return false
            }
            return true
          }}
        />
      </OutsideAlerter>
    )
  } else {
    const opts: any = {
      className: "playerName",
    }
    if (!isConnected) {
      opts.className += " playerDisconnected"
      opts.title = "Player has disconnected"
    }
    nameElement = (
      <div {...opts} onClick={(e) => !currentReady && setEditingName(true)}>
        {name}
        {!currentReady && itsMe && <GiPencil />}
      </div>
    )
  }

  const readyButton = (
    <div
      className="readyWrap pointer"
      onClick={(e) => {
        setReady(!currentReady)
      }}
    >
      <div className="readyText badge">
        {currentReady ? "Ready" : "Not Ready"}
      </div>
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input pointer"
          id={`customSwitch-${playerID}`}
          checked={currentReady}
          readOnly={true}
          onClick={(e) => {
            // Not sure how this works but it does!
            e.preventDefault()
            e.stopPropagation()
          }}
        />
        <label
          className="custom-control-label"
          htmlFor={`customSwitch-${playerID}`}
        ></label>
      </div>
    </div>
  )

  const colorPicker = (
    <ColorPicker
      color={color}
      onColorChange={(c) => setColor(c)}
      colorAvailabilityMap={colorAvailabilityMap}
      disabled={!itsMe || ready}
    />
  )

  return (
    <div className="gameSetupPlayer">
      {colorPicker}
      {nameElement}
      {!passAndPlay && readyButton}
    </div>
  )
}

interface SettingOptionProps {
  name: string
  // (value) =>
  onChange: (string) => void
  // [[value, label], ...]
  currentValue: any
  values: [any, string][]
  disabled: boolean
  // some html "id".
  id: string
}

const SettingOption = (props: SettingOptionProps) => {
  const { name, onChange, currentValue, values, disabled, id } = props
  return (
    <div className="form-group">
      <label htmlFor={id}>{name}</label>
      <select
        className="custom-select custom-select-sm"
        id={id}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        value={currentValue}
      >
        {values.map(([value, label]) => {
          return (
            <option value={value} key={value}>
              {label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

const GameSetup = () => {
  const { G } = useBgioG()
  const { moves } = useBgioMoves()
  const { matchID, matchData, playerID } = useBgioClientInfo()
  const { playerInfos, numPlayers: maxNumPlayers, passAndPlay } = G

  // Using a state is how I made the auto-focus on the start button once everyone is
  // ready possible.
  const [allReady, setAllReady] = useState(false)

  //!QRCode
  // The State:
  //   const [showQr, setShowQr] = useState(false)

  // The Toggle:
  //  <button
  //    type="button"
  //    className="btn btn-outline-dark btn-sm copyBtn"
  //    onMouseDown={(e) => {
  //      e.stopPropagation()
  //      setShowQr(!showQr)
  //    }}
  //  >
  //    QR
  //  </button>

  // THE QR JSX:
  //   const qrcode = (
  //     <OutsideAlerter onClickOutside={() => setShowQr(false)}>
  //       <div className="qrcodeWrap" onMouseDown={() => setShowQr(false)}>
  //         <QRCode className="qrcode" value={matchLink} />
  //       </div>
  //     </OutsideAlerter>
  //   )

  //   {showQr && qrcode}
  // ! End QRCode

  useEffect(() => {
    if (playerID == null) {
      return
    }
    // If it's the first time we join that game, we tell the game. It's going to assign
    // us a default name and color.

    if (!playerInfos.hasOwnProperty(playerID)) {
      // Use the name/color from localStorage if there is one.
      const playerName = localStorage.getItem("playerName")
      const playerColor = localStorage.getItem("playerColor")
      let playerColorInt: number | undefined
      if (playerColor != null) {
        playerColorInt = parseInt(playerColor)
      }
      moves.join(playerName, playerColorInt)
    }
    setAllReady(
      Object.values(playerInfos).every((info) => Boolean(info?.ready))
    )
  }, [playerInfos, moves, playerID])

  const numPlayers = Object.values(playerInfos).length
  const numFreeSpots = maxNumPlayers - Object.keys(playerInfos).length
  const matchLink = `${SERVER}/match/${matchID}`
  const imTheOwner = playerID === "0"

  const inviteHeader = !passAndPlay ? (
    <div className="gameSetupInviteWrap alert alert-primary">
      <div>
        <div className="inviteContentWrap">
          <b>Share this link to invite players</b>
          <div className="inviteLinkWrap">
            <span className="inviteLink badge badge-primary user-select-all">
              {matchLink}
            </span>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm copyBtn"
              onClick={() => navigator.clipboard.writeText(matchLink)}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null

  // In pass-and-play mode, we can edit all the player's names. What we do is we
  // auto-focus on the *first* one that is not ready.
  // In remote mode we autofocus on everything because only one will be editable
  // anyway.
  const activePlayers = Object.entries(playerInfos).map(
    ([currentPlayerID, playerInfo], i) => {
      // Find the available colors for that players, i.e. all those which are not
      // taken already.
      const colorAvailabilityMap = Array(6).fill(true)

      Object.values(playerInfos).forEach(
        (playerInfo) => (colorAvailabilityMap[playerInfo.color] = false)
      )

      return (
        <Player
          moves={moves}
          playerInfo={playerInfo}
          itsMe={passAndPlay || currentPlayerID === playerID}
          playerID={currentPlayerID}
          key={currentPlayerID}
          colorAvailabilityMap={colorAvailabilityMap}
          passAndPlay={passAndPlay}
          isConnected={
            matchData == null || matchData[currentPlayerID].isConnected
          }
        />
      )
    }
  )

  const freeSpot = numFreeSpots > 0 && (
    <div className="gameSetupPlayer gameSetupPlayerFree">
      Waiting for players to join
    </div>
  )

  const canStart = passAndPlay || (allReady && numPlayers >= 2)

  const startButton = imTheOwner && (
    <button
      className="btn btn-primary startButton"
      onClick={() => moves.startMatch()}
      // Disabled if not everyone is ready
      disabled={!canStart}
      key="last"
      ref={(input) => input && allReady && input.focus()}
    >
      {passAndPlay
        ? "Start the match!"
        : numPlayers >= 2
        ? `Start with ${numPlayers} players!`
        : "You need at least 2 players"}
    </button>
  )

  return (
    <div className="gameSetupWrap">
      {inviteHeader}
      <div className="container gameSetupContentWrapWrap">
        <div className="gameSetupContentWrap">
          <h1>Lobby</h1>
          <div className="sectionName">Players</div>
          {activePlayers}
          {freeSpot}
          <div className="sectionName">Options</div>
          {startButton}
        </div>
      </div>
    </div>
  )
}

export default GameSetup
