"use client";
import Button from "../components/Button";
import { CreateGame, GetConnectedUsers } from "./hostActions";
import { useState, useEffect, useRef } from "react";
import { PlayerList } from "../components/PlayerList";

export default function Host() {

  const [gameId, setGameId] = useState("loading id...");
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(()=>{
    GetGameId();
    console.log(connectedUsers.length);
  },[])

  const GetGameId = async () =>{
    setGameId(await CreateGame());
  }

  const UpdateConnectedPlayers = async () => {
    setConnectedUsers(await GetConnectedUsers());
  }

  useInterval(UpdateConnectedPlayers, 2000);

  const gamePath = "/game/"+gameId;
  return (
    <div>
        <h1>Hosting</h1>
        <br/>
        <p>Game Id: {gameId}</p>
        <PlayerList players={connectedUsers} />
        <br/>
        <Button text="Start" path={gamePath} />
        <Button text="Back" path="/" />
    </div>
        
    )
}



function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
let timer = 0;

export function StartTimer(newTime){
  timer = newTime;
}

