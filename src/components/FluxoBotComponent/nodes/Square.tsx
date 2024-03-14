import { Position } from "reactflow";
import { StyledSquare, StyledHandle } from './styles'

export type NodeProps<T = any> = {
    id: string;
    data: T;
    dragHandle?: boolean;
    type?: string;
    selected?: boolean;
    isConnectable?: boolean;
    zIndex?: number;
    xPos: number;
    yPos: number;
    dragging: boolean;
    targetPosition?: Position;
    sourcePosition?: Position;
};

export function Square({ data, selected }: NodeProps) {
    return (
        <>
            <StyledSquare>
                <div className={selected ? 'active' : ''}>
                    {data.label}
                </div>
            </StyledSquare>
            <StyledHandle
                id="right"
                type="source"
                position={Position.Right}
            />
            <StyledHandle
                id="left"
                type="source"
                position={Position.Left}
            />
            {/* <StyledHandle
                id="top"
                type="source"
                position={Position.Top}
            />
            <StyledHandle
                id="bottom"
                type="source"
                position={Position.Bottom}
            /> */}
        </>
    )
}