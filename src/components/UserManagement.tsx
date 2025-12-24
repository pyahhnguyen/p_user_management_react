import { useEffect } from 'react';
import { type User } from '../types/User';
import UserList from './UserList';
import UserForm from './UserForm';
import { useUserStore } from '../stores/userStore';
import { useAuthStore } from '../stores/authStore';

function UserManagement() {
  const {
    users,
    searchTerm,
    editingUser,
    showForm,
    setSearchTerm,
    setEditingUser,
    setShowForm,
    addUser,
    updateUser,
    deleteUser,
    loadUsers,
    getFilteredUsers,
  } = useUserStore();

  const { logout } = useAuthStore();

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your users </p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>

        Search and Add Button
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex-1 w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-gray-900 placeholder:text-gray-400"
              />
            </div>
            <button
              onClick={() => {
                setEditingUser(null);
                setShowForm(!showForm);
              }}
              className="w-full sm:w-auto bg-gray-900 text-white border-none rounded-md py-2 px-4 text-sm font-medium cursor-pointer hover:bg-gray-800"
            >
              {showForm ? 'Hide Form' : '+ Add New User'}
            </button>
          </div>
        </div>

        {/* User Form */}
        {showForm && (
          <div className="mb-6">
            <UserForm
              user={editingUser}
              onSubmit={editingUser ? updateUser : addUser}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* Statistics */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{users.length}</p>
        </div>

        {/* User List */}
        <UserList
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={deleteUser}
        />
      </div>
    </div>
  );
}

export default UserManagement;
