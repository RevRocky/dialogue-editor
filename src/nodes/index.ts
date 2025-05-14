import type { NodeTypes } from '@xyflow/react';

import { AppNode } from './types';
import { DialogueNode } from './DialogueNode';

export const nodeTypes = {
  'dialogue-node': DialogueNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;

export const START_NODE_ID = "START";

export const INITIAL_NODES: AppNode[] = [
  { id: START_NODE_ID, type: 'input', position: { x: 0, y: 0 }, data: { label: 'START' } }
]

export const TEST_NODES: AppNode[] = [
  { id: START_NODE_ID, type: 'input', position: { x: 0, y: 0 }, data: { label: 'START' } },
  { id: 'Dialogue1', type: 'dialogue-node', position: { x: 0, y: 100 }, data: { character: 'MONKEY', dialogue: "So what are you going to do?" } },
  { id: 'Dialogue2', type: 'dialogue-node', position: { x: -50, y: 200 }, data: { character: 'MONKEY', dialogue: "Really, okay. Silly billy." } },
  { id: 'Dialogue3', type: 'dialogue-node', position: { x: 50, y: 200 }, data: { character: 'MONKEY', dialogue: "Uugh you're boring." } }
]