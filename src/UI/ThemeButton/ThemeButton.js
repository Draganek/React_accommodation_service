import { useContext } from "react";
import ThemeContext from "../../components/context/themeContext";

const buttonStyles = {
    color: '#fff',
    border: 0,
    backgroundColor: 'transparent'
}

export default function ThemeButton(props) {
    const theme = useContext(ThemeContext)

    return (
         <button 
            style={buttonStyles} 
            onClick={theme.changeTheme}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-droplet-fill" viewBox="0 0 16 16">
                    <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z" />
                  </svg>
            </button>
    );
}
