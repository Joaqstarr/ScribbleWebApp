"use client"
import { useEffect, useState } from "react";
import { Label } from "@/app/components/Label";
import { SubmitLabel, SubmitImage } from "@/app/services/GameClient";
import { Draw } from "@/app/components/Draw";


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
        <div className="bg-gradient-to-r from-violet-400 to-fuchsia-300 w-full h-screen flex justify-center items-center">
            <div className="bg-gradient-to-r from-emerald-300 to-emerald-400 rounded-3xl sm:min-w-fit px-2 mx-2 md:mx-0 sm:px-5 lg:px:8 py-8 drop-shadow-2xl shadow-2xl w-full sm:w-2/3 md:w-1/2 lg:w-1/2 border-4 border-emerald-600 min-w-96 max-h-full">
                <SwitchContentOnState state={gameState} submitLabel={handleLabeled} submitImage={handleSubmittedDrawing} chosenLabel={label} chosenImage={shownImage}/>
            </div>
        </div>
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
