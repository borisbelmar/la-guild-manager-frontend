import { Link } from 'react-router-dom';
import EVENT_TYPES from "../../../../config/eventTypes";
import HookFormInput from "../../../common/HookFormInput";
import HookFormSelect from "../../../common/HookFormSelect";
import useEventGroupForm from "../hooks/useEventGroupForm";
import Button from "../../../common/Button";

export default function EventGroupChildForm ({
  currentEventGroup
}) {
  const {
    register,
    handleSave,
    formErrors,
    isLoading,
    handleRemove
  } = useEventGroupForm({ currentEventGroup })

  return (
    <div className="bg-slate-700 py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSave} >
        <HookFormInput
          label="Title"
          name="title"
          type="text"
          register={register}
          error={formErrors?.title?.message}
        />
        <HookFormInput
          label="Description"
          name="description"
          type="text"
          register={register}
          error={formErrors?.description?.message}
        />
        <HookFormInput
          label="Start at"
          name="startAt"
          type="datetime-local"
          register={register}
        />
        <HookFormSelect
          label="Type"
          name="type"
          register={register}
          error={formErrors?.type?.message}
          options={
            Object.keys(EVENT_TYPES)
              .map(key => ({
                value: key,
                label: key
              }))
          }
        />
        
        <div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {currentEventGroup ? 'Edit' : 'Register new'} EventGroup
          </Button>
          {currentEventGroup && (
            <Button
              type="button"
              className="w-full bg-red-500 hover:bg-red-600 mt-4"
              disabled={isLoading}
              onClick={handleRemove}
            >
              Remove EventGroup
            </Button>
          )}
          <Link to="/" className="w-full text-center block mt-3 text-amber-500 hover:text-amber-600 transition">
            Back
          </Link>
        </div>
      </form>
    </div>
  )
}