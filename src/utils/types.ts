// Maybe this can be turned into a dependency for the game?
export type Choice = {
    text: string,
    next: string
}

export type Dialogue = {
    character: string,
    dialogue: string,
    choices?: Choice[]  
    next?: string   
}

export type Start = {
    next: string
}