import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Button from '../../../common/Button'
import HookFormSelect from '../../../common/HookFormSelect'
import useAddCharacterToGroup from '../hooks/useAddCharacterToGroup'

export default function CharacterSelectionModal ({
  open,
  setOpen,
  groupEventId
}) {
  const { isLoading, characters, register, addCharacter } = useAddCharacterToGroup(groupEventId, { onSuccess: () => setOpen(false) })
  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-slate-800 text-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <form onSubmit={addCharacter}>
                  <div>
                    <div className="text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-50">
                        Select a Character
                      </Dialog.Title>
                    </div>
                    <HookFormSelect
                      name="character"
                      register={register}
                      options={characters?.map(character => ({
                        label: character.name,
                        value: character._id
                      }))}
                    />
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={isLoading}
                    >
                      Add Character
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}