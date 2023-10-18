import React from "react";
import styles from './Header.module.css';

function Header(props) {
    return (
        <header className={`container ${styles.header} `}>
            {props.children}
        </header>
    );
}

export default Header;
