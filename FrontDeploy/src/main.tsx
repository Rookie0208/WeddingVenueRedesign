
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
 
   
       <Provider store = {store}>
        <App />
        <ToastContainer />
    </Provider>
 
  
  
)