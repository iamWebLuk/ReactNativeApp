import {useEffect, useState} from "react";
import axios from "axios";

const useStarWars = (url: string): {} => {

    const [data, setData] = useState({});

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
    },[])
    return data;
}

export default useStarWars;