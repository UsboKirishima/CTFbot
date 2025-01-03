export interface Partecipant {
    id: string;
    solves: Solve[];
    event: CTFEvent;
}

export interface Solve {
    author: Partecipant;
    name: string;
    flag: string;
    isFirstBlood: boolean;
    time: Date;
    event: CTFEvent;
}

export interface CTFEvent {
    guildId: string;
    partecipants: Partecipant[];
    solves: Solve[];
    channelId: string;
    roleId: string;
}