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
  ReactFlowJsonObject,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { nodeTypes, TEST_NODES } from './nodes';
import { TEST_EDGES, edgeTypes } from './edges';
import { exportGraph } from './fileManagement/exportGraph';
import { DiscIcon, DownloadIcon, PlusCircledIcon, ReaderIcon } from '@radix-ui/react-icons';
import { createNewDialogueNode } from './nodes/DialogueNode';
import { AppNode, DialogueNode } from './nodes/types';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(TEST_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(TEST_EDGES);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const { addNodes, screenToFlowPosition, updateEdge, setViewport, getViewport } = useReactFlow();

  interface OpenFileMessage {
    graph: string
  }

  // When a file is opened we update the nodes and edges to reflect that
  //@ts-expect-error typescript
  window.api.on("file-opened", (message: OpenFileMessage) => {
    const graph = JSON.parse(message.graph) as ReactFlowJsonObject;

    setNodes(graph.nodes as AppNode[]);
    setEdges(graph.edges);
    setViewport(graph.viewport);
  })

  function saveFile() {
    const graph: ReactFlowJsonObject = {
      nodes: nodes,
      edges: edges,
      viewport: getViewport()
    }

    //@ts-expect-error typescript
    window.api.send("export", {
      payload: {
        dialogue: JSON.stringify(graph)
      }
    });
  }

  function triggerOpenFile() {
    //@ts-expect-error typescript
    window.api.send("open", {});
  }

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
        <ControlButton title="Save to Disk" onClick={() => saveFile()}>
          <DiscIcon/>
        </ControlButton>
        <ControlButton title="Open File" onClick={() => triggerOpenFile()}>
          <ReaderIcon/>
        </ControlButton>
      </Controls>

    </ReactFlow>
  );
}
