import { BasicBoard } from "./BasicBoard"
import { CustomBoard } from "./CustomBoard"
import { PathfindingBoard } from "./PathfindingBoard"
import { PatternSwapBoard } from "./PatternSwapBoard"
import { TemplatesBoard } from "./TemplatesBoard"

export const ListOfHexgridExamples = () => {
  return (
    <div>
      <h1>PathfindingBoard</h1>
      <PathfindingBoard />

      <h1>BasicBoard</h1>
      <BasicBoard />

      <h1>CustomBoard</h1>
      <CustomBoard />

      <h1>TemplatesBoard</h1>
      <TemplatesBoard />

      <h1>PatternSwapBoard</h1>
      <PatternSwapBoard />
    </div>
  )
}
