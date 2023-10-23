import React, { useEffect, useState } from 'react';
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
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('primary')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const changeTheme = () => {
    const newTheme = theme === 'primary' ? 'danger' : 'primary';
    setTheme(newTheme);
  }

  const searchHandler = term => {
    const newhotels = [...backendHotels]
      .filter(x => x.name
        .toLowerCase()
        .includes(term.toLowerCase()));
    setHotels(newhotels);
  }

  useEffect(() => {
    setTimeout(() => {
      setHotels(backendHotels);
      setLoading(false);
    }, 1000);
  },[])

  const header = (
    <Header>
      <Searchbar
        onSearch={term => searchHandler(term)}
      />
      <ThemeButton onChange={changeTheme} />
    </Header>
  );

  const content = (
    loading
      ? <LoadingIcon />
      : <Hotels hotels={hotels} />
  );

  const menu = <Menu />;
  const footer = <Footer />;


  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: isAuthenticated,
      login: () => setIsAuthenticated(true),
      logout: () => setIsAuthenticated(false)
      }}>
      <ThemeContext.Provider value={{
        color: theme,
        changeTheme: changeTheme
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
