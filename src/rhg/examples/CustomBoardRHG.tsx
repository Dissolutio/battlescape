import { StyledHexesCustom } from "./CustomBoard"
import {
  GridGenerator,
  Pattern,
  Text,
  Hex,
  RHGWrapper,
  RHGHexagon,
  RHGPath,
} from ".."

export const CustomBoardRHG = () => {
  const hexagonSize = { x: 10, y: 10 }
  const moreHexas = GridGenerator.parallelogram(-2, 2, -2, 2)
  return (
    <StyledHexesCustom>
      <RHGWrapper
        width={1200}
        height={800}
        viewBox="-50 -50 100 100"
        size={hexagonSize}
        flat={true}
        spacing={1.1}
        origin={{ x: 0, y: 0 }}
      >
        <RHGHexagon hex={new Hex(0, 0, 0)} />
        <RHGHexagon hex={new Hex(0, -1, 1)} fill="pat-1" />
        <RHGHexagon hex={new Hex(0, 1, -1)} />
        <RHGHexagon hex={new Hex(1, -1, 0)}>
          <Text>1, -1, 0</Text>
        </RHGHexagon>
        <RHGHexagon hex={new Hex(1, 0, -1)}>
          <Text>1, 0, -1</Text>
        </RHGHexagon>
        <RHGHexagon hex={new Hex(-1, 1, 0)} fill="pat-2">
          <Text>-1, 1, 0</Text>
        </RHGHexagon>
        <RHGHexagon hex={new Hex(-1, 0, 1)} />
        <RHGHexagon hex={new Hex(-2, 0, 1)} />
        <RHGPath start={new Hex(0, 0, 0)} end={new Hex(-2, 0, 1)} />
      </RHGWrapper>
      <RHGWrapper size={{ x: 2, y: 2 }} origin={{ x: 50, y: -30 }}>
        {moreHexas.map((hex, i) => (
          <RHGHexagon key={i} hex={hex} />
        ))}
        <Pattern
          id="pat-1"
          link="http://placekitten.com/100/100"
          size={hexagonSize}
        />
        <Pattern
          id="pat-2"
          link="http://placekitten.com/g/100/100"
          size={hexagonSize}
        />
        <g>
          <circle cx="50" cy="0" r="10" />
          <circle cx="50" cy="10" r="8" />
          <circle cx="45" cy="20" r="6" />
        </g>
      </RHGWrapper>
    </StyledHexesCustom>
  )
}
