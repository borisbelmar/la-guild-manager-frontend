import useAuthRoute from "../../../hooks/useAuthRoute"
import { useAuth } from "../../context/AuthContext"
import NavigationLayout from "../../layout/NavigationLayout"
import CharacterList from "./components/CharacterList"
import NextEventsList from "./components/NextEventsList"

export default function Home () {
  useAuthRoute()
  const { user } = useAuth()
  return (
    <NavigationLayout>
      <div className="container py-8">
        <div className="p-4 bg-slate-700 rounded mb-5">
          <h1 className="font-bold text-2xl">
            Welcome {user?.sub}
          </h1>
        </div>
        <div className="flex space-x-5">
          <div>
            <CharacterList />
          </div>
          <div className="flex-1">
            <NextEventsList />
          </div>
        </div>
      </div>
    </NavigationLayout>
  )
}
