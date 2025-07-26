import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Clock,
  Award,
  IndianRupee,
  Activity,
  Target,
  Bell
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const { sendNotification } = useNotification();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const chartVariants = {
    hidden: { 
      opacity: 0, 
      x: -20
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    { title: 'Total Students', value: '1,234', icon: Users, color: 'bg-blue-500', change: '+12%', trend: 'up' },
    { title: 'Total Teachers', value: '87', icon: UserCheck, color: 'bg-green-500', change: '+3%', trend: 'up' },
    { title: 'Active Classes', value: '156', icon: BookOpen, color: 'bg-purple-500', change: '+8%', trend: 'up' },
    { title: 'Monthly Revenue', value: '₹45,678', icon: IndianRupee, color: 'bg-amber-500', change: '+15%', trend: 'up' },
  ];

  const enrollmentData = [
    { month: 'Jan', students: 1100, teachers: 75 },
    { month: 'Feb', students: 1150, teachers: 78 },
    { month: 'Mar', students: 1180, teachers: 80 },
    { month: 'Apr', students: 1200, teachers: 82 },
    { month: 'May', students: 1220, teachers: 85 },
    { month: 'Jun', students: 1234, teachers: 87 },
  ];

  const performanceData = [
    { subject: 'Math', average: 85, students: 320 },
    { subject: 'Science', average: 78, students: 280 },
    { subject: 'English', average: 82, students: 350 },
    { subject: 'History', average: 75, students: 240 },
    { subject: 'Art', average: 88, students: 180 },
    { subject: 'PE', average: 92, students: 400 },
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 245, color: '#10B981' },
    { grade: 'A', count: 320, color: '#3B82F6' },
    { grade: 'B+', count: 280, color: '#8B5CF6' },
    { grade: 'B', count: 220, color: '#F59E0B' },
    { grade: 'C+', count: 120, color: '#EF4444' },
    { grade: 'C', count: 49, color: '#6B7280' },
  ];

  const attendanceData = [
    { day: 'Mon', attendance: 95 },
    { day: 'Tue', attendance: 92 },
    { day: 'Wed', attendance: 88 },
    { day: 'Thu', attendance: 94 },
    { day: 'Fri', attendance: 89 },
    { day: 'Sat', attendance: 85 },
    { day: 'Sun', attendance: 78 },
  ];

  const recentActivities = [
    { id: 1, action: 'New student enrolled', name: 'John Doe', time: '2 hours ago', type: 'enrollment' },
    { id: 2, action: 'Teacher assigned to class', name: 'Sarah Wilson', time: '4 hours ago', type: 'assignment' },
    { id: 3, action: 'Grade published', name: 'Math 101', time: '6 hours ago', type: 'grade' },
    { id: 4, action: 'Parent-teacher meeting scheduled', name: 'Emma Johnson', time: '8 hours ago', type: 'meeting' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Science Fair', date: '2024-01-15', time: '09:00 AM' },
    { id: 2, title: 'Parent-Teacher Conference', date: '2024-01-18', time: '02:00 PM' },
    { id: 3, title: 'Sports Day', date: '2024-01-22', time: '10:00 AM' },
    { id: 4, title: 'Mid-term Exams Start', date: '2024-01-25', time: '08:00 AM' },
  ];

  const handleTestNotification = () => {
    const titles = [
      'Welcome to EduAdmin!',
      'New Assignment Posted',
      'Parent-Teacher Meeting Reminder',
      'Grade Report Available',
      'School Event Update'
    ];
    
    const bodies = [
      'Your school management dashboard is ready to use.',
      'A new assignment has been posted for Mathematics class.',
      'Don\'t forget about the parent-teacher meeting tomorrow at 2 PM.',
      'Your quarterly grade report is now available for download.',
      'The science fair has been rescheduled to next Friday.'
    ];

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomBody = bodies[Math.floor(Math.random() * bodies.length)];
    
    sendNotification(randomTitle, randomBody);
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div 
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <div>
          <motion.h1 
            className="text-3xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Dashboard
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 mt-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Welcome back! Here's what's happening at your school today.
          </motion.p>
        </div>
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <motion.button
            onClick={handleTestNotification}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="h-4 w-4" />
            <span>Test Notification</span>
          </motion.button>
          <motion.div 
            className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            Last updated: {new Date().toLocaleString()}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.title} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              custom={index}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <motion.p 
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <div className="flex items-center">
                    <motion.div
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    </motion.div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">{stat.change}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">vs last month</span>
                  </div>
                </div>
                <motion.div 
                  className={`${stat.color} p-4 rounded-xl shadow-lg`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                >
                  <Icon className="h-8 w-8 text-white" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        {/* Enrollment Trends */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          variants={chartVariants}
          whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Enrollment Trends</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">Students</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">Teachers</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={enrollmentData}>
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTeachers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Area
                type="monotone"
                dataKey="students"
                stroke="#3B82F6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorStudents)"
              />
              <Area
                type="monotone"
                dataKey="teachers"
                stroke="#10B981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorTeachers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Subject Performance */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          variants={chartVariants}
          whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Subject Performance</h2>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Award className="h-5 w-5 text-amber-500" />
            </motion.div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="subject" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar 
                dataKey="average" 
                fill="#8B5CF6" 
                radius={[4, 4, 0, 0]}
                name="Average Score"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {/* Grade Distribution */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          variants={cardVariants}
          whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Grade Distribution</h2>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Target className="h-5 w-5 text-blue-500" />
            </motion.div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={gradeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
              >
                {gradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {gradeDistribution.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-center text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-600 dark:text-gray-400">{item.grade}: {item.count}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Attendance */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          variants={cardVariants}
          whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Weekly Attendance</h2>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Activity className="h-5 w-5 text-green-500" />
            </motion.div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} domain={[70, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Average: <span className="font-semibold text-green-600 dark:text-green-400">89.3%</span></p>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
        >
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white"
            variants={cardVariants}
            whileHover={{ y: -3, scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">This Month</p>
                <p className="text-2xl font-bold">98.5%</p>
                <p className="text-blue-100 text-sm">Overall Satisfaction</p>
              </div>
              <motion.div 
                className="bg-white bg-opacity-20 p-3 rounded-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <TrendingUp className="h-8 w-8" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white"
            variants={cardVariants}
            whileHover={{ y: -3, scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Active Today</p>
                <p className="text-2xl font-bold">1,156</p>
                <p className="text-green-100 text-sm">Students Online</p>
              </div>
              <motion.div 
                className="bg-white bg-opacity-20 p-3 rounded-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Users className="h-8 w-8" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-sm p-6 text-white"
            variants={cardVariants}
            whileHover={{ y: -3, scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">This Week</p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-purple-100 text-sm">New Enrollments</p>
              </div>
              <motion.div 
                className="bg-white bg-opacity-20 p-3 rounded-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Award className="h-8 w-8" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        {/* Recent Activities */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          variants={cardVariants}
          whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
            </motion.div>
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div 
                key={activity.id} 
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ x: 5, backgroundColor: "#f9fafb" }}
              >
                <motion.div 
                  className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"
                  whileHover={{ scale: 1.5 }}
                ></motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.action}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{activity.name}</p>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.time}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button 
            className="w-full mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium py-2 border-t border-gray-100 dark:border-gray-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Activities
          </motion.button>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          variants={cardVariants}
          whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Calendar className="h-5 w-5 mr-2 text-green-500" />
            </motion.div>
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <motion.div 
                key={event.id} 
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ x: 5, backgroundColor: "#f9fafb" }}
              >
                <motion.div 
                  className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{event.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.date} at {event.time}</p>
                </div>
                <motion.button 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  View
                </motion.button>
              </motion.div>
            ))}
          </div>
          <motion.button 
            className="w-full mt-4 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium py-2 border-t border-gray-100 dark:border-gray-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Calendar
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;