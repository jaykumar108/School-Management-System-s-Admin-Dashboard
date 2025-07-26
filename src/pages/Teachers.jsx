import React, { useState } from 'react';
import { Search, Plus, Filter, Edit2, Trash2, Eye, Mail, Phone } from 'lucide-react';
import AddTeacherModal from '../components/AddTeacherModal';

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [teachers, setTeachers] = useState([
    { 
      id: 1, 
      name: 'Dr. Sarah Wilson', 
      email: 'sarah@school.edu', 
      phone: '+1234567890',
      department: 'Mathematics', 
      subject: 'Advanced Mathematics',
      experience: '8 years',
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Prof. Michael Chen', 
      email: 'michael@school.edu', 
      phone: '+1234567891',
      department: 'Science', 
      subject: 'Physics & Chemistry',
      experience: '12 years',
      status: 'Active' 
    },
    { 
      id: 3, 
      name: 'Ms. Emily Rodriguez', 
      email: 'emily@school.edu', 
      phone: '+1234567892',
      department: 'English', 
      subject: 'Literature & Writing',
      experience: '6 years',
      status: 'Active' 
    },
    { 
      id: 4, 
      name: 'Mr. James Thompson', 
      email: 'james@school.edu', 
      phone: '+1234567893',
      department: 'History', 
      subject: 'World History',
      experience: '10 years',
      status: 'On Leave' 
    },
    { 
      id: 5, 
      name: 'Dr. Lisa Anderson', 
      email: 'lisa@school.edu', 
      phone: '+1234567894',
      department: 'Science', 
      subject: 'Biology',
      experience: '15 years',
      status: 'Active' 
    },
  ]);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = ['Mathematics', 'Science', 'English', 'History', 'Arts', 'Physical Education'];

  const handleAddTeacher = (newTeacher) => {
    setTeachers(prev => [newTeacher, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teachers Management</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Teacher</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{teacher.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{teacher.department}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                  teacher.status === 'Active' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                    : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {teacher.status}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                {teacher.email}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {teacher.phone}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Subject</p>
                  <p className="font-medium text-gray-900 dark:text-white">{teacher.subject}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Experience</p>
                  <p className="font-medium text-gray-900 dark:text-white">{teacher.experience}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <Eye className="h-4 w-4" />
              </button>
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Edit2 className="h-4 w-4" />
              </button>
              <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Teacher Modal */}
      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddTeacher}
      />
    </div>
  );
};

export default Teachers;