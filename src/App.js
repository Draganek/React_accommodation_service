import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Hotels from './components/Hotels/Hotels';
import LoadingIcon from './UI/LoadingIcon/LoadingIcon';
import Searchbar from './UI/LoadingIcon/Searchbar/Searchbar'

class App extends Component {
  hotels = [
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
  state = {
    hotels: [],
    loading: true
  };

  searchHandler(term) {
    console.log('szukaj z app', term);
    const hotels = [...this.hotels]
      .filter(x => x.name
        .toLowerCase()
        .includes(term.toLowerCase()));
    this.setState({ hotels })
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hotels: this.hotels,
        loading: false
      });
    }, 1000);
  }


  render() {
    return (
      <div className="App">
        <Header>
          <Searchbar onSearch={term => this.searchHandler(term)}/>
        </Header>

        <Menu />
        {this.state.loading
          ? <LoadingIcon />
          : <Hotels hotels={this.state.hotels} />
        }
      </div>
    );
  }
}

export default App;
