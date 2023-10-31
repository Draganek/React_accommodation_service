import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import LoadingIcon from "../../UI/LoadingIcon/LoadingIcon";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import axios from "../../axios"
import { objectToArrayWithId } from "../../helpers/objects";

function Hotel(props) {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    const setTitle = useWebsiteTitle();

    const fetchHotel = async () => {
        try {
            const res = await axios.get(`/hotels/${id}.json`);
            setHotel(res.data);
            setTitle(`Hotel - ${res.data.name}`)
        } catch (ex) {
            alert(JSON.stringify(ex.response))
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchHotel();
    }, []);

    return loading ? <LoadingIcon /> : (
        <h1>Hotel: {hotel.name}</h1>
    );
}

export default Hotel;
