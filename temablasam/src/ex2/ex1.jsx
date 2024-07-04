import { useEffect, useRef,useState} from "react";
function exerciti1() {
    const [name, setName] = useState("")
    let [renderCount] = useRef(1)
    


    return (
        <div>
            <imput
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            ></imput>

            <div>numele;{name}</div>
            <div>pagina retur ;{renderCount} Times</div>
        </div>

    );
};

export default exerciti1;
