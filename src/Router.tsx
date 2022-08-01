import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { Layout } from './components/Layout'
import Home from './pages/Home'
import Wallet from './pages/Wallet'

export function Router() {
  return (
    <BrowserRouter >
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/wallet' element={<Wallet />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}