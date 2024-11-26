import { LoadingContext } from "../context/context";
import { useContext } from "react";

export default function useLaoding(){
    const context = useContext(LoadingContext);

    if(!context){
        throw new Error("The context is not provided")
    }

    return context
}