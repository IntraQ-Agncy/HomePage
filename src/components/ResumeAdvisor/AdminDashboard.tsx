import React, { useState, useEffect } from 'react';
import { 
  getResumeSubmissions, 
  updateResumeSubmissionStatus, 
  deleteResumeSubmission,
  type ResumeSubmission 
} from '../../api/supabaseStorageService';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trash2, 
  Download,
  RefreshCw
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<ResumeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ResumeSubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getResumeSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Failed to load submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: ResumeSubmission['status'], feedback?: string) => {
    try {
      const result = await updateResumeSubmissionStatus(id, status, feedback);
      if (result.success) {
        await loadSubmissions(); // Reload to get updated data
        alert(`Status updated to ${status}`);
      } else {
        alert(`Failed to update status: ${result.error}`);
      }
    } catch (error) {
      console.error('Status update failed:', error);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
      try {
        const result = await deleteResumeSubmission(id);
        if (result.success) {
          await loadSubmissions(); // Reload to get updated data
          alert('Submission deleted successfully');
        } else {
          alert(`Failed to delete submission: ${result.error}`);
        }
      } catch (error) {
        console.error('Deletion failed:', error);
        alert('Failed to delete submission');
      }
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (statusFilter === 'all') return true;
    return submission.status === statusFilter;
  });

  const getStatusIcon = (status: ResumeSubmission['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'reviewed':
        return <Eye className="h-4 w-4 text-blue-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: ResumeSubmission['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Resume Submissions Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage and review resume submissions
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <button
            onClick={loadSubmissions}
            className="flex gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Submissions List */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {submission.fullName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {submission.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          {submission.desiredRole}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Current: {submission.currentRole}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                        {getStatusIcon(submission.status)}
                        <span className="ml-1 capitalize">{submission.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {submission.submittedAt 
                        ? new Date(submission.submittedAt).toLocaleDateString()
                        : 'N/A'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        <a
                          href={submission.originalFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          title="Download Resume"
                        >
                          <Download className="h-4 w-4" />
                        </a>

                        {submission.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(submission.id!, 'approved')}
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            
                            <button
                              onClick={() => handleStatusUpdate(submission.id!, 'rejected')}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              title="Reject"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => handleDelete(submission.id!)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete"
                        >
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

        {/* No submissions message */}
        {filteredSubmissions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {statusFilter === 'all' 
                ? 'No resume submissions found.' 
                : `No submissions with status "${statusFilter}" found.`
              }
            </p>
          </div>
        )}

        {/* Submission Details Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Submission Details
                  </h3>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Personal Information</h4>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>Name:</strong> {selectedSubmission.fullName}</p>
                      <p><strong>Email:</strong> {selectedSubmission.email}</p>
                      <p><strong>Phone:</strong> {selectedSubmission.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Professional Information</h4>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>Current Role:</strong> {selectedSubmission.currentRole}</p>
                      <p><strong>Desired Role:</strong> {selectedSubmission.desiredRole}</p>
                      <p><strong>Salary Expectation:</strong> {selectedSubmission.salaryExpectation}</p>
                      <p><strong>Availability:</strong> {selectedSubmission.availability}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Experience & Skills</h4>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>Experience:</strong></p>
                      <p className="mt-1 whitespace-pre-wrap">{selectedSubmission.experience}</p>
                      
                      <p className="mt-3"><strong>Skills:</strong></p>
                      <p className="mt-1 whitespace-pre-wrap">{selectedSubmission.skills}</p>
                      
                      <p className="mt-3"><strong>Education:</strong></p>
                      <p className="mt-1 whitespace-pre-wrap">{selectedSubmission.education}</p>
                    </div>
                  </div>

                  {selectedSubmission.additionalNotes && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Additional Notes</h4>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                        {selectedSubmission.additionalNotes}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <a
                      href={selectedSubmission.originalFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Download Resume
                    </a>
                    
                    {selectedSubmission.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            handleStatusUpdate(selectedSubmission.id!, 'approved');
                            setSelectedSubmission(null);
                          }}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        
                        <button
                          onClick={() => {
                            handleStatusUpdate(selectedSubmission.id!, 'rejected');
                            setSelectedSubmission(null);
                          }}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
