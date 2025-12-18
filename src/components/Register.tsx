import { useState } from 'react';
import type { Account } from '../types/User';

interface RegisterProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess: () => void;
}

function Register({ onSwitchToLogin, onRegisterSuccess }: RegisterProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAgreedToTerms(isChecked);
    
    if (isChecked && errors.terms) {
      setErrors(prev => ({ ...prev, terms: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: '',
    };
    let isValid = true;

    // Full name validation
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Terms agreement
    if (!agreedToTerms) {
      newErrors.terms = 'Please agree to the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  // handle submit register
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // get existing accounts from localStorage
      const existingAccounts: Account[] = JSON.parse(localStorage.getItem('accounts') || '[]');
      
      // Check if email already exists
      const emailExists = existingAccounts.some(
        (acc: Account) => acc.email.toLowerCase() === formData.email.toLowerCase()
      );
      
      if (emailExists) {
        setErrors(prev => ({
          ...prev,
          email: 'This email is already registered'
        }));
        return;
      }
      
      // create new account and save to localStorage
      const newAccount = { 
        email: formData.email, 
        password: formData.password, 
        fullName: formData.fullName 
      };
      
      localStorage.setItem('accounts', JSON.stringify([...existingAccounts, newAccount]));
      console.log('Account created:', newAccount);
      
      // Reset form & redirect to login
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
      setAgreedToTerms(false);
      onRegisterSuccess(); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-5">
      <div className="bg-white rounded-lg border border-gray-200 p-8 w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-gray-900 text-2xl font-semibold mb-2">Create Account</h1>
          <p className="text-gray-500 text-sm">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className="text-gray-700 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`px-3 py-2 border rounded-md text-sm outline-none placeholder:text-gray-400 text-gray-900 ${
                errors.fullName 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-gray-900'
              }`}
            />
            {errors.fullName && (
              <span className="text-red-500 text-xs">{errors.fullName}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-gray-700 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`px-3 py-2 border rounded-md text-sm outline-none placeholder:text-gray-400 ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-gray-900'
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-gray-700 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={`px-3 py-2 border rounded-md text-sm outline-none placeholder:text-gray-400 ${
                errors.password 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-gray-900'
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">{errors.password}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-gray-700 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`px-3 py-2 border rounded-md text-sm outline-none placeholder:text-gray-400 ${
                errors.confirmPassword 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-gray-900'
              }`}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">{errors.confirmPassword}</span>
            )}
          </div>


          {/* // check box terms and conditions */}
          <div className='flex flex-col mt-2'>
          <div className="flex items-start gap-2 text-sm">
            <input 
              type="checkbox" 
              checked={agreedToTerms}
              onChange={handleCheckboxChange}
              className="w-4 h-4 mt-0.5 cursor-pointer accent-gray-900"
            />
            <label className="cursor-pointer text-gray-600 leading-tight">
              I agree to the{' '}
              <a href="#" className="text-gray-900 font-medium no-underline hover:underline">
                Terms & Conditions
              </a>
            </label>
            </div>

            {errors.terms && (
              <span className="text-red-500 text-xs mt-1 ml-6">{errors.terms}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="bg-gray-900 text-white border-none rounded-md py-2.5 px-4 text-sm font-medium cursor-pointer hover:bg-gray-800 mt-2"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm m-0">
            Already have an account?{' '}
            <button 
              onClick={onSwitchToLogin} 
              className="bg-transparent border-none text-gray-900 font-medium cursor-pointer p-0 text-sm hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
