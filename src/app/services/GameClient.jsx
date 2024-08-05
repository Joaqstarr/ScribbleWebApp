import { SubscribeToChannel, ListenToEvent , BroadcastEvent} from "./ChannelActions";


export function JoinLobby(UUID, Username){



    const OnSubcribed = ({channel }) => {
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

}
function OnShowLabel(payload){

}

function OnShowInitialLabel(payload){
    console.log("Showing " +payload.payload.name + " label");

    const event = new Event("ShowLabel");
    dispatchEvent(event);
}