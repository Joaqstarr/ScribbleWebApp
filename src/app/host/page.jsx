"use client";
import Button from "../components/Button";
import { CreateGame } from "./hostActions";
import { useState, useEffect } from "react";
import { PlayerList } from "../components/PlayerList";
import Background from "../components/Background";

export default function Host() {

  const [gameId, setGameId] = useState("loading id...");

  useEffect(()=>{
    GetGameId();
  },[])

  const GetGameId = async () =>{
    setGameId(await CreateGame());
  }


  const gamePath = "/game/"+gameId;
  return (
    <Background>
      <div>
          <h1>Hosting</h1>
          <br/>
          <p>Game Id: {gameId}</p>
          <PlayerList />
          <br/>
          <Button text="Start" path={gamePath} />
          <Button text="Back" path="/" />
      </div>
    </Background>

        
    )
}