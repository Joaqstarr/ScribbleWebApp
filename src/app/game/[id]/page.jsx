"use client"
import { useEffect } from "react";
import { GetPlayers, BroadcastToPlayers } from "@/app/services/GameHost";

export default function GameHost(){
    useEffect(() => {
        const ConnectedPlayers = GetPlayers();
        SendInitialNameMessage(ConnectedPlayers);
    }, []);
    return(
        <div>
            HOSTING
        </div>
    )
}


function SendInitialNameMessage(players){
    BroadcastToPlayers("ShowLabel", {name: "Initial"});
}