
import React from 'react';

const loginPage = () => {
  return (
    <main>
         
    <div className="flex min-h-screen">
      {/* Left Side: Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-black   justify-center items-center">
        {/* Replace this with your illustration */}
        <img
          src="/path/to/your/illustration.svg" // Update with your illustration path
          alt="Illustration"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Right Side: Login Area */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-8">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="******"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>

    </main>
  );
};

export default loginPage;