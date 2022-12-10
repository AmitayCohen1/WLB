import { BrowserRouter} from 'react-router-dom'

// pages & components

import Navbar from './components/Navbar'
import Footer from './components/Footer';
import ChallengesRoutes from './ChallengesRoutes';



const App = () => {

  return (
    <div className='bg-black'>
        <BrowserRouter>
        <div className='bg-black min-h-screen sm:w-screen w-full object-center '>
          <Navbar />
            <ChallengesRoutes/>
          </div>
          <Footer />
        </BrowserRouter>
    </div>


  );
  
}

export default App;









