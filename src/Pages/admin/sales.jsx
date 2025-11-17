import axios from 'axios';
import { useState, useEffect } from 'react';

function Sales() {
  const [formData, setFormData] = useState({
    salespersonname: '',
    email: '',
    password: ''
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/blog/create-admin-sales/', formData);
      console.log('Registration successful:', response.data);
      
      // Set registration success to true
      setRegistrationSuccess(true);
      
      // Clear form after successful registration
      setFormData({
        salespersonname: '',
        email: '',
        password: ''
      });
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect to handle the welcome message display and auto-hide
  useEffect(() => {
    if (registrationSuccess) {
      console.log('Welcome message displayed');
      
      // Auto-hide welcome message after 5 seconds
      const timer = setTimeout(() => {
        setRegistrationSuccess(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess]);

  // Reset welcome message when form starts being filled again
  useEffect(() => {
    if (formData.salespersonname || formData.email || formData.password) {
      setRegistrationSuccess(false);
    }
  }, [formData.salespersonname, formData.email, formData.password]);

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Sales Registration</h1>
      
      {/* Welcome Message */}
      {registrationSuccess && (
        <div style={{
          padding: '15px',
          backgroundColor: '#d4edda',
          color: '#155724',
          border: '1px solid #c3e6cb',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <h2>Welcome to Product!</h2>
          <p>Salesperson registered successfully! You can now proceed to product management.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#f9f9f9',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Salesperson Name:
          </label>
          <input
            type="text"
            name="salespersonname"
            value={formData.salespersonname}
            onChange={handleChange}
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Registering...' : 'Register Salesperson'}
        </button>
      </form>
    </div>
  );
}

export default Sales;