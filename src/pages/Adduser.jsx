import React, { useState } from 'react';
import { Camera, Users } from 'lucide-react';

const AddUser = ({ onAddUser, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    initials: '',
    role: '',
    responsibilities: []
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResponsibilityChange = (responsibility) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.includes(responsibility)
        ? prev.responsibilities.filter(r => r !== responsibility)
        : [...prev.responsibilities, responsibility]
    }));
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      title: '',
      initials: '',
      role: '',
      responsibilities: []
    });
    setProfileImage(null);
    if (onCancel) {
      onCancel();
    }
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.role) {
      alert('Please fill in all required fields (Name, Email, Role)');
      return;
    }

    const newUser = {
      id: Date.now(), 
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'NIL',
      title: formData.title || 'NIL',
      initials: formData.initials || 'NIL',
      role: formData.role,
      status: 'Active',
      responsibilities: formData.responsibilities,
      profileImage: profileImage
    };

    console.log('Saving user data:', newUser);
    
    if (onAddUser) {
      onAddUser(newUser);
    }
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      title: '',
      initials: '',
      role: '',
      responsibilities: []
    });
    setProfileImage(null);
  };

  const responsibilities = [
    'Designer',
    'Project Manager', 
    'Production Manager',
    'Sales Rep'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Add New User</h1>
        <div className="flex items-center text-gray-500 text-sm">
          <Users className="w-4 h-4 mr-1" />
          <span>Users - Add New User</span>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-4 border-blue-200 overflow-hidden">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profile-upload"
          />
          <label
            htmlFor="profile-upload"
            className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors cursor-pointer"
          >
            <Camera className="w-4 h-4" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter your title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        {/* Initials */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initials
          </label>
          <input
            type="text"
            name="initials"
            value={formData.initials}
            onChange={handleInputChange}
            placeholder="Enter your initials"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role<span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
          >
            <option value="">Select your role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
            <option value="contractor">Contractor</option>
          </select>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Responsibilities
        </label>
        <div className="space-y-3">
          {responsibilities.map((responsibility) => (
            <label key={responsibility} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.responsibilities.includes(responsibility)}
                onChange={() => handleResponsibilityChange(responsibility)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700">{responsibility}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
        <button
          onClick={handleCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddUser;