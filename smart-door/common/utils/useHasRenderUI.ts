import { useEffect, useState } from "react";


const useHasRenderUI = (id:string) => {
    const [element, setElement] = useState<HTMLElement>()
    useEffect(() => {
        const el = document.getElementById(id)
        if (el !== null) {
            console.log('ok')
            console.log(el)
            setElement(el)
        }
        else console.log('el null')
    }, [])

    return element;
}

export default useHasRenderUI;