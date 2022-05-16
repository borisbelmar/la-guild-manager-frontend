import { formatDistance } from "date-fns";
import { useState } from "react";
import { useParams } from "react-router-dom";
import EVENT_TYPES from '../../../config/eventTypes'
import useAuthRoute from "../../../hooks/useAuthRoute";
import Button from "../../common/Button";
import NavigationLayout from "../../layout/NavigationLayout";
import CharacterCard from "./components/CharacterCard";
import CharacterSelectionModal from "./components/CharacterSelectionModal";
import useEventGroup from "./hooks/useEventGroup";

export default function EventGroupDetails () {
  useAuthRoute()
  const { id } = useParams()
  const { data, isLoading } = useEventGroup(id);
  const [openModal, setOpenModal] = useState(false)

  const eventType = EVENT_TYPES[data?.type]

  return (
    <>
      <NavigationLayout>
        <div className="py-8 container">
          {!data && isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2">
                {data.title}
              </h1>
              <p>{data.type} | Min iLvl: {eventType.minIlvl} | Supports: {data.supportCount}/{eventType.support} | DPS: {data.dpsCount}/{eventType.dps}</p>
              <p className="mb-2">Date: {formatDistance(new Date(data.startAt), new Date())}</p>

              <span className="px-2 py-1 bg-green-700 rounded text-sm">
                Open
              </span>

              <div className="mt-8">
                <h2 className="text-xl font-bold">
                  Participants
                </h2>
                <ul className="my-4 space-y-4">
                  {data.characters.map(character => (
                    <CharacterCard
                      key={character._id}
                      groupEventId={id}
                      character={character}
                    />
                  ))}
                </ul>
              </div>
            </>
          )}
          <div>
            <Button onClick={() => setOpenModal(true)}>
              Add Character
            </Button>
          </div>
        </div>
      </NavigationLayout>
      <CharacterSelectionModal open={openModal} setOpen={setOpenModal} groupEventId={id} />
    </>
  )
}