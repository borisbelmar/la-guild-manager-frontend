import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { ToastContainer } from 'react-toastify'
import Router from './components/Router'
import { AuthProvider } from './components/context/AuthContext'
import QueryProvider from './components/context/QueryProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <QueryProvider>
          <Router />
        </QueryProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
