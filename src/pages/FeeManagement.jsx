import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  Download, 
  Calendar,
  IndianRupee,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';
import AddFeeRecordModal from '../components/AddFeeRecordModal';

const FeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [feeRecords, setFeeRecords] = useState([
    {
      id: 1,
      studentId: 'ST001',
      studentName: 'Alice Johnson',
      className: '10th A',
      feeType: 'Tuition Fee',
      amount: 15000,
      dueDate: '2024-01-15',
      paidDate: '2024-01-10',
      status: 'Paid',
      paymentMethod: 'Online',
      receiptNo: 'RCP001',
      remarks: 'Paid on time'
    },
    {
      id: 2,
      studentId: 'ST002',
      studentName: 'Bob Smith',
      className: '11th B',
      feeType: 'Tuition Fee',
      amount: 18000,
      dueDate: '2024-01-15',
      paidDate: null,
      status: 'Pending',
      paymentMethod: null,
      receiptNo: null,
      remarks: 'Payment pending'
    },
    {
      id: 3,
      studentId: 'ST003',
      studentName: 'Charlie Brown',
      className: '9th A',
      feeType: 'Transport Fee',
      amount: 5000,
      dueDate: '2024-01-10',
      paidDate: '2024-01-08',
      status: 'Paid',
      paymentMethod: 'Cash',
      receiptNo: 'RCP002',
      remarks: 'Transport fee paid'
    },
    {
      id: 4,
      studentId: 'ST004',
      studentName: 'Diana Prince',
      className: '12th C',
      feeType: 'Tuition Fee',
      amount: 20000,
      dueDate: '2024-01-15',
      paidDate: '2024-01-12',
      status: 'Paid',
      paymentMethod: 'Cheque',
      receiptNo: 'RCP003',
      remarks: 'Cheque cleared'
    },
    {
      id: 5,
      studentId: 'ST005',
      studentName: 'Edward Norton',
      className: '10th B',
      feeType: 'Library Fee',
      amount: 2000,
      dueDate: '2024-01-05',
      paidDate: null,
      status: 'Overdue',
      paymentMethod: null,
      receiptNo: null,
      remarks: 'Payment overdue'
    }
  ]);

  const feeTypes = ['Tuition Fee', 'Transport Fee', 'Library Fee', 'Laboratory Fee', 'Sports Fee', 'Examination Fee'];
  const paymentMethods = ['Cash', 'Online', 'Cheque', 'Bank Transfer', 'UPI'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const filteredRecords = feeRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.feeType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    const matchesMonth = selectedMonth === 'all' || 
                        new Date(record.dueDate).toLocaleString('default', { month: 'long' }) === selectedMonth;
    return matchesSearch && matchesStatus && matchesMonth;
  });

  // Calculate statistics
  const totalFees = feeRecords.reduce((sum, record) => sum + record.amount, 0);
  const paidFees = feeRecords.filter(record => record.status === 'Paid').reduce((sum, record) => sum + record.amount, 0);
  const pendingFees = feeRecords.filter(record => record.status === 'Pending').reduce((sum, record) => sum + record.amount, 0);
  const overdueFees = feeRecords.filter(record => record.status === 'Overdue').reduce((sum, record) => sum + record.amount, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'Overdue': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid': return <CheckCircle className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleAddFeeRecord = (newFeeRecord) => {
    setFeeRecords(prev => [newFeeRecord, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fee Management</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Fee Record</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Fees</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalFees.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <IndianRupee className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Paid Fees</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{paidFees.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Pending Fees</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">₹{pendingFees.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Overdue Fees</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">₹{overdueFees.toLocaleString()}</p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
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
                placeholder="Search by student name, ID, or fee type..."
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
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

      {/* Fee Records Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fee Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment Info</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {record.studentName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{record.studentName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{record.studentId} • {record.className}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{record.feeType}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{record.receiptNo && `Receipt: ${record.receiptNo}`}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">₹{record.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{new Date(record.dueDate).toLocaleDateString()}</div>
                    {record.paidDate && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">Paid: {new Date(record.paidDate).toLocaleDateString()}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      <span className="ml-1">{record.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{record.paymentMethod || '-'}</div>
                    {record.remarks && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">{record.remarks}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 p-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 p-1 rounded hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                        <Download className="h-4 w-4" />
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
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Fee Collection Report
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">₹{paidFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
              <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">₹{pendingFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Overdue</span>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">₹{overdueFees.toLocaleString()}</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            Defaulters List
          </h3>
          <div className="space-y-2">
            {feeRecords.filter(record => record.status === 'Overdue').slice(0, 3).map(record => (
              <div key={record.id} className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{record.studentName}</span>
                <span className="text-sm text-red-600 dark:text-red-400">₹{record.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            View All Defaulters
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Send Reminders
            </button>
            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Bulk Fee Update
            </button>
            <button className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Add Fee Record Modal */}
      <AddFeeRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddFeeRecord}
      />
    </div>
  );
};

export default FeeManagement; 