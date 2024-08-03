import { createClient } from "@/utils/supabase/client";
import { GetUser } from "../services/AuthActions";
import Sqids from "sqids";

export async function CreateGame(){
    const supabase = createClient();
    const user = await GetUser(supabase);

    if(user.data.user == null || user == null){
        console.log("Could not authenticate user.");
        return "Error creating match";
    }

    const matchID = await AddMatchToDatabase(supabase, user);

    if(matchID == null){
        console.log("Could not add match to database.");
        return "Error creating match";
    }

    console.log(matchID);
    const encodedId = EncodeId(matchID);
    console.log(encodedId + ", decoded: " + DecodeId(encodedId));
    return encodedId;
}

async function AddMatchToDatabase(supabase, user){

    if(user.data.user == null){
        console.log("Authentication does not exist: " + JSON.stringify(user));
        return null;
    }
    const gameId = IdToNum(user.data.user.id);
    console.log(user.data.user.id);
    const { data, error } = await supabase
        .from('GameData')
        .upsert({id: user.data.user.id, archived: false, game_code: gameId })
        .select()
        
    if(error){
        console.log("Error creating game: " + JSON.stringify(error));
        return null;
    }
    return numToArray(gameId);
}

function EncodeId(gameId){
    const sqids = new Sqids({
        alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!&'
    });
    const id = sqids.encode(gameId);
    return id;
}

export function DecodeId(GameId){
    const sqids = new Sqids({
        alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!&'
    });
    const id = sqids.decode(GameId);

    let outString = "";

    for(let i = 0; i < id.length; i++){
        outString += id.at(i);
    }

    return outString;
}

function IdToNum(uuid){
    var outStr = "";

    const LetterToNum = (char) => {
        if(char == "-") return "";

        if(char >= '0' && char <= '9'){
            return char;
        }
        const position = char.charCodeAt(0) - 96;
        return position;
    }

    for(let i = 0; i < uuid.length; i++){
        outStr += LetterToNum(uuid.charAt(i));
    }
    outStr = outStr.substring(0, 5);
    return outStr;
}

function numToArray(num){
    let asString = "";
    asString += num;

    const outArr = [];

    for(let i = 0; i < num.length; i++){
        outArr.push(parseInt(num.charAt(i)));
    }

    return outArr;
}

