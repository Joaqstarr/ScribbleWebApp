
export function PlayerList({players}){
    const rows = [];

    for(let i = 0; i < players.length; i++){
        rows.push(Row(players.at(i).name, i));
    }

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