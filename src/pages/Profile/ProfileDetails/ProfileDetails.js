export default function ProfileDetails() {
    return (
        <form>
            <div className="form-group">
                <label>Email</label>
                <input type="email" value="Radek.Draganek@gmail.com" className="form-control"/>
            </div>
            <div className="form-group">
                <label>Hasło</label>
                <input type="password" value="TajneHasło" className="form-control"/>
            </div>
            <button className="btn btn-primary">Zapisz</button>
        </form>
    );
}
