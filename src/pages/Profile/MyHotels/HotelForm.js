import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Input from "../../../components/Input/Input";
import { validate } from "../../../helpers/validations";
import LoadingButton from "../../../UI/LoadingButton/LoadingButton";
import { useHistory } from "react-router-dom";


const HotelForm = props => {
    const [auth] = useAuth();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: {
            value: '',
            error: '',
            showError: '',
            rules: ['required', { rule: 'min', length: 4 }]
        },
        description: {
            value: '',
            error: '',
            showError: '',
            rules: ['required', { rule: 'min', length: 10 }]
        },
        city: {
            value: '',
            error: '',
            showError: '',
            rules: ['required']
        },
        rooms: {
            value: 2,
            error: '',
            showError: '',
            rules: ['required']
        },
        features: {
            value: [],
            error: '',
            showError: '',
        },
        image: {
            value: null,
            error: '',
            showError: '',
        },
        status: {
            value: 0,
            error: '',
            showError: '',
            rules: ['required'],
        }
    });

    const submit = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            props.onSubmit({
                name: form.name.value,
                description: form.description.value,
                city: form.city.value,
                rooms: form.rooms.value,
                features: form.features.value,
                status: form.status.value,
                user_id: auth.userId
            });
        } catch (ex) {
            alert(JSON.stringify(ex))
            setLoading(false);
        }

    }

    const changeHandler = (value, fieldName) => {
        const error = validate(form[fieldName].rules, value);
        setForm({
            ...form,
            [fieldName]: {
                ...form[fieldName],
                value,
                showError: true,
                error: error
            }
        });
    }

    useEffect(() => {
        if (!props.hotel){
            return
        }
        const newForm = {...form}
        for (const key in props.hotel) {
            newForm[key].value = props.hotel[key]
        }
        setForm(newForm)
    },[props.hotel]);

    return (
        <form onSubmit={submit}>
            <Input
                label="Nazwa"
                value={form.name.value}
                onChange={value => changeHandler(value, "name")}
                error={form.name.error}
                showError={form.name.showError}
            />

            <Input
                label="Opis"
                type='textarea'
                value={form.description.value}
                onChange={value => changeHandler(value, "description")}
                error={form.description.error}
                showError={form.description.showError}
            />

            <Input
                label="Miejscowość"
                value={form.city.value}
                onChange={value => changeHandler(value, "city")}
                error={form.city.error}
                showError={form.city.showError}
            />

            <Input
                label="Ilość pokoi"
                type='select'
                value={form.rooms.value}
                onChange={value => changeHandler(value, "rooms")}
                options={[
                    { value: 1, label: 1 },
                    { value: 2, label: 2 },
                    { value: 3, label: 3 },
                    { value: 4, label: 4 }]}
                error={form.rooms.error}
                showError={form.rooms.showError}
            />

            <h4>Udogodnienia</h4>
            <Input
                type="checkbox"
                value={form.features.value}
                onChange={value => changeHandler(value, "features")}
                options={[
                    { value: 'tv', label: 'TV' },
                    { value: 'wifi', label: 'Wi-Fi' },
                    { value: 'parking', label: 'Parking' }
                ]}
                error={form.features.error}
                showError={form.features.showError}
            />

            <h4>Zdjęcie</h4>
            <Input
                type="file"
                onChange={value => changeHandler(value, "image")}
                error={form.image.error}
                showError={form.image.showError}
            />

            <h3>Status</h3>
            <Input
                type="radio"
                name="status"
                value={form.status.value}
                onChange={value => changeHandler(value, "status")}
                options={[
                    { value: '1', label: 'Aktywny' },
                    { value: '0', label: 'Ukryty' }
                ]}
                error={form.status.error}
                showError={form.status.showError}
            />
            <div className="text-right">
                <LoadingButton
                    loading={loading}
                    className="btn-success">
                    {props.buttonText}
                </LoadingButton>
            </div>
        </form>
    )
}

export default HotelForm;
