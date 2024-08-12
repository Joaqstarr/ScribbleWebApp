"use client"
import { ReactSketchCanvas } from "@joaqstarr/react-sketch-canvas";
import { FunctionRegion } from "@supabase/supabase-js";
import { useState, useEffect, useRef} from "react";

export function Draw({label}){
    const [width, setWidth] = useState(null);
    const divRef= useRef(null);

    const UpdateWidth = (node) => {

        if (node == null) return;

        const newWidth = node.offsetWidth;
        setWidth(newWidth);
    }

    useEffect(() => {

        const getwidth = () => {
            
            UpdateWidth(divRef);

        };
        window.addEventListener("resize", getwidth);
        // remove the event listener before the component gets unmounted
        return () => window.removeEventListener("resize", getwidth);
      }, []);

    
    return (
        <div className="">
            <h1>Draw: {label}</h1>
            <div className="w-full h-52 bg-red-900 h-fit" ref={divRef}>
                <Canvas setWidth={width} stroke={4}/>
            </div>

        </div>
    )
}




function Canvas({setWidth, stroke}){



    return(
        <ReactSketchCanvas 
        style={{
            width: setWidth+"px",
            height: setWidth+"px",
          }}

        strokeWidth={stroke}
        strokeColor="red"
        />
    )
}

