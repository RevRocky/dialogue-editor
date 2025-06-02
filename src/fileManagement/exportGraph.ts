import { Edge, getConnectedEdges } from "@xyflow/react";
import { AppNode, DialogueNode } from "../nodes/types";
import { START_NODE_ID } from "../nodes";
import { Dialogue } from "../utils/types";
import { ipcRenderer } from "electron";


function getNodeById(targetId: string, nodes: AppNode[]) {
    return nodes.filter(node => node.id === targetId)[0];
}

export function exportGraph(nodes: AppNode[], edges: Edge[]) {
    let exportedDialogue: Record<string, Dialogue> = {};

    // TODO: Figure out if we can we just assume start is at pos 0 of nodes
    const startNode = nodes.filter(node => node.id === START_NODE_ID);

    const initialEdge = getConnectedEdges(startNode, edges)[0];
    
    // Recursively explore each edge
    function exploreEdge(edge: Edge) {
        let destinationNode = getNodeById(edge.target, nodes);

        // Some rudimentery error handling. We only expect to get 
        // dialogue nodes, at least in version one however. 
        if (destinationNode.type !== "dialogue-node") {
            // TODO: Create a toast to display this...
            console.error(`File export has failed. Node with id: ${destinationNode.id} is not a "Dialogue Node"`);
            console.error('Aborting export...');
            throw new Error('File export failed...');
        }
        // Implicit else: we have a dialogue node
        destinationNode = destinationNode as DialogueNode;

        let dialogue: Dialogue = {
            character: destinationNode.data.character,
            dialogue: destinationNode.data.dialogue
        }

        // The number of connections will tell us how to proceed...
        const outgoingEdges = getConnectedEdges([destinationNode], edges).filter(edge => edge.source === destinationNode.id);

        switch(outgoingEdges.length) {
            case 0:
                // We're done exploring this path
                exportedDialogue[destinationNode.id] = dialogue;
                return;
            case 1:
                // Follow that single connection where it leads but first
                exportedDialogue[destinationNode.id] = {
                    ...dialogue,
                    next: outgoingEdges[0].target
                }

                exploreEdge(outgoingEdges[0]);
                return;
            default: 
                console.log("MROW")
                dialogue.choices = []
                for (const edge of outgoingEdges) {
                    if (edge.type !== 'choice') {
                        console.error(`File export has failed. Edge with id: ${edge.id} is not a "Choice Edge"`);
                        console.error('Aborting export...');
                        throw new Error('File export failed...');
                    }

                    

                    // Implicit else: we have a choice edge
                    dialogue.choices.push({
                        text: edge?.data?.label as string,
                        next: edge.target
                    })

                    // And we must explore it
                    exploreEdge(edge);
                }

                // Is this right ? 
                exportedDialogue[destinationNode.id] = dialogue;
                return;
        }
    }

    exploreEdge(initialEdge);

    ipcRenderer.send("export", {
        payload: {
            dialogue: JSON.stringify(exportedDialogue)
        }
    })

}
