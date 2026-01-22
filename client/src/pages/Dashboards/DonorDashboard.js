import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';
import { FaPlus, FaCheck, FaTimes, FaTrash, FaEdit } from 'react-icons/fa';
import './Dashboard.css';

const DonorDashboard = () => {
  const { user, API_URL } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    quantity: '',
    expiryDate: '',
    pickupLocation: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [donationsRes, requestsRes] = await Promise.all([
        axios.get(`${API_URL}/donations/my/list`),
        axios.get(`${API_URL}/requests/donor/my`)
      ]);
      setDonations(donationsRes.data || []);
      setRequests(requestsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setDonations([]);
      setRequests([]);
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDonation = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/donations`, formData);
      setShowDonationForm(false);
      setFormData({
        title: '',
        description: '',
        category: '',
        quantity: '',
        expiryDate: '',
        pickupLocation: '',
        imageUrl: ''
      });
      fetchData();
    } catch (error) {
      alert('Error creating donation: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDeleteDonation = async (id) => {
    if (!window.confirm('Are you sure you want to delete this donation?')) return;
    try {
      await axios.delete(`${API_URL}/donations/${id}`);
      fetchData();
    } catch (error) {
      alert('Error deleting donation');
    }
  };

  const handleRequestResponse = async (requestId, status) => {
    try {
      await axios.put(`${API_URL}/requests/${requestId}/respond`, { status });
      fetchData();
    } catch (error) {
      alert('Error responding to request');
    }
  };

  const handleCompleteRequest = async (requestId) => {
    try {
      await axios.put(`${API_URL}/requests/${requestId}/complete`);
      fetchData();
    } catch (error) {
      alert('Error completing request');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={`dashboard ${theme}`}>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name}</h1>
          <button
            className="primary-button"
            onClick={() => setShowDonationForm(!showDonationForm)}
          >
            <FaPlus /> {showDonationForm ? 'Cancel' : 'Post Food Donation'}
          </button>
        </div>

        {showDonationForm && (
          <div className="form-card">
            <h2>Post New Donation</h2>
            <form onSubmit={handleCreateDonation}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Title *"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
              />
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Quantity *"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
                <input
                  type="date"
                  placeholder="Expiry Date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>
              <input
                type="text"
                placeholder="Pickup Location *"
                value={formData.pickupLocation}
                onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                required
              />
              <input
                type="url"
                placeholder="Image URL (optional)"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
              <button type="submit" className="primary-button">Post Donation</button>
            </form>
          </div>
        )}

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <h2>My Donations ({donations.length})</h2>
            <div className="cards-grid">
              {donations.map((donation) => (
                <div key={donation.id} className="card">
                  {donation.imageUrl && (
                    <img src={donation.imageUrl} alt={donation.title} className="card-image" />
                  )}
                  <div className="card-content">
                    <h3>{donation.title}</h3>
                    <p>{donation.description}</p>
                    <div className="card-info">
                      <span className="badge badge-{donation.status}">{donation.status}</span>
                      <span>Qty: {donation.quantity}</span>
                    </div>
                    <div className="card-actions">
                      <button
                        className="danger-button"
                        onClick={() => handleDeleteDonation(donation.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {donations.length === 0 && (
                <p className="empty-state">No donations yet. Post your first donation!</p>
              )}
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Requests ({requests.length})</h2>
            <div className="requests-list">
              {requests.map((request) => (
                <div key={request.id} className="request-card">
                  <div className="request-header">
                    <h3>{request.donationTitle}</h3>
                    <span className={`badge badge-${request.status}`}>{request.status}</span>
                  </div>
                  <p><strong>Receiver:</strong> {request.receiverName}</p>
                  {request.message && <p>{request.message}</p>}
                  <p><strong>Location:</strong> {request.pickupLocation}</p>
                  {request.donorContact && (
                    <div className="contact-info">
                      <p><strong>Shared Contact:</strong></p>
                      {(() => {
                        try {
                          const contact = typeof request.donorContact === 'string' 
                            ? JSON.parse(request.donorContact) 
                            : request.donorContact;
                          return (
                            <>
                              <p>{contact?.name || '-'}</p>
                              <p>{contact?.email || '-'}</p>
                              <p>{contact?.phone || '-'}</p>
                            </>
                          );
                        } catch (e) {
                          console.error('Error parsing donorContact:', e);
                          return <p>Contact information unavailable</p>;
                        }
                      })()}
                    </div>
                  )}
                  <div className="request-actions">
                    {request.status === 'pending' && (
                      <>
                        <button
                          className="success-button"
                          onClick={() => handleRequestResponse(request.id, 'accepted')}
                        >
                          <FaCheck /> Accept
                        </button>
                        <button
                          className="danger-button"
                          onClick={() => handleRequestResponse(request.id, 'rejected')}
                        >
                          <FaTimes /> Reject
                        </button>
                      </>
                    )}
                    {request.status === 'accepted' && (
                      <button
                        className="primary-button"
                        onClick={() => handleCompleteRequest(request.id)}
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {requests.length === 0 && (
                <p className="empty-state">No requests yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
