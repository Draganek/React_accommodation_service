import { useRef, useState } from "react";
import LoadingButton from "../../../../UI/LoadingButton/LoadingButton";

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

    const changeFeatureHandler = e => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            const newFeatures = [...form.features, value]
            setForm({...form, features: newFeatures})
        } else{
            const newFeatures = form.features.filter(x => x !== value);
            setForm({...form, features: newFeatures})
        }
    }

    return (
        <div className="card">
            <div className="card-header">Nowy hotel</div>
            <div className="card-body">

                <p className="text-muted">Uzupełnij dane hotelu</p>

                <form onSubmit={submit}>

                    <div className="form-group">
                        <label>Nazwa</label>
                        <input
                            value={form.name}
                            onChange={e => setForm({...form, name: e.target.value})}
                            type="text"
                            className={`form-control ${false ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">błąd</div>
                    </div>

                    <div className="form-group">
                        <label>Opis</label>
                        <textarea
                            value={form.description}
                            onChange={e => setForm({...form, description: e.target.value})}
                            type="text"
                            className={`form-control ${false ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">błąd</div>
                    </div>

                    <div className="form-group">
                        <label>Miejscowość</label>
                        <input
                            value={form.city}
                            onChange={e => setForm({...form, city: e.target.value})}
                            type="text"
                            className={`form-control ${false ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">błąd</div>
                    </div>

                    <div className="form-group">
                        <label>Ilość pokoi</label>
                        <select 
                        value={form.rooms} 
                        onChange={e => setForm({...form, rooms: e.target.value})}
                        className="form-control">
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                        </select>
                        <div className="invalid-feedback">
                            błąd
                        </div>
                    </div>

                    <h4>Udogodnienia</h4>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="tv"
                                value="tv"
                                onChange={changeFeatureHandler}
                                checked={form.features.find(x => x === 'tv')} />
                            <label className="custom-control-label" for="tv">TV</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="wifi"
                                value="wifi"
                                onChange={changeFeatureHandler}
                                checked={form.features.find(x => x === 'wifi')} />
                            <label className="custom-control-label" for="wifi">WiFi</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="parking"
                                value="parking"
                                onChange={changeFeatureHandler}
                                checked={form.features.find(x => x === 'parking')} />
                            <label className="custom-control-label" for="parking">Parking</label>
                        </div>
                    </div>

                    <h4>Zdjęcie</h4>
                    <div className="form-group">
                        <input 
                        type="file" 
                        onChange={e => setForm({...form, image: e.target.files})}
                        ref={imageRef}/>
                    </div>

                    <h3>Status</h3>
                    <div className="form-group">
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                id="status-active"
                                name="status"
                                value="1"
                                onChange={e => setForm({...form, status: e.target.value})}
                                checked={form.status == 1}
                                className="custom-control-input" />
                            <label className="custom-control-label" for="status-active">Aktywny</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                id="status-hide"
                                name="status"
                                value="0"
                                onChange={e => setForm({...form, status: e.target.value})}
                                checked={form.status == 0}
                                className="custom-control-input" />
                            <label className="custom-control-label" for="status-hide">Ukryty</label>
                        </div>
                    </div>

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
