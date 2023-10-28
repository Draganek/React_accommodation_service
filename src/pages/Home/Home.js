import React, { useEffect, useContext, useState } from 'react';
import LastHotel from '../../components/Hotels/LastHotel/LastHotel';
import useStateStorage from '../../hooks/useStateStorage';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import BestHotel from '../../components/Hotels/BestHotel/BestHotel';
import Hotels from '../../components/Hotels/Hotels';
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon';

const backendHotels = [
    {
        id: 1,
        name: 'Pod akacjami',
        city: 'Warszawa',
        rating: 8.3,
        description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        image: ''
    },
    {
        id: 2,
        name: 'Dębowy',
        city: 'Lublin',
        rating: 8.8,
        description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        image: ''
    }
]

export default function Home(props) {
    useWebsiteTitle('Strona główna');
    const [lastHotel, setLastHotel] = useStateStorage('last-hotel', null)

    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setHotels(backendHotels);
            setLoading(false);
        }, 1000);
    }, [])

    const getBestHotel = () => {
        if (hotels.length < 2) {
            return null;
        } else {
            return hotels.sort((a, b) => (a.rating > b.rating ? -1 : 1))[0];
        }
    };

    const openHotel = (hotel) => setLastHotel(hotel);
    const removeLastHotel = () => setLastHotel(null);

    return loading ? <LoadingIcon /> :
        (
            <>
                {lastHotel ? <LastHotel {...lastHotel} onRemove={removeLastHotel} /> : null}
                {getBestHotel() ? <BestHotel getHotel={getBestHotel} /> : null}
                <Hotels onOpen={openHotel} hotels={hotels} />
            </>
        );
}
