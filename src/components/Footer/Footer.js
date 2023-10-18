import ThemeContext from "../context/themeContext";
import { useContext } from "react";


const Footer = (props) => {
    const theme = useContext(ThemeContext);
    return (
        <div className={`text-center m-3 text-${theme.color}`}>
            Noclegi
        </div>
        );
    }

export default Footer;
