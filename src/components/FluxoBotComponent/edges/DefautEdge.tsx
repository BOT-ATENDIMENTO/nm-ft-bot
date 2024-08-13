import { EdgeProps, getSmoothStepPath } from "reactflow";

export function DefautEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  markerStart,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        type="smoothstep"
        className="react-flow__edge-path"
        d={edgePath}
        style={style}
        markerEnd={markerEnd}
        markerStart={markerStart}
      />
    </>
  );
}
