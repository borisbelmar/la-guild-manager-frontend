import { Link } from 'react-router-dom';
import Button from "../../../common/Button";
import HookFormCheckbox from "../../../common/HookFormCheckbox";
import HookFormInput from "../../../common/HookFormInput";
import useLoginForm from "../hooks/useLoginForm";

export default function LoginForm () {
  const { register, handleLogin, formErrors, isLoading } = useLoginForm()

  return (
    <div className="bg-slate-700 py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleLogin} >
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
        <div className="flex items-center justify-between">
          <HookFormCheckbox
            label="Keep session open?"
            name="keepSession"
            register={register}
          />
        </div>

        <div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            Sign in
          </Button>
          <Link to="/register" className="w-full text-center block mt-3 text-amber-500 hover:text-amber-600 transition">
            Register an account
          </Link>
        </div>
      </form>
    </div>
  )
}