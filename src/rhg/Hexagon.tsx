import React from "react"
import { useHexgridLayoutContext } from "./HexgridLayout"
import { Hex } from "./models"
import { HexUtils } from "./HexUtils"

export type HexagonProps = {
  children?: React.ReactNode
  q: number
  r: number
  s: number
  fill?: string
  cellStyle?: {}
  className?: string
  data?: {}
  onMouseEnter?: React.MouseEventHandler<HTMLOrSVGElement>
  onMouseOver?: React.MouseEventHandler<HTMLOrSVGElement>
  onMouseLeave?: React.MouseEventHandler<HTMLOrSVGElement>
  onClick?: React.MouseEventHandler<HTMLOrSVGElement>
  onDragStart?: React.DragEventHandler<HTMLOrSVGElement>
  onDragEnd?: React.DragEventHandler<HTMLOrSVGElement>
  onDragOver?: React.DragEventHandler<HTMLOrSVGElement>
  onDrop?: React.DragEventHandler<HTMLOrSVGElement>
}

export const Hexagon = (props: HexagonProps) => {
  const {
    children,
    q,
    r,
    s,
    fill,
    cellStyle,
    className,
    data,
    onMouseEnter,
    onMouseOver,
    onMouseLeave,
    onClick,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
  } = props
  const { layout, points } = useHexgridLayoutContext()
  const hex: Hex = { q, r, s }
  const pixel = HexUtils.hexToPixel(hex, layout)
  const fillId = fill ? `url(#${fill})` : null
  return (
    <g
      className={`hexagon-group ${className}`}
      transform={`translate(${pixel.x}, ${pixel.y})`}
      onMouseEnter={onMouseEnter ? (e) => onMouseEnter(e) : null}
      onMouseOver={onMouseOver ? (e) => onMouseOver(e) : null}
      onMouseLeave={onMouseLeave ? (e) => onMouseLeave(e) : null}
      onClick={onClick ? (e) => onClick(e) : null}
      onDragStart={onDragStart ? (e) => onDragStart(e) : null}
      onDragEnd={onDragEnd ? (e) => onDragEnd(e) : null}
      onDragOver={onDragOver ? (e) => onDragOver(e) : null}
      onDrop={onDrop ? (e) => onDrop(e) : null}
    >
      <g className="hexagon">
        <polygon points={points} fill={fillId} style={cellStyle} />
        {children}
      </g>
    </g>
  )
}
