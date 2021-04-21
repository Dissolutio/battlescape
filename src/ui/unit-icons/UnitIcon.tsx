import React from 'react'
import { GiAlienBug, GiAlienStare, GiAngelOutfit, GiArcher, GiCaptainHatProfile, GiDinosaurRex, GiGlock, GiLeeEnfield, GiMissileMech, GiNinjaArmor, GiSpikedDragonHead, GiSpy, GiVikingHead, GiVikingHelmet, GiVikingShield, GiVintageRobot } from 'react-icons/gi'

import { playerColors } from 'theme'

type UnitIconProps = {
  armyCardID: string
  iconPlayerID?: string
  hexSize?: number
  iconProps?: {
    x: string
    y: string
  }
}
export const UnitIcon: React.FC<UnitIconProps> = ({
  armyCardID,
  hexSize,
  iconProps,
  iconPlayerID,
}) => {
  if (!armyCardID) {
    return null
  }

  const iconSize = hexSize || 10
  const iconXShift = iconSize / -2
  const iconYShift = iconSize / -1.5

  const gameIconProps = {
    x: iconProps?.x ?? `${iconXShift}px`,
    y: iconProps?.x ?? `${iconYShift}px`,
    style: {
      fill: `${playerColors?.[iconPlayerID] ?? 'var(--white)'}`,
      fontSize: iconProps?.x ?? `${iconSize}px`,
    },
  }

  switch (armyCardID) {
    case 'hs1000':
      return <GiAlienBug {...gameIconProps} />
    case 'hs1001':
      return <GiMissileMech {...gameIconProps} />
    case 'hs1002':
      return <GiNinjaArmor {...gameIconProps} />
    case 'hs1003':
      return <GiCaptainHatProfile {...gameIconProps} />
    case 'hs1004':
      return <GiArcher {...gameIconProps} />
    case 'hs1005':
      return <GiGlock {...gameIconProps} />
    case 'hs1006':
      return <GiVikingHelmet {...gameIconProps} />
    case 'hs1007':
      return <GiSpy {...gameIconProps} />
    case 'hs1008':
      return <GiVintageRobot {...gameIconProps} />
    case 'hs1009':
      return <GiLeeEnfield {...gameIconProps} />
    case 'hs1010':
      return <GiVikingHead {...gameIconProps} />
    case 'hs1011':
      return <GiVikingShield {...gameIconProps} />
    case 'hs1012':
      return <GiAngelOutfit {...gameIconProps} />
    case 'hs1013':
      return <GiSpikedDragonHead {...gameIconProps} />
    case 'hs1014':
      return <GiAlienStare {...gameIconProps} />
    case 'hs1015':
      return <GiDinosaurRex {...gameIconProps} />
    default:
      return null
  }
}

export const CardUnitIcon = ({ unit }) => {
  return (
    <UnitIcon
      armyCardID={unit.cardID}
      iconPlayerID={unit.playerID}
      iconProps={{
        x: '50',
        y: '50',
      }}
    />
  )
}
