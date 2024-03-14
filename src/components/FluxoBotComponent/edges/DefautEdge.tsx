import { BaseEdge, EdgeProps, getSmoothStepPath } from 'reactflow';


export function DefautEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, markerStart }: EdgeProps) {
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const lineStyle = {
        stroke: '#FF5733', // Altere a cor da linha aqui
        strokeWidth: 2,
    };
    const arrowStyle = {
        fill: '#FF5733', // Altere a cor da seta aqui
    };
    return (
        <>
            {/* <line
                x1={sourceX}
                y1={sourceY}
                x2={targetX}
                y2={targetY}
                style={{ ...lineStyle, ...style }}
            />

            <marker
                id={`marker-${id}`}
                viewBox="0 -5 10 10"
                refX="10"
                refY="0"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
            >
                <path
                    d="M0,-5L10,0L0,5"
                    style={arrowStyle}
                />
            </marker> */}
            <path
                id={id}
                type='smoothstep'
                className='react-flow__edge-path'
                d={edgePath}
                style={style}
                markerEnd={markerEnd}
                markerStart={markerStart}
            />
        </>
    );
}
