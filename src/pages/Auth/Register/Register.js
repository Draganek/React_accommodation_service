import { useState } from "react";
import LoadingButton from "../../../UI/LoadingButton/LoadingButton";
import { validate } from "../../../helpers/validations";
import Input from "../../../components/Input/Input";

export default function Register(props) {
    const [form, setForm] = useState({
        email: {
            value: '',
            error: '',
            showError: '',
            rules: ['required', 'email']
        },
        password: {
            value: '',
            error: '',
            showError: '',
            rules: ['required', { rule: 'min', length: 4 }]
        },
    });

    const valid = !Object.values(form)
        .map(input => input.error)
        .filter(error => error)
        .length;

    const [loading, setLoading] = useState(false);

    const submit = e => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 500)

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

    return (
        <div className="card" >
            <div className="card-header">Rejestracja</div>
            <div className="card-body">

                <p className="text-muted">Uzupełnij dane</p>

                <form onSubmit={submit}>
                    <Input
                        label="Email"
                        type="email"
                        value={form.email.value}
                        onChange={value => changeHandler(value, "email")}
                        error={form.email.error}
                        showError={form.email.showError}
                    />

                    <Input
                        label="Hasło"
                        type="password"
                        value={form.password.value}
                        onChange={value => changeHandler(value, "password")}
                        error={form.password.error}
                        showError={form.password.showError}
                    />

                    <div className="text-right">
                        <LoadingButton
                            disabled={!valid}
                            loading={loading}
                            className="btn-success">
                            Zarejestruj!
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div >
    );
}
