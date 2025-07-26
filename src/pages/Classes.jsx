import React, { useState } from 'react';
import { Search, Plus, Clock, Users, BookOpen, Calendar } from 'lucide-react';

const Classes = () => {
  const [selectedView, setSelectedView] = useState('grid');

  const classes = [
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
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Classes Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Class</span>
        </button>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search classes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
          <div key={classItem.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{classItem.name}</h3>
                <p className="text-sm text-gray-600">{classItem.code}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                classItem.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {classItem.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                <span className="font-medium">{classItem.teacher}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <span>{classItem.students} students • {classItem.grade}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span>{classItem.schedule}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span>{classItem.room}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600 text-sm">Edit</button>
                <button className="text-red-400 hover:text-red-600 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule Overview</h2>
        <div className="grid grid-cols-5 gap-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
            <div key={day} className="space-y-2">
              <h3 className="font-medium text-gray-900 text-center pb-2 border-b">{day}</h3>
              <div className="space-y-1">
                {classes
                  .filter(c => c.schedule.includes(day.slice(0, 3)))
                  .map(c => (
                    <div key={c.id} className="bg-blue-50 p-2 rounded text-xs">
                      <div className="font-medium text-blue-900">{c.name}</div>
                      <div className="text-blue-600">{c.schedule.split(' - ')[1]}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;