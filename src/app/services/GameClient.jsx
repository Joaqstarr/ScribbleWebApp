import { SubscribeToChannel } from "./ChannelActions";


export function JoinLobby(UUID, Username){



    const OnSubcribed = ({channel }) => {

        console.log("Sending broadcast for " + UUID);
        channel.send({
            type: 'broadcast',
            event: 'join',
            payload: {name: Username}
        })
    }

    SubscribeToChannel(UUID, OnSubcribed);
    
}