import React, { useState } from 'react';
import { X, BookOpen, User, Calendar, MapPin, Save, Loader2, Clock, Users, Hash } from 'lucide-react';

const CreateClassModal = ({ isOpen, onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    teacher: '',
    grade: '',
    maxStudents: '',
    room: '',
    schedule: {
      monday: { enabled: false, startTime: '', endTime: '' },
      tuesday: { enabled: false, startTime: '', endTime: '' },
      wednesday: { enabled: false, startTime: '', endTime: '' },
      thursday: { enabled: false, startTime: '', endTime: '' },
      friday: { enabled: false, startTime: '', endTime: '' },
      saturday: { enabled: false, startTime: '', endTime: '' }
    },
    description: '',
    subject: '',
    academicYear: new Date().getFullYear().toString(),
    semester: '1',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  const grades = ['9th', '10th', '11th', '12th'];
  const semesters = ['1', '2'];
  const statuses = ['Active', 'Inactive', 'Suspended'];
  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History',
    'Geography',
    'Computer Science',
    'Economics',
    'Literature',
    'Art',
    'Music',
    'Physical Education',
    'Other'
  ];

  // Sample teachers - in real app this would come from props or API
  const teachers = [
    'Dr. Sarah Wilson',
    'Prof. Michael Chen',
    'Ms. Emily Rodriguez',
    'Mr. James Thompson',
    'Dr. Lisa Anderson',
    'Mr. David Kim',
    'Mrs. Jennifer Brown',
    'Mr. Robert Johnson'
  ];

  const rooms = [
    'Room 101',
    'Room 102',
    'Room 103',
    'Room 201',
    'Room 202',
    'Room 203',
    'Room 205',
    'Lab 105',
    'Lab 202',
    'Computer Lab',
    'Art Studio',
    'Music Room',
    'Gymnasium',
    'Auditorium'
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleScheduleChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          [field]: value
        }
      }
    }));
  };

  const generateClassCode = () => {
    const subject = formData.subject.slice(0, 3).toUpperCase();
    const grade = formData.grade.replace('th', '');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${subject}-${grade}${random}`;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Class name is required';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Class code is required';
    }

    if (!formData.teacher) {
      newErrors.teacher = 'Teacher is required';
    }

    if (!formData.grade) {
      newErrors.grade = 'Grade is required';
    }

    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.maxStudents || formData.maxStudents <= 0) {
      newErrors.maxStudents = 'Valid maximum students is required';
    }

    if (!formData.room) {
      newErrors.room = 'Room is required';
    }

    // Check if at least one day is scheduled
    const hasSchedule = Object.values(formData.schedule).some(day => day.enabled);
    if (!hasSchedule) {
      newErrors.schedule = 'At least one day must be scheduled';
    }

    // Validate schedule times for enabled days
    Object.entries(formData.schedule).forEach(([day, schedule]) => {
      if (schedule.enabled) {
        if (!schedule.startTime) {
          newErrors[`${day}Start`] = 'Start time is required';
        }
        if (!schedule.endTime) {
          newErrors[`${day}End`] = 'End time is required';
        }
        if (schedule.startTime && schedule.endTime && schedule.startTime >= schedule.endTime) {
          newErrors[`${day}Time`] = 'End time must be after start time';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Format schedule for display
      const scheduleDays = Object.entries(formData.schedule)
        .filter(([day, schedule]) => schedule.enabled)
        .map(([day, schedule]) => `${day.charAt(0).toUpperCase() + day.slice(1, 3)} - ${schedule.startTime}`)
        .join(', ');

      const newClass = {
        id: Date.now(),
        name: formData.name,
        code: formData.code,
        teacher: formData.teacher,
        grade: formData.grade,
        students: 0, // New class starts with 0 students
        schedule: scheduleDays,
        room: formData.room,
        status: formData.status,
        subject: formData.subject,
        maxStudents: parseInt(formData.maxStudents),
        description: formData.description,
        academicYear: formData.academicYear,
        semester: formData.semester,
        scheduleDetails: formData.schedule
      };

      onSave(newClass);
      handleClose();
    } catch (error) {
      console.error('Error creating class:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      code: '',
      teacher: '',
      grade: '',
      maxStudents: '',
      room: '',
      schedule: {
        monday: { enabled: false, startTime: '', endTime: '' },
        tuesday: { enabled: false, startTime: '', endTime: '' },
        wednesday: { enabled: false, startTime: '', endTime: '' },
        thursday: { enabled: false, startTime: '', endTime: '' },
        friday: { enabled: false, startTime: '', endTime: '' },
        saturday: { enabled: false, startTime: '', endTime: '' }
      },
      description: '',
      subject: '',
      academicYear: new Date().getFullYear().toString(),
      semester: '1',
      status: 'Active'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Create New Class</h2>
              <p className="text-sm text-gray-500">Set up a new class with schedule and details</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Advanced Mathematics"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class Code *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.code ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., MATH-401"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, code: generateClassCode() }))}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      Generate
                    </button>
                  </div>
                  {errors.code && (
                    <p className="text-red-500 text-xs mt-1">{errors.code}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Level *
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.grade ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Grade</option>
                    {grades.map(grade => (
                      <option key={grade} value={grade}>{grade} Grade</option>
                    ))}
                  </select>
                  {errors.grade && (
                    <p className="text-red-500 text-xs mt-1">{errors.grade}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Teacher and Room Assignment */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-green-600" />
                Teacher & Room Assignment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Teacher *
                  </label>
                  <select
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.teacher ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                      <option key={teacher} value={teacher}>{teacher}</option>
                    ))}
                  </select>
                  {errors.teacher && (
                    <p className="text-red-500 text-xs mt-1">{errors.teacher}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Assignment *
                  </label>
                  <select
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.room ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Room</option>
                    {rooms.map(room => (
                      <option key={room} value={room}>{room}</option>
                    ))}
                  </select>
                  {errors.room && (
                    <p className="text-red-500 text-xs mt-1">{errors.room}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Students *
                  </label>
                  <input
                    type="number"
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.maxStudents ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 30"
                    min="1"
                    max="100"
                  />
                  {errors.maxStudents && (
                    <p className="text-red-500 text-xs mt-1">{errors.maxStudents}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-purple-600" />
                Class Schedule *
              </h3>
              {errors.schedule && (
                <p className="text-red-500 text-xs mb-2">{errors.schedule}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(formData.schedule).map(([day, schedule]) => (
                  <div key={day} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        checked={schedule.enabled}
                        onChange={(e) => handleScheduleChange(day, 'enabled', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-700 capitalize">
                        {day}
                      </label>
                    </div>
                    
                    {schedule.enabled && (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Start Time</label>
                          <select
                            value={schedule.startTime}
                            onChange={(e) => handleScheduleChange(day, 'startTime', e.target.value)}
                            className={`w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent ${
                              errors[`${day}Start`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select Time</option>
                            {timeSlots.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                          {errors[`${day}Start`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`${day}Start`]}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">End Time</label>
                          <select
                            value={schedule.endTime}
                            onChange={(e) => handleScheduleChange(day, 'endTime', e.target.value)}
                            className={`w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent ${
                              errors[`${day}End`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select Time</option>
                            {timeSlots.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                          {errors[`${day}End`] && (
                            <p className="text-red-500 text-xs mt-1">{errors[`${day}End`]}</p>
                          )}
                        </div>
                        
                        {errors[`${day}Time`] && (
                          <p className="text-red-500 text-xs">{errors[`${day}Time`]}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-amber-600" />
                Academic Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Semester
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {semesters.map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                Additional Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter class description, objectives, or special requirements..."
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Create Class</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClassModal; 