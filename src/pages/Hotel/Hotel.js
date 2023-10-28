import { useEffect, useState } from "react";
import {useParams } from 'react-router-dom'
import LoadingIcon from "../../UI/LoadingIcon/LoadingIcon";

function Hotel(props) {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchHotel = () => {
        setHotel({
            id: 2,
            name: 'Dębowy',
            city: 'Lublin',
            rating: 8.8,
            description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
            image: ''
          });
          setLoading(false);
    }

    useEffect(() => {
        setTimeout(() => {
            fetchHotel();
        }, 500)
    }, []);

    return loading ? <LoadingIcon /> : (
        <h1>Hotel: {hotel.name}</h1>
    );
}

export default Hotel;
