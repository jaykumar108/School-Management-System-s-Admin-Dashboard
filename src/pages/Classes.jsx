import React, { useState } from 'react';
import { Search, Plus, Clock, Users, BookOpen, Calendar } from 'lucide-react';
import CreateClassModal from '../components/CreateClassModal';

const Classes = () => {
  const [selectedView, setSelectedView] = useState('grid');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Advanced Mathematics',
      code: 'MATH-401',
      teacher: 'Dr. Sarah Wilson',
      grade: '10th',
      students: 28,
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      room: 'Room 201',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Physics Laboratory',
      code: 'PHYS-301',
      teacher: 'Prof. Michael Chen',
      grade: '11th',
      students: 24,
      schedule: 'Tue, Thu - 2:00 PM',
      room: 'Lab 105',
      status: 'Active'
    },
    {
      id: 3,
      name: 'English Literature',
      code: 'ENG-201',
      teacher: 'Ms. Emily Rodriguez',
      grade: '9th',
      students: 32,
      schedule: 'Mon, Wed, Fri - 11:00 AM',
      room: 'Room 103',
      status: 'Active'
    },
    {
      id: 4,
      name: 'World History',
      code: 'HIST-301',
      teacher: 'Mr. James Thompson',
      grade: '11th',
      students: 26,
      schedule: 'Tue, Thu - 10:00 AM',
      room: 'Room 205',
      status: 'Suspended'
    },
    {
      id: 5,
      name: 'Biology Lab',
      code: 'BIO-401',
      teacher: 'Dr. Lisa Anderson',
      grade: '12th',
      students: 20,
      schedule: 'Wed, Fri - 1:00 PM',
      room: 'Lab 202',
      status: 'Active'
    },
    {
      id: 6,
      name: 'Computer Science',
      code: 'CS-301',
      teacher: 'Mr. David Kim',
      grade: '10th',
      students: 30,
      schedule: 'Mon, Wed, Fri - 3:00 PM',
      room: 'Computer Lab',
      status: 'Active'
    },
  ]);

  const handleCreateClass = (newClass) => {
    setClasses(prev => [newClass, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Classes Management</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Class</span>
        </button>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search classes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="all">All Grades</option>
              <option value="9th">9th Grade</option>
              <option value="10th">10th Grade</option>
              <option value="11th">11th Grade</option>
              <option value="12th">12th Grade</option>
            </select>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div key={classItem.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{classItem.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{classItem.code}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                classItem.status === 'Active' 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}>
                {classItem.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">{classItem.teacher}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <span>{classItem.students} students • {classItem.grade}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span>{classItem.schedule}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span>{classItem.room}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                View Details
              </button>
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm transition-colors">Edit</button>
                <button className="text-red-400 dark:text-red-500 hover:text-red-600 dark:hover:text-red-300 text-sm transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Schedule Overview</h2>
        <div className="grid grid-cols-5 gap-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
            <div key={day} className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-white text-center pb-2 border-b border-gray-200 dark:border-gray-700">{day}</h3>
              <div className="space-y-1">
                {classes
                  .filter(c => c.schedule.includes(day.slice(0, 3)))
                  .map(c => (
                    <div key={c.id} className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-xs">
                      <div className="font-medium text-blue-900 dark:text-blue-200">{c.name}</div>
                      <div className="text-blue-600 dark:text-blue-300">{c.schedule.split(' - ')[1]}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Class Modal */}
      <CreateClassModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateClass}
      />
    </div>
  );
};

export default Classes;