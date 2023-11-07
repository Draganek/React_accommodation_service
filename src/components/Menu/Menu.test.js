import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../context/authContext";
import Menu from "./Menu";

test('renders Zaloguj if user is null', () => {
    render(<Router><Menu /></Router>);
    const link = screen.getByText(/zaloguj/i);
    expect(link).toBeInTheDocument();
});

test('renders Wyloguj if user exists', () => {
    render(<AuthContext.Provider value={{
        user: true,
        login: () => {},
        logout: () => {}

      }}>
        <Router>
            <Menu />
        </Router>
    </AuthContext.Provider>
    );
    const link = screen.getByText(/Wyloguj/i)
    expect(link).toBeInTheDocument();
});
