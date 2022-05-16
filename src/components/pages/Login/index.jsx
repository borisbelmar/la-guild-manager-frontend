import useAuthRoute from "../../../hooks/useAuthRoute";
import NavigationLayout from "../../layout/NavigationLayout";
import LoginForm from "./components/LoginForm";

export default function Login () {
  useAuthRoute(true)

  return (
    <NavigationLayout>
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-200">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <LoginForm />
        </div>
      </div>
    </NavigationLayout>
  )
}
