import React, { MouseEvent, useEffect } from 'react';
import { Container } from "./style";
import ReactFlow, { Background, ConnectionMode, Controls, Node, NodeMouseHandler } from 'reactflow';
import 'reactflow/dist/style.css';

interface FluxoBotComponentProps {
    NODE_TYPES: any;
    EDGE_TYPES: any;
    edges: any[];
    nodes: any[];
    onEdgesChange: (edges: any[]) => void;
    onConnect: (params: any) => void;
    onNodesChange: (nodes: any[]) => void;
    openConfig: (event: MouseEvent, node: Node) => void;
    children: any;
}

export function FluxoBotComponent({ NODE_TYPES, EDGE_TYPES, edges, nodes, onEdgesChange, onConnect, onNodesChange, openConfig, children }: FluxoBotComponentProps) {

    const handleNodeClick: NodeMouseHandler = (event: any, node: any) => {
        openConfig(event, node);
    };

    useEffect(() => { }, [edges])

    return (
        <Container>
            {children}
            <ReactFlow
                nodeTypes={NODE_TYPES}
                edgeTypes={EDGE_TYPES}
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodesChange={onNodesChange}
                connectionMode={ConnectionMode.Loose}
                onNodeClick={handleNodeClick}
                defaultEdgeOptions={{
                    type: 'default'
                }}
            >
                <Background
                    gap={12}
                    size={1}
                    color='#ccc'
                />
                <Controls />
            </ReactFlow>
        </Container>
    );
}
