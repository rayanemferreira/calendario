import { useState } from "react"

function Contador(){
    const[contador,setContador] = useState(0)
    function aumentar(){
        setContador(contador+1)
    }

    return(
        <div>
            <h1>Meu Contador: {contador}</h1>
            <button onclick={aumentar}>aumentando</button>

        </div>
    )
}

export default Contador