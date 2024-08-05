"use client"
import { useEffect } from "react";

export default function GamePage(){
    useEffect(() => {
        addEventListener("ShowLabel", (event) => {
            //TODO: MAKE PAGE CHANGE HERE!!!
            console.log("SHOW HERE!!!");
        }, false);
    },[]);
    return(
        <p>Waiting....</p>
    )
}