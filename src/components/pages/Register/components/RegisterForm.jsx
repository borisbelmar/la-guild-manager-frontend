import { Link } from 'react-router-dom';
import Button from "../../../common/Button";
import HookFormInput from "../../../common/HookFormInput";
import useRegisterForm from "../hooks/useRegisterForm";

export default function RegisterForm () {
  const { register, handleRegister, formErrors } = useRegisterForm()
  return (
    <div className="bg-slate-700 py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleRegister} >
        <HookFormInput
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          register={register}
          error={formErrors?.email?.message}
        />
        <HookFormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={formErrors?.password?.message}
        />

        <HookFormInput
          label="Repeat Password"
          name="rePassword"
          type="password"
          register={register}
          error={formErrors?.rePassword?.message}
        />

        <div>
          <Button type="submit" className="w-full">
            Register
          </Button>
          <Link to="/login" className="w-full text-center block mt-3 text-amber-500 hover:text-amber-600 transition">
            Login with an existing account
          </Link>
        </div>
      </form>
    </div>
  )
}