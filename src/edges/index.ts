import type { Edge, EdgeTypes } from '@xyflow/react';
import { ChoiceEdge } from './ChoiceEdge';

export const INITIAL_EDGES: Edge[] = [
];

export const TEST_EDGES: Edge[] = [
  {id: 'init', type: 'straight', source: 'START', target: 'Dialogue1'},
  {id: 'choice-1', type: 'choice', source: 'Dialogue1', target: 'Dialogue2', data: {label: "Idk sit here idily"}},
  {id: 'choice-2', type: 'choice', source: 'Dialogue1', target: 'Dialogue3', data: {label: "Give up I guess."}}
]

export const edgeTypes = {
  'choice': ChoiceEdge
} satisfies EdgeTypes;
