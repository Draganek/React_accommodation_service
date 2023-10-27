import React, { useEffect, useContext } from 'react';
import LastHotel from '../../components/Hotels/LastHotel/LastHotel';
import useStateStorage from '../../hooks/useStateStorage';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import BestHotel from '../../components/Hotels/BestHotel/BestHotel';
import Hotels from '../../components/Hotels/Hotels';
import ReducerContext from '../../context/reducerContext';
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
    const reducer = useContext(ReducerContext);

    useEffect(() => {
        setTimeout(() => {
            reducer.dispatch({ type: 'set-hotels', hotels: backendHotels });
            reducer.dispatch({ type: 'set-loading', loading: false });
        }, 1000);
      }, [])

    const getBestHotel = () => {
        if (reducer.state.hotels.length < 2) {
            return null;
        } else {
            return reducer.state.hotels.sort((a, b) => (a.rating > b.rating ? -1 : 1))[0];
        }
    };

    const openHotel = (hotel) => setLastHotel(hotel);
    const removeLastHotel = () => setLastHotel(null);

    if (reducer.state.loading) return <LoadingIcon />

    return (
        <>
            {lastHotel ? <LastHotel {...lastHotel} onRemove={removeLastHotel} /> : null}
            {getBestHotel() ? <BestHotel getHotel={getBestHotel} /> : null}
            <Hotels onOpen={openHotel} hotels={reducer.state.hotels} />
        </>
    );
}
