import {useState , useEffect } from "react";
export function PlayerList(){
    const [rows, setRows] = useState([]);

    useEffect(()=>{
        addEventListener("PlayerJoined", (event) => {
            setRows(oldArray => [...oldArray, Row(event.name, oldArray.length)]);
        }, false);
      },[])
    
    return(
        <div>
            {rows}
        </div>
    )
}

function Row(name, key){
    return (
    <div key={key}>
        <p>{name}</p>
        <br/>
    </div>
    );
}