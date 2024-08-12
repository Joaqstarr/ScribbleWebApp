"use client"
import { useEffect, useState } from "react";
import { Label } from "@/app/components/Label";
import { SubmitLabel } from "@/app/services/GameClient";
import { Draw } from "@/app/components/Draw";


export default function GamePage(){
    const [gameState, setGameState] = useState("wait");
    const [label, setLabel] = useState("");

    useEffect(() => {
        addEventListener("ShowLabel", (event) => {
            setGameState("label");
        }, false);
        addEventListener("ShowDraw", (event) => {
            setGameState("draw"); 
            setLabel(event.label);
        }, false);
    },[]);



    const handleLabeled = (formData) => {
        SubmitLabel(formData.get("prompt"));
    }
    return (
        <div className="h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full h-screen flex justify-center ">
            <SwitchContentOnState state={gameState} />
        </div>
    )


}

function SwitchContentOnState(state){
    switch(state) {
        case "wait":
            return (<p>Waiting....</p>);
        case "label":
            return (<Label callback={handleLabeled}/>);
        case "draw":
            return (<Draw label={label}/>);
        default:
            return (<p>Waiting....</p>);
    }
}
