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
  Edge,
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

  const { addNodes, screenToFlowPosition, updateEdge } = useReactFlow();

  function toggleEdgeType(_event: unknown, edge: Edge) {
    // For now we keep it simple. Toggle edges between a 'straight' edge
    // which doesnt reflect a users choice, or a choice edge which does reflect
    // a users choice.
    if (edge.type !== 'choice') {
      updateEdge(edge.id, {
        type: 'choice',
        data: {
          label: ''
        }
      });
    }
    else {
      updateEdge(edge.id, {
        type: 'bezier',
        data: {}
      })
    }
  }

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgeDoubleClick={toggleEdgeType}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <MiniMap />
      <Controls >
        <ControlButton title="Add Dialogue Node" onClick={() => {
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
        <ControlButton title="Export to JSON" onClick={() => exportGraph(nodes, edges)}>
          <DownloadIcon/>
        </ControlButton>
      </Controls>

    </ReactFlow>
  );
}
