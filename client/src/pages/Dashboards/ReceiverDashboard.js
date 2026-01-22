import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';
import { FaSearch, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Dashboard.css';

const ReceiverDashboard = () => {
  const { user, API_URL } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(null);
  const [requestMessage, setRequestMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [donationsRes, requestsRes] = await Promise.all([
        axios.get(`${API_URL}/donations?status=available`),
        axios.get(`${API_URL}/requests/receiver/my`)
      ]);
      setDonations(donationsRes.data || []);
      setMyRequests(requestsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setDonations([]);
      setMyRequests([]);
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (category) params.append('category', category);
      
      const response = await axios.get(`${API_URL}/donations?${params.toString()}`);
      setDonations(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleRequest = async (donationId) => {
    try {
      await axios.post(`${API_URL}/requests`, {
        donationId,
        message: requestMessage
      });
      setShowRequestModal(null);
      setRequestMessage('');
      await fetchData();
      alert('Request sent successfully!');
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Error sending request: ' + (error.response?.data?.error || error.message));
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
        </div>

        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search donations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <input
              type="text"
              placeholder="Category filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button className="primary-button" onClick={handleSearch}>
              <FaSearch /> Search
            </button>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <h2>Available Donations ({donations.length})</h2>
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
                      <span><FaMapMarkerAlt /> {donation.pickupLocation}</span>
                      <span>Qty: {donation.quantity}</span>
                    </div>
                    {donation.category && (
                      <span className="badge">{donation.category}</span>
                    )}
                    <button
                      className="primary-button"
                      onClick={() => setShowRequestModal(donation)}
                    >
                      Request Food
                    </button>
                  </div>
                </div>
              ))}
              {donations.length === 0 && (
                <p className="empty-state">No donations available at the moment.</p>
              )}
            </div>
          </div>

          <div className="dashboard-section">
            <h2>My Requests ({myRequests.length})</h2>
            <div className="requests-list">
              {myRequests.map((request) => (
                <div key={request.id} className="request-card">
                  <div className="request-header">
                    <h3>{request.donationTitle}</h3>
                    <span className={`badge badge-${request.status}`}>{request.status}</span>
                  </div>
                  <p><strong>Donor:</strong> {request.donorName}</p>
                  <p><strong>Location:</strong> {request.pickupLocation}</p>
                  {request.donorContact && request.status === 'accepted' && (
                    <div className="contact-info">
                      <p><strong>Donor Contact:</strong></p>
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
                </div>
              ))}
              {myRequests.length === 0 && (
                <p className="empty-state">You haven't made any requests yet.</p>
              )}
            </div>
          </div>
        </div>

        {showRequestModal && (
          <div className="modal-overlay" onClick={() => setShowRequestModal(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Request: {showRequestModal.title}</h2>
              <textarea
                placeholder="Optional message to donor..."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                rows="4"
              />
              <div className="modal-actions">
                <button className="secondary-button" onClick={() => setShowRequestModal(null)}>
                  Cancel
                </button>
                <button
                  className="primary-button"
                  onClick={() => handleRequest(showRequestModal.id)}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiverDashboard;
