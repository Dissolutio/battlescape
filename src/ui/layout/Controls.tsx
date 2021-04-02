import { useBgioCtx, useBgioMoves, useBgioEvents } from "bgio-contexts";

export const Controls = () => {
  const { ctx } = useBgioCtx();
  const { isMyTurn } = ctx;
  const { moves, undo, redo } = useBgioMoves();
  const { events } = useBgioEvents();
  return isMyTurn ? (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <button onClick={undo}>UNDO</button>
      <button onClick={redo}>REDO</button>
    </div>
  ) : (
    <div>NOT YOUR TURN</div>
  );
};
