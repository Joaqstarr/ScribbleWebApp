"use client"
import { ReactSketchCanvas } from "@joaqstarr/react-sketch-canvas";
import { useState, useEffect, useRef} from "react";
import {CallbackButton} from "./Button";

export function Draw({label, callback}){
    const [width, setWidth] = useState(null);
    const [selectedColor, setColor] = useState("red");

    const canvasRef = useRef(null);
    const divRef= useRef(null);

    const SetCanvasRef = () => {

    }
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

    const HandleSubmit = async () => {
        if(canvasRef != null) {
            callback(await canvasRef.current.exportSvg());

        }
    }
    const HandleColorSelect = (newColor) => {
        console.log(newColor);
        setColor(newColor);
    }

    const HandleUndo = () => {
        if(canvasRef.current == null) return;

        canvasRef.current.undo();
    }

    const HandleRedo = () => {
        if(canvasRef.current == null) return;

        canvasRef.current.redo();
    }
    return (
        <div className="">
            <h1>Draw: {label}</h1>
            <div className="flex flex-col md:flex-row gap-2">
                <div className="w-full h-52 bg-red-900 h-fit" ref={divRef}>
                    <Canvas setWidth={width} stroke={4} color={selectedColor} refVar={canvasRef}/>
                </div>
                <div className="flex flex-row md:flex-col gap-2">
                    <ColorSelectButton color="red" callback={HandleColorSelect} currentColor={selectedColor}/>
                    <ColorSelectButton color="blue" callback={HandleColorSelect} currentColor={selectedColor}/>
                    <ColorSelectButton color="yellow" callback={HandleColorSelect} currentColor={selectedColor}/>
                    <ColorSelectButton color="green" callback={HandleColorSelect} currentColor={selectedColor}/>
                    <ColorSelectButton color="white" callback={HandleColorSelect} currentColor={selectedColor}/>
                    <ColorSelectButton color="black" callback={HandleColorSelect} currentColor={selectedColor}/>
                </div>
            </div>

            <div className="flex justify-between pt-1 items-center">
                <div className="flex flex-row gap-4 items-center">
                    <IconButton icon="fa-rotate-left" callback={HandleUndo}/>
                    <IconButton icon="fa-rotate-right" callback={HandleRedo}/>

                </div>
                <CallbackButton text="Submit" callback={HandleSubmit} />
            </div>
        </div>
    )
}



function IconButton({icon, callback}){
    return (
        <div onClick={callback} className="h-min flex items-center flex-row" >
            <i className={"text-2xl fa-solid " + icon}></i>
        </div>
    )
}
function Canvas({setWidth, stroke, color, refVar}){



    return(
        <ReactSketchCanvas ref={refVar}
        style={{
            width: setWidth+"px",
            height: setWidth+"px",
          }}

        strokeWidth={stroke}
        strokeColor={color}
        />
    )
}

function ColorSelectButton({color, callback, currentColor}){

    const HandleClick = () => {
        callback(color);
    }

    const Selected = "ring-offset-2 ring-0";
    return(
    <div onClick={HandleClick} className={"rounded-full w-8 h-8 " + ((currentColor == color)? Selected : "" )} style={{backgroundColor: color}}>

    </div>
    )
}