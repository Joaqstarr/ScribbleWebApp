import { SubscribeToChannel, ListenToEvent , BroadcastEvent} from "./ChannelActions";

let SavedUsername = "";
let SavedChannel = null;
export function JoinLobby(UUID, Username){

    SavedUsername = Username;

    const OnSubcribed = ({channel }) => {
        SavedChannel = channel;
        SubscribeToEvents(channel, Username);
        BroadcastEvent(channel, 'join', {name: Username});
    }

    SubscribeToChannel(UUID, OnSubcribed);
    
}

function SubscribeToEvents(channel, username){
    ListenToEvent(channel, username+"ShowDrawing", OnShowDrawing);
    ListenToEvent(channel, username+"ShowLabel", OnShowLabel);
    ListenToEvent(channel, "ShowLabel", OnShowInitialLabel);
    

}

function OnShowDrawing(payload){
    const event = new Event("ShowDraw");
    event.label = payload.payload.label;
    dispatchEvent(event);

}
function OnShowLabel(payload){
}

function OnShowInitialLabel(payload){
    const event = new Event("ShowLabel");
    dispatchEvent(event);
}

export function SubmitLabel(Label){
    BroadcastEvent(SavedChannel, 'submitLabel', {name: SavedUsername, label: Label});
}