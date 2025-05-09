import type { Node, BuiltInNode } from '@xyflow/react';

export type DialogueNode = Node<{character: string, dialogue: string}, 'dialogue-node'>
export type AppNode = BuiltInNode | DialogueNode;

export type TextNodeProps = {
    character: string,      // TODO: Make this an enum.
    dialogue: string
}