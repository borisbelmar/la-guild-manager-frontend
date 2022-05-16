import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import getAuthService from '../../../../services/authService'
import { useAuth } from "../../../context/AuthContext";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
}).required();

export default function useLoginForm () {
  const { setSession } = useAuth()
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
      setSession(res.data?.accessToken)
    },
    onError: (err) => {
      if (err?.response?.status === 401) {
        toast('Invalid email or password', {
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
    isLoading,
    register,
    handleLogin: handleSubmit(mutateAsync),
    formErrors: errors
  }
}