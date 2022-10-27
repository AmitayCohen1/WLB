import { render, screen } from '@testing-library/react';
import { AuthContextProvider } from '../../context/AuthContext';
import NavBar from '../Navbar';


test('render NavBar', async () => { 

    render(
    <AuthContextProvider>
    <NavBar/>
    </AuthContextProvider>
    );

    const logoTitle = screen.getByText(/The World Leaderboard/i);
    expect(logoTitle).toBeIntheDocument()
})

