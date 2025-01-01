export const getPartecipantBySolve = (solve: Solve) => {
    return solve.author
}

export const getSolvesByPartecipant = (partecipant: Partecipant) => {
    return partecipant.solves
}

export const getPartecipantByUserID = (userID: string, CTFEvent: CTFEvent): Partecipant | undefined => {
    return CTFEvent.partecipants.find(p => p.id === userID);
}