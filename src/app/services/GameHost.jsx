import { SubscribeToChannel, ListenToEvent, BroadcastEvent } from "./ChannelActions";

const Players = [];
let SavedChannel = null;
let Round = 1;


export function CreateLobby(UUID){
    Round = 1;

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

export function GenerateGameOrder(){
    if(Players.length <= 1) return;

    for(let i = 0; i < Players.length; i++){
        Players.at(i).next = Players.at((i+1) % Players.length);
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


    const event = new Event("PlayerJoined");
    event.name = playerName;
    dispatchEvent(event);
}

function OnPlayerSubmitDrawing(payload){
    console.log(payload.payload.name +" submitted drawing.");
}
function OnPlayerSubmitLabel(payload){
    const player = GetPlayerByUsername(payload.payload.name);
    const propertyName = Round+"Label";
    if(player != undefined){
        player[propertyName] = payload.payload.label;
    }
    if(AllPlayersHaveProp(propertyName)){
        SendPromptsToPlayers();
    }

}


function SendPromptsToPlayers(){
    for(let i = 0; i < Players.length; i++){
        const playerToSendTo = Players.at(i).next;
        const promptProperty = Round + "Label";
        const playerLabel = Players.at(i)[promptProperty];

        BroadcastToPlayer(playerToSendTo.name ,"ShowDrawing", {label: playerLabel});
    }
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
    BroadcastToPlayers(event, payload);
}

function GetPlayerByUsername(playerName){
    var result = Players.find(obj => {
        return obj.name === playerName
      })
    return result;
}

function AllPlayersHaveProp(prop){
    for(let i = 0; i < Players.length; i++){
        if(Players.at(i)[prop] == null)
            return false;
    }
    return true;
}