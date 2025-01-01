declare interface Partecipant {
    id: string;
    solves: Solve[];
}

declare interface Solve {
    author: Partecipant; 
    name: string;
    flag: string;
    isFirstBlood: boolean;
    time: Date;
}

declare interface CTFEvent {
    partecipants: Partecipant[];
    solves: Solve[];
}