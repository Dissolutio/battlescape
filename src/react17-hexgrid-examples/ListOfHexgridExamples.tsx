import { BasicBoard } from "./BasicBoard"
import { CustomBoard } from "./CustomBoard"
import { PathfindingBoard } from "./PathfindingBoard"
import { PatternSwapBoard } from "./PatternSwapBoard"
import { TemplatesBoard } from "./TemplatesBoard"

export const ListOfHexgridExamples = () => {
  return (
    <div>
      <h2>BasicBoard</h2>
      <BasicBoard />

      <h2>CustomBoard</h2>
      <CustomBoard />

      <h2>PathfindingBoard</h2>
      <PathfindingBoard />

      <h2>TemplatesBoard</h2>
      <TemplatesBoard />

      <h2>PatternSwapBoard</h2>
      <PatternSwapBoard />
    </div>
  )
}
