import { Handle, Position, useReactFlow } from '@xyflow/react';
import { TextNodeProps } from './types';
 
export function createNewDialogueNode(posX: number, posY: number) {

    return {
     id: crypto.randomUUID(),
     type: 'dialogue-node', 
     position: { x: posX, y: posY }, 
     data: { 
        character: '', 
        dialogue: '' 
    }
    }

}


export function DialogueNode(nodeData: any) {
    
    const id = nodeData.id;
    const props = nodeData.data as TextNodeProps;
    const { updateNodeData } = useReactFlow();

    return (
        <>
        <Handle type="target" position={Position.Top} id="top" />
        <div className='react-flow__node-default'>
            <label htmlFor='input-character'>Character:</label>
            <input
                id="input-character"
                name="input-character"
                value={props.character}
                onChange={(e) => updateNodeData(id, {
                    character: e.target.value
                })}
            />
            <label htmlFor="input-dialogue">Dialogue:</label>
            <textarea
                id="input-dialogue" 
                name="input-dialogue" 
                value={props.dialogue}
                onChange={(e) => updateNodeData(id, {
                   dialogue: e.target.value
                })}
                className="nodrag" />
        </div>
        <Handle type="source" position={Position.Bottom} id="bottom" />
        </>
    );
}