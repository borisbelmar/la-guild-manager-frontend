import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import getAuthService from '../../../../services/authService'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required()
}).required();

export default function useRegisterForm () {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: 'login',
    mutationFn: async ({ email, password }) => {
      const authService = getAuthService()
      const res = await authService.login({
        email,
        password
      })
      return res
    },
    onSuccess: (res) => {
      console.log(res)
    },
    onError: (err) => {
      if (err?.response?.status === 409) {
        toast('The user already exists', {
          type: 'error'
        })
        return
      }
      toast('Unknown error', {
        type: 'error'
      })
    }
  })

  return {
    register,
    isLoading,
    handleRegister: handleSubmit(mutateAsync),
    formErrors: errors
  }
}