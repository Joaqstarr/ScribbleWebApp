import { SubscribeToChannel } from "./ChannelActions";

const Players = [];

export function CreateLobby(UUID){


    const OnSubcribed = ({channel }) => {
        console.log("subscribed to " + UUID)
        channel.on(
            'broadcast', 
            {event: "join"}, 
            (payload) => {
                const joinedPlayer = {name: payload.payload.name}
                Players.push(channel, joinedPlayer);

                console.log("Players: " + JSON.stringify(Players));

            }
        )
    }

    const GetPlayers = () => {
        return Players;
    }
    

    SubscribeToChannel(UUID, OnSubcribed);
    
    return {
        RetrievePlayers: GetPlayers,
    }

}

