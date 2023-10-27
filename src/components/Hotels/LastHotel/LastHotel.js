
function LastHotel(props) {
    return (
        <div className="card bg-secondary">
            <div className="card-header">
                Ostatnio oglądałeś ten hotel. Wciąż zainteresowany?
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{props.name}</h5>
                    <span className="badge">{props.city}</span>
                </div>
                <div
                    style={{ width: '100px' }}
                    className="ml-auto d-flex justify-content-between">
                    <a href="#" className="btn btn-sm btn-dark">
                        Tak!
                    </a>
                    <button onClick={props.onRemove} className="btn btn-sm btn-dark">
                        Nie
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LastHotel;
