import { Link } from 'react-router-dom'
import Button from "../../../../common/Button"
import EventGroupItem from "./components/EventGroupItem"
import useNextEventGroups from "./hooks/useNextEventGroups"

export default function NextEventsList () {
  const { data, isLoading } = useNextEventGroups()

  return (
    <div className="p-4 bg-slate-700 rounded w-full">
      <h1 className="font-bold text-xl">
        Next Events
      </h1>
      {isLoading && !data && (
        <p>Loading...</p>
      )}
      {data && data?.length <= 0 ? (
        <div className="mt-4">
          We dont have next events yet.
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {data?.map(group => (
            <EventGroupItem key={group._id} group={group} />
          ))}
        </ul>
      )}
      <div className="mt-4">
        <Link to="/event-groups/new">
          <Button>
            Register a new Event Group
          </Button>
        </Link>
      </div>
    </div>
  )
}