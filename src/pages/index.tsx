import { useState } from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const resolver: Resolver<SignInData> = async (values) => {
  return {
    values: values.email || values.password ? values : {},
    errors: !values.email || !values.password ? {
      email: {
        type: "required",
        message: "E-mail obrigatório"
      },
      password: {
        type: "required",
        message: "Password obrigatório"
      }
    }: {}
  }
}

type SignInData = {
  email: string;
  password: string;
}

export default function Home() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const { signIn } = useAuth()

  const { handleSubmit, register } = useForm({ resolver })

  const handleSignIn: SubmitHandler<SignInData> = async () => {
    const data = { email, password }
    
    await signIn(data)
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-200">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-200">
            Or
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              start your 14-day free trial{" "}
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit(handleSignIn)} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                className="appearance-none bg-zinc-800 rounded-none relative block w-full px-3 py-2 border-none placeholder-gray-500 text-gray-400 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                {...register("email")}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                className="appearance-none bg-zinc-800 rounded-none relative block w-full px-3 py-2 border-none placeholder-gray-500 text-gray-400 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register("password")}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
