import axios from "../../../../axios";
import { useHistory } from 'react-router-dom';
import useAuth from "../../../../hooks/useAuth";
import HotelForm from "../HotelForm"

const AddHotel = (props) => {
    const history = useHistory();
    const [auth] = useAuth();

    const submit = async form => {
        await axios.post(`/hotels.json?auth=${auth.token}`, form);
        history.push('/profil/hotele')
    }

    return (
        <div className="card">
            <div className="card-header">Nowy hotel</div>
            <div className="card-body">

                <p className="text-muted">Uzupełnij dane hotelu</p>
                <HotelForm
                    buttonText="Zapisz edycje"
                    onSubmit={submit} />
            </div>
        </div>
    );
};

export default AddHotel;
