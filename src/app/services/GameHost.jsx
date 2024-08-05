import { SubscribeToChannel, ListenToEvent, BroadcastEvent } from "./ChannelActions";

const Players = [];
let SavedChannel = null;
export function CreateLobby(UUID){


    const OnSubcribed = ({channel }) => {
        console.log("subscribed to " + UUID)
        SavedChannel = channel;
        ListenToEvent(channel, "join", OnPlayerJoin);
        ListenToEvent(channel, "submitDrawing", OnPlayerSubmitDrawing);
        ListenToEvent(channel, "submitLabel", OnPlayerSubmitLabel)

    }


    

    SubscribeToChannel(UUID, OnSubcribed);
    
    return {
        RetrievePlayers: GetPlayers,
    }

}


export function GetPlayers(){
    return Players;
}

function OnPlayerJoin(payload){
    const playerName = payload.payload.name;
    const joinedPlayer = {name: playerName,}
    Players.push(joinedPlayer);

    console.log("Players: " + JSON.stringify(Players));
}

function OnPlayerSubmitDrawing(payload){
    console.log(payload.payload.name +" submitted drawing.");
}

function OnPlayerSubmitLabel(payload){
    console.log(payload.payload.name +" submitted label.");
}

export function BroadcastToPlayers(eventName, payload){
    if(SavedChannel == null){
        console.log("No Channel Recognized.");
        return;
    }
    BroadcastEvent(SavedChannel, eventName, payload);
}

export function BroadcastToPlayer(playerName, eventName, payload){
    const event = playerName + eventName;
    BroadcastToPlayer(event, payload);
}