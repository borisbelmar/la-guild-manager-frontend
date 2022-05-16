import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../common/Button'
import { useAuth } from '../../context/AuthContext'

const StyledMain = styled.main`
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
`

export default function NavigationLayout ({ children }) {
  const { user, clearSession } = useAuth()
  return (
    <StyledMain className="flex flex-col bg-slate-800 text-slate-50 min-h-screen">
      <nav className="py-4 px-8 bg-slate-600">
        <div className="container flex justify-between items-center">
          <Link to="/">
            <p className="font-bold text-lg">Lost Ark Guild Manager</p>
          </Link>
          {user && (
            <Button onClick={clearSession}>
              Logout
            </Button>
          )}
        </div>
      </nav>
      <section className="flex-1 flex flex-col">
        {children}
      </section>
      <footer className="py-4 px-8 bg-slate-600">
        <div className="container">
          <p>Lost Ark Guild Manager</p>
        </div>
      </footer>
    </StyledMain>
  )
}