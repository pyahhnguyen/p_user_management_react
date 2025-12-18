import { useState, useEffect } from 'react';
import type { User, UserFormData } from '../types/User';

interface UserFormProps {
  user?: User | null;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    fullName: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setFormData({
          fullName: user.fullName,
          email: user.email,
        });
      }, 0);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      email: '',
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        fullName: '',
        email: '',
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {user ? 'Edit User' : 'Add New User'}
      </h2>
      
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
            placeholder="Enter full name"
            className={`px-3 py-2 border rounded-md text-sm outline-none placeholder:text-gray-400 ${
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
            placeholder="Enter email"
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

        <div className="flex gap-2 mt-2">
          <button 
            type="submit" 
            className="flex-1 bg-gray-900 text-white border-none rounded-md py-2.5 px-4 text-sm font-medium cursor-pointer hover:bg-gray-800"
          >
            {user ? 'Update User' : 'Add User'}
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white text-gray-700 border border-gray-300 rounded-md py-2.5 px-4 text-sm font-medium cursor-pointer hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
