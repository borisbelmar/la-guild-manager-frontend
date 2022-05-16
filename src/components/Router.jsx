import { BrowserRouter, Routes, Route } from "react-router-dom"
import CharacterForm from "./pages/CharacterForm"
import EventGroupDetails from "./pages/EventGroupDetails"
import EventGroupForm from "./pages/EventGroupForm"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event-groups/new" element={<EventGroupForm />} />
        <Route path="/event-groups/:id" element={<EventGroupDetails />} />
        <Route path="/characters/register" element={<CharacterForm />} />
        <Route path="/characters/:id" element={<CharacterForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}