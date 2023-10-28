import { useParams } from 'react-router-dom'

export default function Search(props) {

  const { term } = useParams();

    /*const searchHandler = term => {
        const newhotels = [...backendHotels]
          .filter(x => x.name
            .toLowerCase()
            .includes(term.toLowerCase()));
        dispatch({ type: 'set-hotels', hotels: newhotels })
      }*/

      return (
        <div>
            <h2>Wyniki dla frazy "{term}":</h2>
        </div>
      )
}
