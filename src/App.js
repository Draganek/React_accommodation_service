import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Searchbar from './UI/Searchbar/Searchbar';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import ThemeButton from './UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import AuthContext from './context/authContext';
import ReducerContext from './context/reducerContext';
import InspiringQuote from './components/InspiringQuote/InspiringQuote';
import { reducer, initialState } from './reducer';
import Home from './pages/Home/Home';

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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchHandler = term => {
    const newhotels = [...backendHotels]
      .filter(x => x.name
        .toLowerCase()
        .includes(term.toLowerCase()));
    dispatch({ type: 'set-hotels', hotels: newhotels })
  }

  const header = (
    <Header>
      <InspiringQuote />
      <Searchbar onSearch={term => searchHandler(term)} />
      <ThemeButton />
    </Header>
  );

  const content = (
    <>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/hotel/:id">
        <h1>To jest jakiś hotel!</h1>
      </Route>
    </>

  );

  const menu = <Menu />;
  const footer = <Footer />;

  return (
    <Router>
      <AuthContext.Provider value={{
        isAuthenticated: state.isAuthenticated,
        login: () => dispatch({ type: 'login' }),
        logout: () => dispatch({ type: 'logout' })

      }}>
        <ThemeContext.Provider value={{
          color: state.theme,
          changeTheme: () => dispatch({ type: 'change-theme' })
        }}>
          <ReducerContext.Provider value={{
            state: state,
            dispatch: dispatch
          }}>
          <Layout
            header={header}
            menu={menu}
            content={content}
            footer={footer}
          />
          </ReducerContext.Provider>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
