"use client";
import Button from "../components/Button";
import { CreateGame } from "./hostActions";
import { useState, useEffect } from "react";

export default function Host() {

  const [gameId, setGameId] = useState("loading id...");

  useEffect(()=>{
    GetGameId();
  },[])

  const GetGameId = async () =>{
    setGameId(await CreateGame());
  }

  

  return (
    <div>
        <h1>Hosting</h1>
        <br/>
        <p>Game Id: {gameId}</p>
        <br/>
        <Button text="Back" path="/" />
    </div>
        
    )
}