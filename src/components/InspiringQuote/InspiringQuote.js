import { useEffect, useLayoutEffect, useState } from "react";

const quotes = [
    'Podróże to jedyna rzecz, na którą wydajemy pieniądze, a stajemy się bogatsi.',
    'Podróżowanie uczy skromności. Widzisz, jak niewiele miejsca zajmujesz w świecie.',
    'Nie czekaj. Pora nigdy nie będzie idealna.',
    'Podróżnik, który nie potrafi obserwować, jest jak ptak pozbawiony skrzydeł.',
    'Jakość podróży mierzy się w liczbie poznanych przyjaciół, a nie w przejechanych kilometrach.',
    'Podróżujemy nie po to, by uciec przed życiem, ale by życie nam nie uciekło.',
    'Podróż nie polega na pozostawieniu za sobą swojego domu, ale swoich zwyczajów.',
];

const styles = {
    position: 'absolute',
    padding: '10px',
    top: '10px',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontStyle: 'italic'
}

function InspiringQuote(props) {
    const [quote, setQuote] = useState('Wczytywanie cytatu...')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    useLayoutEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }, [loading])

    return (
        <p style={styles}>{quote}</p>
    );
}

export default InspiringQuote;
