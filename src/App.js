import React, { useCallback, useEffect, useReducer } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Hotels from './components/Hotels/Hotels';
import LoadingIcon from './UI/LoadingIcon/LoadingIcon';
import Searchbar from './UI/Searchbar/Searchbar';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import ThemeButton from './UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import AuthContext from './context/authContext';
import BestHotel from './components/Hotels/BestHotel/BestHotel';
import InspiringQuote from './components/InspiringQuote/InspiringQuote';

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

const reducer = (state, action) => {
  switch (action.type) {
    case 'change-theme':
      const theme = state.theme === 'danger' ? 'primary' : 'danger'
      return { ...state, theme: theme };
    case 'set-hotels':
      return { ...state, hotels: action.hotels };
    case 'set-loading':
      return { ...state, loading: action.loading };
    case 'login':
      return { ...state, isAuthenticated: true };
    case 'logout':
      return { ...state, isAuthenticated: false };
    default:
      throw new Error('Nie ma takiej akcji: ' + action.type)
  }
}

const initialState = {
  hotels: [],
  loading: true,
  isAuthenticated: false,
  theme: 'primary'
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchHandler = term => {
    const newhotels = [...backendHotels]
      .filter(x => x.name
        .toLowerCase()
        .includes(term.toLowerCase()));
    dispatch({ type: 'set-hotels', hotels: newhotels })
  }

  const getBestHotel = useCallback(() => {
    if(state.hotels.length < 2){
      return null;
    } else {
      return state.hotels.sort((a, b) => a.rating > b.rating ? -1 : 1)[0];
    }
  }, [state.hotels]);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'set-hotels', hotels: backendHotels });
      dispatch({ type: 'set-loading', loading: false });
    }, 1000);
  }, [])

  const header = (
    <Header>
      <InspiringQuote />
      <Searchbar
        onSearch={term => searchHandler(term)}
      />
      <ThemeButton />
    </Header>
  );

  const content = (
    state.loading
      ? <LoadingIcon />
      : (
        <>
          {getBestHotel() ? <BestHotel getHotel={getBestHotel} /> : null}
          <Hotels hotels={state.hotels} />
        </>
      )
  );

  const menu = <Menu />;
  const footer = <Footer />;


  return (
    <AuthContext.Provider value={{
      isAuthenticated: state.isAuthenticated,
      login: () => dispatch({ type: 'login' }),
      logout: () => dispatch({ type: 'logout' })

    }}>
      <ThemeContext.Provider value={{
        color: state.theme,
        changeTheme: () => dispatch({ type: 'change-theme' })
      }}>
        <Layout
          header={header}
          menu={menu}
          content={content}
          footer={footer}
        />
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
