export default function Background(props){
    return(
        <div className="bg-gradient-to-r from-violet-400 to-fuchsia-300 w-full h-screen flex justify-center items-center">
            <div className="bg-gradient-to-r from-emerald-300 to-emerald-400 rounded-3xl sm:min-w-fit px-2 mx-2 md:mx-0 sm:px-5 lg:px:8 py-8 drop-shadow-2xl shadow-2xl w-full sm:w-2/3 md:w-1/2 lg:w-1/2 border-4 border-emerald-600 min-w-96 max-h-full transition-all">
                {props.children}
            </div>
        </div>
    )
}