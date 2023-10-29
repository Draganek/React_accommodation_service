import { useRef, useState } from "react";
import LoadingButton from "../../../../UI/LoadingButton/LoadingButton";
import Input from "../../../../components/Input/Input";

const AddHotel = (props) => {
    const imageRef = useRef();
    const [form, setForm] = useState({
        name: '',
        description: '',
        city: '',
        rooms: 2,
        features: [],
        image: null,
        status: 0
    });
    const [loading, setLoading] = useState(false);

    const submit = e => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 500)

    }

    return (
        <div className="card">
            <div className="card-header">Nowy hotel</div>
            <div className="card-body">

                <p className="text-muted">Uzupełnij dane hotelu</p>

                <form onSubmit={submit}>

                    <Input
                        label="Nazwa"
                        value={form.name}
                        onChange={value => setForm({ ...form, name: value })}
                        isValid={true}
                        showError={false}
                    />

                    <Input
                        label="Opis"
                        type='textarea'
                        value={form.description}
                        onChange={value => setForm({ ...form, description: value })}
                        error=''
                        showError={false}
                    />

                    <Input
                        label="Miejscowość"
                        value={form.city}
                        onChange={value => setForm({ ...form, city: value })}
                        error=''
                        showError={false}
                    />

                    <Input
                        label="Ilość pokoi"
                        type='select'
                        value={form.rooms}
                        onChange={value => setForm({ ...form, rooms: value })}
                        options={[
                            { value: 1, label: 1 },
                            { value: 2, label: 2 },
                            { value: 3, label: 3 },
                            { value: 4, label: 4 }]}
                        error=''
                        showError={false}
                    />

                    <h4>Udogodnienia</h4>
                    <Input
                        type="checkbox"
                        value={form.features}
                        onChange={value => setForm({ ...form, features: value })}
                        options={[
                            { value: 'tv', label: 'TV' },
                            { value: 'wifi', label: 'Wi-Fi' },
                            { value: 'parking', label: 'Parking' }
                        ]}
                        error=''
                        showError={false}
                    />

                    <h4>Zdjęcie</h4>
                    <Input
                        type="file"
                        onChange={value => setForm({ ...form, image: value })}
                    />

                    <h3>Status</h3>
                    <Input
                        type="radio"
                        name="status"
                        value={form.status}
                        onChange={value => setForm({ ...form, status: value })}
                        options={[
                            { value: '1', label: 'Aktywny' },
                            { value: '0', label: 'Ukryty' }
                        ]}
                        error=''
                        showError={false}
                    />

                    <div className="text-right">
                        <LoadingButton
                            loading={loading}
                            className="btn-success">
                            Dodaj hotel
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHotel;
