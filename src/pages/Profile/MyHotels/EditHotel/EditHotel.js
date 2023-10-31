import axios from "../../../../axios";
import { useHistory } from 'react-router-dom';
import useAuth from "../../../../hooks/useAuth";
import HotelForm from "../HotelForm"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const AddHotel = (props) => {
    const { id } = useParams();
    const history = useHistory();
    const [hotel, setHotel] = useState(null);
    const [auth] = useAuth();

    const submit = async form => {
        const res = await axios.post('/hotels.json', form);
        history.push('/profil/hotele')
    }

    const fetchHotel = async () => {
        const res = await axios.get(`/hotels/${id}.json`);
        setHotel(res.data);
    }

    useEffect(() => {
        fetchHotel();
    }, [])

    return (
        <div className="card">
            <div className="card-header">Edytuj hotel</div>
            <div className="card-body">

                <p className="text-muted">Uzupełnij dane hotelu</p>
                <HotelForm
                    hotel={hotel}
                    buttonText="Zapisz edycje"
                    onSubmit={submit} />
            </div>
        </div>
    );
};

export default AddHotel;
