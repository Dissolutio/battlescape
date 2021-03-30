import {
  GiBee,
  GiWaspSting,
  GiCrown,
  GiButterfly,
  GiFairyWings,
  GiWingedEmblem,
} from "react-icons/gi"

export const playerIconColors = {
  0: "var(--bee-yellow)",
  1: "var(--butterfly-purple)",
}
type UnitIconProps = {
  playerID?: string
  hexSize?: number
  iconProps?: {
    x: string
    y: string
  }
}
export const UnitIcon = ({ hexSize, iconProps, playerID }: UnitIconProps) => {
  const iconSize = hexSize || 10
  const iconXShift = iconSize / -2
  const iconYShift = iconSize / -1.5

  const gameIconProps = {
    x: iconProps?.x ?? `${iconXShift}px`,
    y: iconProps?.x ?? `${iconYShift}px`,
    style: {
      fill: `${playerIconColors?.[playerID] ?? "var(--white)"}`,
      fontSize: iconProps?.x ?? `${iconSize}px`,
    },
  }
  return <GiButterfly {...gameIconProps} />
}
