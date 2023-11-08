import { useEffect, useRef, useState } from "react"
import moment from "moment/moment"
import { Link } from 'react-router-dom'

const BestHotel = (props) => {
    const [time, setTime] = useState('');

    const endTime = moment().add(23, 'minutes').add(34, 'seconds');
    const hotel = props.getHotel();
    let interval = useRef(null);

    useEffect(() => {
        interval.current = setInterval(() => {
            const leftTime = -moment().diff(endTime) / 1000;
            const minutes = Math.floor(leftTime / 60);
            const seconds = Math.floor(leftTime % 60);
            setTime(`${minutes} minut ${seconds} sekund`)
        }, 1000);
        return () => {
            clearInterval(interval.current)
        }
    }, [])


    if (!hotel) { return null }

    return (
        <div style={{paddingTop:'10px'}}>
        <div className="card bg-success text-white">
            <div className="card-header">
                Najlepsza oferta!
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{hotel.name}</h5>
                    <p>Ocena: {hotel.rating}</p>
                </div>
                <p>Do końca oferty pozostało: {time}</p>
                <Link to={`/hotele/${hotel.id}`} className="btn btn-sm btn-light">
                    Pokaż
                </Link>
            </div>
        </div>
        </div>
    )
}

export default BestHotel;
