'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';
import createSession from '../actions/createSession';
import { useAuth } from '/context/authContext';
import { loginWithGoogle } from "../actions/loginWithGoogle";

const LoginPage = () => {
  const [state, formAction] = useFormState(createSession, {});
  const { refreshAuth } = useAuth();
  const router = useRouter();
  const hasHandledSuccess = useRef(false);

  useEffect(() => {
    const handleLogin = async () => {
      if (state?.error) {
        toast.error(state.error);
        return;
      }

      if (state?.success && !hasHandledSuccess.current) {
        hasHandledSuccess.current = true;
        toast.success('Logged in successfully!');
        await refreshAuth();
        router.push('/');
      }
    };

    handleLogin();
  }, [state, refreshAuth, router]);

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20'>
        <form action={formAction}>
          <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
            Login
          </h2>

          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 font-bold mb-2'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='border rounded w-full py-2 px-3'
              autoComplete='email'
              required
            />
          </div>

          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-gray-700 font-bold mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='border rounded w-full py-2 px-3'
              autoComplete='password'
              required
            />
          </div>

          
          <div className="flex flex-col gap-4">
            {/* Login */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>

            {/* Divider */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={loginWithGoogle}
              className="flex items-center justify-center gap-3 border border-gray-300 rounded px-4 py-2 hover:bg-gray-50 transition"
            >
              <img src="/google.svg" alt="Google" className="h-5 w-5" />
              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            {/* Register */}
            <p className="text-center text-sm">
              No account?{" "}
              <Link href="/register" className="text-blue-500 font-medium">
                Register
              </Link>
            </p>
          </div>

          
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
