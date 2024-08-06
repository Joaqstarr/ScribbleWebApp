"use client"
import { useEffect, useState } from "react";
import { Label } from "@/app/components/Label";
import { SubmitLabel } from "@/app/services/GameClient";

export default function GamePage(){
    let [gameState, setGameState] = useState("wait");

    useEffect(() => {
        addEventListener("ShowLabel", (event) => {
            setGameState("label");
        }, false);
    },[]);



    const handleLabeled = (formData) => {
        SubmitLabel(formData.get("prompt"));
    }


    switch(gameState) {
        case "wait":
            return (<p>Waiting....</p>);
        case "label":
            return (<Label callback={handleLabeled}/>);
        default:
            return (<p>Waiting....</p>);
    }
}
