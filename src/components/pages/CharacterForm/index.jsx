import { useParams } from "react-router-dom"
import NavigationLayout from "../../layout/NavigationLayout"
import useCharacter from "./hooks/useCharacter"
import CharacterChildForm from "./components/CharacterChildForm"
import useAuthRoute from "../../../hooks/useAuthRoute"

export default function CharacterForm () {
  useAuthRoute()
  const { id } = useParams()
  const { data, isLoading } = useCharacter(id)
  return (
    <NavigationLayout>
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-200">
            {id ? (
              `Edit Character ${id}`
            ) : (
              'Register a new Character'
            )}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {!isLoading && (
            <CharacterChildForm currentCharacter={data} />
          )}
        </div>
      </div>
    </NavigationLayout>
  )
}