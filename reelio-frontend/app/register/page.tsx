"use client"
import React, {useState} from 'react';

const registerUser = async (username: string, email: string, password: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    try {
        const response = await fetch(`${API_URL}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};



const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const passwordValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!passwordValidation.test(formData.password)) {
      setError('Password must be at least 8 characters long, contain a number, a special character, and an uppercase letter.');
      setLoading(false);
      return;
    }


    try {
      await registerUser(formData.username, formData.email, formData.password);
      setSuccess('Registration successful!');
      window.location.href = '/login';
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('NetworkError')) {
          setError('Network error. Please check your internet connection and try again.');
        } else if (error.message.includes('400')) {
          setError('Invalid input. Please check your username, email, and password.');
        } else if (error.message.includes('500')) {
          setError('Server error. Please try again later.');
        } else {
          setError('Could not connect to API.');
        }
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-black justify-center items-center">

        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-8">
          <div className="max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  placeholder="username"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={handleChange}
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
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  placeholder="******"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <div>
              <p className="text-center mt-4">
                Already have an account?{' '}
                <a href="/login" className="text-blue-500 hover:underline">
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;