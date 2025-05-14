import { Edge, getConnectedEdges } from "@xyflow/react";
import { AppNode } from "../nodes/types";
import { START_NODE_ID } from "../nodes";
import { Dialogue } from "../utils/types";




export function exportGraph(nodes: AppNode[], edges: Edge[]) {
    let exportedDialogue: Record<string, Dialogue> = {};

    // TODO: Figure out if we can we just assume start is at pos 0 of nodes
    const startNode = nodes.filter(node => node.id === START_NODE_ID);

    const initialEdge = getConnectedEdges(startNode, edges)[0];
    
    // Recursively explore each edge
    function exploreEdge(edge: Edge) {

    }

    const initialDialogueNode = nodes.filter(node => node.id === initialEdge.target);
}
