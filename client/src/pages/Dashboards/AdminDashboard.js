import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import { FaTrash, FaUndo, FaChartBar, FaUsers, FaStore, FaClipboardList } from 'react-icons/fa';
import './Dashboard.css';

const AdminDashboard = () => {
  const { user, API_URL } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'stats') {
        const response = await axios.get(`${API_URL}/admin/stats`);
        setStats(response.data);
      } else if (activeTab === 'users') {
        const response = await axios.get(`${API_URL}/admin/users`);
        setUsers(response.data);
      } else if (activeTab === 'donations') {
        const response = await axios.get(`${API_URL}/admin/donations`);
        setDonations(response.data);
      } else if (activeTab === 'logs') {
        const response = await axios.get(`${API_URL}/admin/audit-logs`);
        setAuditLogs(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreDonation = async (id) => {
    try {
      await axios.put(`${API_URL}/admin/donations/${id}/restore`);
      fetchData();
      alert('Donation restored successfully');
    } catch (error) {
      alert('Error restoring donation');
    }
  };

  const handleDeleteDonation = async (id) => {
    if (!window.confirm('Permanently delete this donation? This cannot be undone.')) return;
    try {
      await axios.delete(`${API_URL}/admin/donations/${id}`);
      fetchData();
      alert('Donation deleted permanently');
    } catch (error) {
      alert('Error deleting donation');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>

        <div className="admin-tabs">
          <button
            className={activeTab === 'stats' ? 'tab-active' : ''}
            onClick={() => setActiveTab('stats')}
          >
            <FaChartBar /> Statistics
          </button>
          <button
            className={activeTab === 'users' ? 'tab-active' : ''}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers /> Users
          </button>
          <button
            className={activeTab === 'donations' ? 'tab-active' : ''}
            onClick={() => setActiveTab('donations')}
          >
            <FaStore /> Donations
          </button>
          <button
            className={activeTab === 'logs' ? 'tab-active' : ''}
            onClick={() => setActiveTab('logs')}
          >
            <FaClipboardList /> Audit Logs
          </button>
        </div>

        {activeTab === 'stats' && stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <FaStore />
              <h3>{stats.mealsServed?.toLocaleString() || 0}</h3>
              <p>Meals Served</p>
            </div>
            <div className="stat-card">
              <FaUsers />
              <h3>{stats.totalUsers || 0}</h3>
              <p>Total Users</p>
            </div>
            <div className="stat-card">
              <h3>{stats.donorsJoined?.toLocaleString() || 0}</h3>
              <p>Donors Joined</p>
            </div>
            <div className="stat-card">
              <h3>{stats.receiversHelped?.toLocaleString() || 0}</h3>
              <p>Receivers Helped</p>
            </div>
            <div className="stat-card">
              <h3>{stats.citiesCovered || 0}</h3>
              <p>Cities Covered</p>
            </div>
            <div className="stat-card">
              <h3>{stats.activeDonations || 0}</h3>
              <p>Active Donations</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalDonations || 0}</h3>
              <p>Total Donations</p>
            </div>
            <div className="stat-card">
              <h3>{stats.pendingRequests || 0}</h3>
              <p>Pending Requests</p>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>City</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className={`badge badge-${u.role}`}>{u.role}</span></td>
                    <td>{u.city || '-'}</td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="admin-donations">
            {donations.map((donation) => (
              <div key={donation.id} className="admin-donation-card">
                <div className="donation-info">
                  <h3>{donation.title}</h3>
                  <p><strong>Donor:</strong> {donation.donorName}</p>
                  <p><strong>Status:</strong> <span className={`badge badge-${donation.status}`}>{donation.status}</span></p>
                  <p><strong>Created:</strong> {new Date(donation.createdAt).toLocaleDateString()}</p>
                  {donation.deletedAt && (
                    <p className="deleted">Deleted: {new Date(donation.deletedAt).toLocaleDateString()}</p>
                  )}
                </div>
                <div className="donation-actions">
                  {donation.deletedAt ? (
                    <button
                      className="success-button"
                      onClick={() => handleRestoreDonation(donation.id)}
                    >
                      <FaUndo /> Restore
                    </button>
                  ) : (
                    <button
                      className="danger-button"
                      onClick={() => handleDeleteDonation(donation.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Resource</th>
                  <th>Details</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.userName || '-'}</td>
                    <td><span className="badge">{log.action}</span></td>
                    <td>{log.resourceType}</td>
                    <td>{log.details}</td>
                    <td>{new Date(log.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
