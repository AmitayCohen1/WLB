import { render, screen } from '@testing-library/react';
import Play from '../components/Play'
import { useAuthContext } from '../hooks/useAuthContext';


test('render NavBar', async () => { 
    const {user} = useAuthContext()
    render(<Play/>);
    const name = screen.getByText(/Play/i);
    expect(name).toBeIntheDocument()
})


