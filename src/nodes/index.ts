import type { NodeTypes } from '@xyflow/react';

import { AppNode } from './types';
import { DialogueNode } from './DialogueNode';

export const nodeTypes = {
  'dialogue-node': DialogueNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;


export const INITIAL_NODES: AppNode[] = [
  { id: 'START', type: 'input', position: { x: 0, y: 0 }, data: { label: 'START' } }
]

