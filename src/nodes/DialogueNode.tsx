import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { TextNodeProps } from './types';
 


export function DialogueNode(data: any) {

    const props = data.data as TextNodeProps;

    const [character, setCharacter] = useState(props.character)
    const [dialogue, setDialogue] = useState(props.dialogue);
    
    return (
        <>
        <Handle type="target" position={Position.Top} id="top" />
        <div className='react-flow__node-default'>
            <label htmlFor='input-character'>Character:</label>
            <input
                id="input-character"
                name="input-character"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
            />
            <label htmlFor="input-dialogue">Dialogue:</label>
            <textarea
                id="input-dialogue" 
                name="input-dialogue" 
                value={dialogue}
                onChange={(e) => setDialogue(e.target.value)}
                className="nodrag" />
        </div>
        <Handle type="source" position={Position.Bottom} id="bottom" />
        </>
    );
}