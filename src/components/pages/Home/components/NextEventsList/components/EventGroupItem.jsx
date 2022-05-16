import { format } from "date-fns"
import { Link } from 'react-router-dom'
import EVENT_TYPES from "../../../../../../config/eventTypes"

export default function EventGroupItem ({ group }) {
  const eventType = EVENT_TYPES[group.type]

  return (
    <Link className="block" to={`/event-groups/${group._id}`}>
      <li className="p-4 bg-slate-800 rounded">
        <h2 className="font-bold text-xl">
          {group.title}
        </h2>
        <p>
          Inscritos: {group.characters.length} | Supports: {group.supportCount}/{eventType.support} | DPS: {group.dpsCount}/{eventType.dps}
        </p>
        <p>
          Fecha: {format(new Date(group.startAt), "dd/MM/yyyy HH:mm")}
        </p>
      </li>
    </Link>
  )
}