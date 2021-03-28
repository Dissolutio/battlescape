import React from "react"
import { BasicBoard } from "./BasicBoard"
import { CustomBoard } from "./CustomBoard"
import { DragNDropBoard } from "./DragNDropBoard"
import { PathfindingBoard } from "./PathfindingBoard"
import { PatternSwapBoard } from "./PatternSwapBoard"
import { TemplatesBoard } from "./TemplatesBoard"

export const ListOfHexgridExamples = () => {
  return (
    <div>
      <h1>BasicBoard</h1>
      <BasicBoard />
      <h1>TemplatesBoard</h1>
      <TemplatesBoard />
      <h1>PatternSwapBoard</h1>
      <PatternSwapBoard />
      <h1>PathfindingBoard</h1>
      <PathfindingBoard />
      <h1>DragNDropBoard</h1>
      <p>This one needs a lotta love, does not work</p>
      <DragNDropBoard />
      <h1>CustomBoard</h1>
      <CustomBoard />
    </div>
  )
}
