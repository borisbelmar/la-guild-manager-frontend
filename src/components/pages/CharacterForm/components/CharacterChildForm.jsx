import { Link } from 'react-router-dom';
import CLASSES from "../../../../config/classes";
import HookFormInput from "../../../common/HookFormInput";
import HookFormCheckbox from "../../../common/HookFormCheckbox";
import HookFormSelect from "../../../common/HookFormSelect";
import useCharacterForm from "../hooks/useCharacterForm";
import Button from "../../../common/Button";

export default function CharacterChildForm ({
  currentCharacter
}) {
  const {
    register,
    handleSave,
    formErrors,
    isLoading,
    guilds,
    handleRemove
  } = useCharacterForm({ currentCharacter })

  return (
    <div className="bg-slate-700 py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSave} >
        <HookFormInput
          label="Name"
          name="name"
          type="text"
          register={register}
          error={formErrors?.email?.message}
        />
        <HookFormInput
          label="Item Level"
          name="ilvl"
          type="number"
          register={register}
          error={formErrors?.password?.message}
        />
        <HookFormCheckbox
          label="Is an alter?"
          name="isAlter"
          register={register}
        />
        <HookFormSelect
          label="Class"
          name="class"
          register={register}
          error={formErrors?.class?.message}
          options={
            Object.keys(CLASSES)
              .map(key => ({
                value: key,
                label: key
              }))
          }
        />
        {guilds && (
          <HookFormSelect
            label="Guild"
            name="guild"
            register={register}
            error={formErrors?.guild?.message}
            options={[
              { value: '', label: 'No Guild' },
              ...guilds.map(g => ({ value: g._id, label: g.name }))
            ]}
          />
        )}
        
        <div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {currentCharacter ? 'Edit' : 'Register new'} Character
          </Button>
          {currentCharacter && (
            <Button
              type="button"
              className="w-full bg-red-500 hover:bg-red-600 mt-4"
              disabled={isLoading}
              onClick={handleRemove}
            >
              Remove Character
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