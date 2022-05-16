import { useParams } from "react-router-dom"
import NavigationLayout from "../../layout/NavigationLayout"
import useEventGroup from "./hooks/useEventGroup"
import EventGroupChildForm from "./components/EventGroupChildForm"
import useAuthRoute from "../../../hooks/useAuthRoute"

export default function EventGroupForm () {
  useAuthRoute()
  const { id } = useParams()
  const { data, isLoading } = useEventGroup(id)
  return (
    <NavigationLayout>
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-200">
            {id ? (
              `Edit EventGroup ${id}`
            ) : (
              'Register a new EventGroup'
            )}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {!isLoading && (
            <EventGroupChildForm currentEventGroup={data} />
          )}
        </div>
      </div>
    </NavigationLayout>
  )
}