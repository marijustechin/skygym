import { BrowserRouter } from 'react-router';
import { AppRouter } from '@/app/providers/router';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
