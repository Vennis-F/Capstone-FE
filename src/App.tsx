import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HistoryRouter as Router } from 'redux-first-history/rr6'

import 'App.css'
import AppRoutes from 'routes'
import { history, store } from 'store/store'

const App = () => (
  <>
    <Provider store={store}>
      <Router history={history}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRoutes />
          <ToastContainer />
        </LocalizationProvider>
      </Router>
    </Provider>
  </>
)

export default App
