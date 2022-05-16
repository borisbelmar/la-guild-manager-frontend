import useAuthRoute from "../../../hooks/useAuthRoute";
import NavigationLayout from "../../layout/NavigationLayout";
import RegisterForm from "./components/RegisterForm";

export default function Register () {
  useAuthRoute(true)

  return (
    <NavigationLayout>
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-200">
            Register your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <RegisterForm />
        </div>
      </div>
    </NavigationLayout>
  )
}
