import { BasicBoard } from "./BasicBoard"
import { BasicBoardRHG } from "./BasicBoardRHG"
import { CustomBoard } from "./CustomBoard"
import { CustomBoardRHG } from "./CustomBoardRHG"
import { PathfindingBoard } from "./PathfindingBoard"
import { PatternSwapBoard } from "./PatternSwapBoard"
import { TemplatesBoard } from "./TemplatesBoard"

export const ListOfHexgridExamples = () => {
  return (
    <div>
      <h1>Firstly, the one wrapper RHG versions</h1>

      <h2>BasicBoardRHG</h2>
      <BasicBoardRHG />

      <h2>CustomBoardRHG</h2>
      <CustomBoardRHG />

      <h1>Secondly, the two wrapper versions</h1>
      <p>
        Notice how the two custom boards are different, the efficacy of
        wrapper+layout, not just 1 wrapper.
      </p>
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
