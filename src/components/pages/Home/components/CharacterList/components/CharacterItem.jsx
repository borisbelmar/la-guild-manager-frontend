import { Link } from 'react-router-dom';

export default function CharacterItem ({ character }) {
  return (
    <Link className="block" to={`/characters/${character._id}`}>
      <li className="py-2 px-3 bg-slate-800 rounded hover:bg-slate-900 transition cursor-pointer">
        <h4 className="font-bold mb-2">{character.name}</h4>
        <p className="text-sm mb-1">ilvl: {character.ilvl}</p>
        <p className="text-sm mb-1">Class: {character.class}</p>
        <p className="text-sm">Guild: {character.guild?.name || 'No Guild'}</p>
      </li>
    </Link>
  )
}