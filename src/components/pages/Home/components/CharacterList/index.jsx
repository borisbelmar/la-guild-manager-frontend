import useCharacters from "../../hooks/useCharacters"
import CharacterItem from "./components/CharacterItem"
import CharactersLoading from "./components/CharactersLoading"
import NoCharacters from "./components/NoCharacters"
import Button from '../../../../common/Button'
import { Link } from 'react-router-dom'

export default function CharacterList () {
  const { data, isLoading } = useCharacters()
  return (
    <div className="p-4 bg-slate-700 rounded w-64">
      <h1 className="font-bold text-xl mb-4">
        My Characters
      </h1>
      {!data && isLoading && (
        <CharactersLoading />
      )}

      {data && data?.length === 0 ? (
        <NoCharacters />
      ) : (
        <ul className="space-y-3">
          {data?.map(character => (
            <CharacterItem key={character._id} character={character} />
          ))}
        </ul>
      )}
      <div className="mt-4">
        <Link to="/characters/register">
          <Button className="w-full">
            Register Character
          </Button>
        </Link>
      </div>
    </div>
  )
}