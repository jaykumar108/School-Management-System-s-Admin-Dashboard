import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Edit2, 
  Trash2, 
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  FileText,
  Star
} from 'lucide-react';

const HolidayCalendar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [holidays, setHolidays] = useState([
    {
      id: 1,
      name: 'Republic Day',
      date: '2024-01-26',
      type: 'National Holiday',
      description: 'Celebration of the adoption of the Constitution of India',
      isRecurring: true,
      status: 'Confirmed',
      location: 'All India',
      duration: '1 day'
    },
    {
      id: 2,
      name: 'Holi',
      date: '2024-03-25',
      type: 'Religious Holiday',
      description: 'Festival of colors celebrating spring and love',
      isRecurring: true,
      status: 'Confirmed',
      location: 'All India',
      duration: '1 day'
    },
    {
      id: 3,
      name: 'Independence Day',
      date: '2024-08-15',
      type: 'National Holiday',
      description: 'Celebration of India\'s independence from British rule',
      isRecurring: true,
      status: 'Confirmed',
      location: 'All India',
      duration: '1 day'
    },
    {
      id: 4,
      name: 'Diwali',
      date: '2024-11-01',
      type: 'Religious Holiday',
      description: 'Festival of lights celebrating the victory of light over darkness',
      isRecurring: true,
      status: 'Confirmed',
      location: 'All India',
      duration: '1 day'
    },
    {
      id: 5,
      name: 'Christmas',
      date: '2024-12-25',
      type: 'Religious Holiday',
      description: 'Celebration of the birth of Jesus Christ',
      isRecurring: true,
      status: 'Confirmed',
      location: 'All India',
      duration: '1 day'
    },
    {
      id: 6,
      name: 'School Annual Day',
      date: '2024-02-15',
      type: 'School Event',
      description: 'Annual celebration of school achievements and performances',
      isRecurring: false,
      status: 'Confirmed',
      location: 'School Campus',
      duration: '1 day'
    },
    {
      id: 7,
      name: 'Summer Vacation',
      date: '2024-05-15',
      type: 'Academic Break',
      description: 'Summer vacation for students and teachers',
      isRecurring: true,
      status: 'Confirmed',
      location: 'All India',
      duration: '45 days'
    },
    {
      id: 8,
      name: 'Teacher Training Day',
      date: '2024-04-10',
      type: 'Professional Development',
      description: 'Staff training and professional development day',
      isRecurring: false,
      status: 'Pending',
      location: 'School Campus',
      duration: '1 day'
    }
  ]);

  const holidayTypes = [
    'National Holiday',
    'Religious Holiday', 
    'School Event',
    'Academic Break',
    'Professional Development',
    'Local Holiday',
    'Other'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const statuses = ['Confirmed', 'Pending', 'Cancelled'];

  const filteredHolidays = holidays.filter(holiday => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         holiday.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         holiday.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = selectedMonth === 'all' || 
                        new Date(holiday.date).toLocaleString('default', { month: 'long' }) === selectedMonth;
    const matchesType = selectedType === 'all' || holiday.type === selectedType;
    return matchesSearch && matchesMonth && matchesType;
  });

  // Calculate statistics
  const totalHolidays = holidays.length;
  const confirmedHolidays = holidays.filter(h => h.status === 'Confirmed').length;
  const pendingHolidays = holidays.filter(h => h.status === 'Pending').length;
  const recurringHolidays = holidays.filter(h => h.isRecurring).length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'Cancelled': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'National Holiday': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'Religious Holiday': return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      case 'School Event': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'Academic Break': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Professional Development': return 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const handleAddHoliday = (newHoliday) => {
    setHolidays(prev => [newHoliday, ...prev]);
  };

  const getUpcomingHolidays = () => {
    const today = new Date();
    return holidays
      .filter(holiday => new Date(holiday.date) > today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Holiday Calendar</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Holiday</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Holidays</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalHolidays}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Confirmed</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{confirmedHolidays}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingHolidays}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Recurring</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{recurringHolidays}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
              <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search holidays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Types</option>
                {holidayTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Months</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Holiday List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Holiday</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredHolidays.map((holiday) => (
                <tr key={holiday.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{holiday.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{holiday.description}</div>
                      {holiday.isRecurring && (
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="text-xs text-yellow-600 dark:text-yellow-400">Recurring</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(holiday.date).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(holiday.type)}`}>
                      {holiday.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {holiday.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(holiday.status)}`}>
                      {getStatusIcon(holiday.status)}
                      <span className="ml-1">{holiday.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{holiday.duration}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Upcoming Holidays
          </h3>
          <div className="space-y-3">
            {getUpcomingHolidays().map(holiday => (
              <div key={holiday.id} className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{holiday.name}</span>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {new Date(holiday.date).toLocaleDateString()}
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(holiday.type)}`}>
                  {holiday.type}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            View All Upcoming
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            Holiday Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">National Holidays</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {holidays.filter(h => h.type === 'National Holiday').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Religious Holidays</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {holidays.filter(h => h.type === 'Religious Holiday').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">School Events</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {holidays.filter(h => h.type === 'School Event').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Academic Breaks</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {holidays.filter(h => h.type === 'Academic Break').length}
              </span>
            </div>
          </div>
          <button className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Generate Report
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Import Calendar
            </button>
            <button className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
              Export Holidays
            </button>
            <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Sync with Google Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayCalendar; 