import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  ControlButton,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { INITIAL_NODES, nodeTypes, TEST_NODES } from './nodes';
import { INITIAL_EDGES, TEST_EDGES, edgeTypes } from './edges';
import { exportGraph } from './fileManagement/exportGraph';
import { DownloadIcon } from '@radix-ui/react-icons';

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(TEST_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(TEST_EDGES);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <MiniMap />
      <Controls >
        <ControlButton onClick={() => exportGraph(nodes, edges)}>
          <DownloadIcon/>
        </ControlButton>
      </Controls>

    </ReactFlow>
  );
}
