"use client"
import { useEffect } from "react";
import { BroadcastToPlayers, GenerateGameOrder } from "@/app/services/GameHost";

export default function GameHost(){
    useEffect(() => {
        GenerateGameOrder();
        SendInitialNameMessage();
    }, []);
    return(
        <div>
            HOSTING
        </div>
    )
}


function SendInitialNameMessage(){
    BroadcastToPlayers("ShowLabel", {name: "Initial"});
}