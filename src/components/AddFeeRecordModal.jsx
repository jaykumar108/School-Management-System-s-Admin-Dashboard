import React, { useState } from 'react';
import { X, IndianRupee, User, Calendar, FileText, Save, Loader2, Search, CheckCircle } from 'lucide-react';

const AddFeeRecordModal = ({ isOpen, onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    feeType: '',
    amount: '',
    dueDate: '',
    paymentMethod: '',
    remarks: '',
    isPaid: false,
    paidDate: '',
    receiptNo: ''
  });

  const [errors, setErrors] = useState({});

  // Sample students data - in real app this would come from props or API
  const students = [
    { id: 'ST001', name: 'Alice Johnson', className: '10th A' },
    { id: 'ST002', name: 'Bob Smith', className: '11th B' },
    { id: 'ST003', name: 'Charlie Brown', className: '9th A' },
    { id: 'ST004', name: 'Diana Prince', className: '12th C' },
    { id: 'ST005', name: 'Edward Norton', className: '10th B' },
    { id: 'ST006', name: 'Fiona Green', className: '11th A' },
    { id: 'ST007', name: 'George Wilson', className: '9th B' },
    { id: 'ST008', name: 'Helen Davis', className: '12th A' },
  ];

  const feeTypes = [
    'Tuition Fee',
    'Transport Fee', 
    'Library Fee',
    'Laboratory Fee',
    'Sports Fee',
    'Examination Fee',
    'Computer Fee',
    'Art & Craft Fee',
    'Music Fee',
    'Other'
  ];

  const paymentMethods = [
    'Cash',
    'Online',
    'Cheque',
    'Bank Transfer',
    'UPI',
    'Credit Card',
    'Debit Card'
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setSearchTerm(student.name);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedStudent) {
      newErrors.student = 'Please select a student';
    }

    if (!formData.feeType) {
      newErrors.feeType = 'Fee type is required';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Valid amount is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (formData.isPaid) {
      if (!formData.paymentMethod) {
        newErrors.paymentMethod = 'Payment method is required for paid fees';
      }
      if (!formData.paidDate) {
        newErrors.paidDate = 'Payment date is required for paid fees';
      }
    }

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
      
      const newFeeRecord = {
        id: Date.now(),
        studentId: selectedStudent.id,
        studentName: selectedStudent.name,
        className: selectedStudent.className,
        feeType: formData.feeType,
        amount: parseFloat(formData.amount),
        dueDate: formData.dueDate,
        paidDate: formData.isPaid ? formData.paidDate : null,
        status: formData.isPaid ? 'Paid' : 'Pending',
        paymentMethod: formData.isPaid ? formData.paymentMethod : null,
        receiptNo: formData.isPaid ? formData.receiptNo : null,
        remarks: formData.remarks
      };

      onSave(newFeeRecord);
      handleClose();
    } catch (error) {
      console.error('Error adding fee record:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      feeType: '',
      amount: '',
      dueDate: '',
      paymentMethod: '',
      remarks: '',
      isPaid: false,
      paidDate: '',
      receiptNo: ''
    });
    setSelectedStudent(null);
    setSearchTerm('');
    setErrors({});
    onClose();
  };

  const generateReceiptNo = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `RCP${timestamp}${random}`;
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
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <IndianRupee className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add Fee Record</h2>
              <p className="text-sm text-gray-500">Create a new fee record for a student</p>
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
            {/* Student Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Student Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Student *
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, ID, or class..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {errors.student && (
                  <p className="text-red-500 text-xs mt-1">{errors.student}</p>
                )}
                
                {/* Student List */}
                {searchTerm && !selectedStudent && (
                  <div className="mt-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
                    {filteredStudents.map(student => (
                      <div
                        key={student.id}
                        onClick={() => handleStudentSelect(student)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.id} • {student.className}</p>
                          </div>
                          <CheckCircle className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected Student */}
                {selectedStudent && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{selectedStudent.name}</p>
                        <p className="text-sm text-gray-600">{selectedStudent.id} • {selectedStudent.className}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedStudent(null);
                          setSearchTerm('');
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Fee Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Fee Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fee Type *
                  </label>
                  <select
                    name="feeType"
                    value={formData.feeType}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.feeType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Fee Type</option>
                    {feeTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.feeType && (
                    <p className="text-red-500 text-xs mt-1">{errors.feeType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹) *
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.amount ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter amount"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.dueDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.dueDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remarks
                  </label>
                  <input
                    type="text"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any additional notes"
                  />
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-purple-600" />
                Payment Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPaid"
                    checked={formData.isPaid}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">
                    Mark as paid
                  </label>
                </div>

                {formData.isPaid && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-purple-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method *
                      </label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.paymentMethod ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Payment Method</option>
                        {paymentMethods.map(method => (
                          <option key={method} value={method}>{method}</option>
                        ))}
                      </select>
                      {errors.paymentMethod && (
                        <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="date"
                          name="paidDate"
                          value={formData.paidDate}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.paidDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.paidDate && (
                        <p className="text-red-500 text-xs mt-1">{errors.paidDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Receipt Number
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          name="receiptNo"
                          value={formData.receiptNo}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Receipt number"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, receiptNo: generateReceiptNo() }))}
                          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Fee Record</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFeeRecordModal; 