import { useEffect, useState } from "react"
import LoadingButton from "../../../UI/LoadingButton/LoadingButton";
import { validateEmail } from "../../../helpers/validations";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../axios-auth";

export default function ProfileDetails() {
    const [auth, setAuth] = useAuth();

    const [email, setEmail] = useState(auth.email);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })
    const [msg, setMsg] = useState('');
    const [submitInfo, setsubmitInfo] = useState(null);
    const buttonDisabled = Object.values(errors).filter(x => x).length;

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                idToken: auth.token,
                email: email,
                returnSecureToken: true
            };
             if (password) {
                 data.password = password
             };

            const res = await axios.post('accounts:update', data);

            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userId: res.data.localId,
            });
            setLoading(false);
            setsubmitInfo("Wow udało się");
            setMsg('success')
        } catch (ex) {
            setLoading(false)
            setsubmitInfo("No i się wyjebało");
            setMsg('danger')
            console.log(ex.response);
        }
    }

    useEffect(() => {
        if (validateEmail(email)) {
            setErrors({ ...errors, email: '' })
        } else {
            setErrors({ ...errors, email: 'Niepoprawny email' })
        }
    }, [email])

    useEffect(() => {
        if (password.length >= 4 || !password) {
            setErrors({ ...errors, password: '' })
        } else {
            setErrors({ ...errors, password: 'Wymagane 4 znaki' })
        }
    }, [password])

    return (
        <form onSubmit={submit}>
            {submitInfo ? (<div className={`alert alert-${msg}`}>{submitInfo}</div>) : null}
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'}`} />
                <div className="invalid-feedback">
                    {errors.email}
                </div>
                <div className="valid-feedback">
                    Wszystko gra!
                </div>
            </div>
            <div className="form-group">
                <label>Hasło</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">
                    {errors.password}
                </div>
            </div>
            <LoadingButton
                loading={loading}
                disabled={buttonDisabled}>
                Zapisz
            </LoadingButton>
        </form>
    );
}
