import React from "react"

type HexGridProps = {
  children?: React.ReactNode
  viewBox?: string
  width?: string | number
  height?: string | number
}

export const HexGrid = (props: HexGridProps) => {
  const {
    children,
    viewBox = "-50 -50 100 100",
    width = 800,
    height = 600,
  } = props
  return (
    <svg
      className="grid"
      width={width}
      height={height}
      viewBox={viewBox}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}
