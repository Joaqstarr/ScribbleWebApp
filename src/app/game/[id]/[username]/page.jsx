"use client"
import { useEffect, useState } from "react";
import { Label } from "@/app/components/Label";
import { SubmitLabel, SubmitImage } from "@/app/services/GameClient";
import { Draw } from "@/app/components/Draw";
import Background from "@/app/components/Background";

export default function GamePage(){
    const [gameState, setGameState] = useState("wait");
    const [label, setLabel] = useState("");
    const [shownImage, setShownImage] = useState("");
    useEffect(() => {
        addEventListener("ShowLabel", (event) => {
            setGameState("label");
            if(event.image != null){
                setShownImage(event.image);
            }else{
                setShownImage("");
            }

        }, false);
        addEventListener("ShowDraw", (event) => {
            setGameState("draw"); 
            setLabel(event.label);
        }, false);
    },[]);



    const handleLabeled = (formData) => {
        setGameState("wait");

        SubmitLabel(formData.get("prompt"));
    }

    const handleSubmittedDrawing = (imageSVG) => {
        setGameState("wait");
        SubmitImage(imageSVG);
    }
    return (
        <Background>
            <SwitchContentOnState state={gameState} submitLabel={handleLabeled} submitImage={handleSubmittedDrawing} chosenLabel={label} chosenImage={shownImage}/>
        </Background>
    )


}

function SwitchContentOnState({state, submitLabel, submitImage, chosenLabel, chosenImage}){
    switch(state) {
        case "wait":
            return (<p>Waiting....</p>);
        case "label":
            return (<Label callback={submitLabel} image={chosenImage}/>);
        case "draw":
            return (<Draw label={chosenLabel} callback={submitImage} />);
        default:
            return (<p>Waiting....</p>);
    }
}
