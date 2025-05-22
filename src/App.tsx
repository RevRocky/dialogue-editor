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
  useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { INITIAL_NODES, nodeTypes, TEST_NODES } from './nodes';
import { INITIAL_EDGES, TEST_EDGES, edgeTypes } from './edges';
import { exportGraph } from './fileManagement/exportGraph';
import { DownloadIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { createNewDialogueNode } from './nodes/DialogueNode';
import { DialogueNode } from './nodes/types';

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(TEST_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(TEST_EDGES);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const { addNodes, screenToFlowPosition } = useReactFlow();

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
        <ControlButton onClick={() => {
          const viewport = document.querySelector('.react-flow') as Element;
          const boundingRect = viewport.getBoundingClientRect();

          const centre = screenToFlowPosition({
            x: boundingRect.x + boundingRect.width / 2,
            y: boundingRect.y + boundingRect.height / 2,
          })

          const newNode = createNewDialogueNode(centre.x, centre.y);
          addNodes(newNode as DialogueNode)
        }}>
          <PlusCircledIcon/>
        </ControlButton>
        <ControlButton onClick={() => exportGraph(nodes, edges)}>
          <DownloadIcon/>
        </ControlButton>
      </Controls>

    </ReactFlow>
  );
}
