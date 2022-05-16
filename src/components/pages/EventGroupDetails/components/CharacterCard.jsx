import Button from "../../../common/Button"
import { useAuth } from "../../../context/AuthContext"
import useRemoveCharacterFromGroup from "../hooks/useRemoveCharacterFromGroup"

export default function CharacterCard ({ character, groupEventId }) {
  const { user } = useAuth()
  const { removeCharacter, isLoading } = useRemoveCharacterFromGroup(groupEventId, character._id)

  return (
    <li className="p-4 bg-slate-700 rounded flex items-center">
      <div className="flex-1">
        <h4 className="font-bold">{character.name}</h4>
        <p>{character.class} - {character.ilvl}</p>
      </div>
      {user.sub === character.createdBy && (
        <Button disabled={isLoading} onClick={removeCharacter} className="py-1 px-2 mt-2 bg-red-500 hover:bg-red-600">
          Remove
        </Button>
      )}
    </li>
  )
}