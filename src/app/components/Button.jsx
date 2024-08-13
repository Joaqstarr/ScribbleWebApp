import Link from "next/link";

export default function Button({text, path}){
    return(
    <Link href={path}>
        <div className="w-min bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
        {text}
        </div>
    </Link>
    )
}

export function CallbackButton({text, callback}){
    return (
    <div onClick={callback} className="w-min bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
        {text}
    </div>
    )
}

