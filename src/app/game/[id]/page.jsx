"use client"
import { useEffect } from "react";
import { BroadcastToPlayers, GenerateGameOrder } from "@/app/services/GameHost";
import Background from "@/app/components/Background";

export default function GameHost(){
    useEffect(() => {
        GenerateGameOrder();
        SendInitialNameMessage();
    }, []);
    return( 
        <Background>
            <div>
                HOSTING
            </div>
        </Background>

    )
}


function SendInitialNameMessage(){
    BroadcastToPlayers("ShowLabel", {name: "Initial"});
}