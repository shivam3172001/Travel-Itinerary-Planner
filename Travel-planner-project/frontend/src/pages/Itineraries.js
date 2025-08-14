import { useState, useEffect } from 'react';
import { itineraryAPI } from '../services/api';
import GoogleMap from '../components/GoogleMap';

const Itineraries = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    destinations: [{ location: '', startDate: '', endDate: '', notes: '', latitude: '', longitude: '' }]
  });

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      const response = await itineraryAPI.getAll();
      setItineraries(response.data);
    } catch (err) {
      setError('Failed to fetch itineraries');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await itineraryAPI.update(editingId, formData);
        setEditingId(null);
      } else {
        await itineraryAPI.create(formData);
      }
      resetForm();
      fetchItineraries();
    } catch (err) {
      setError(editingId ? 'Failed to update itinerary' : 'Failed to create itinerary');
    }
  };

  const handleEdit = (itinerary) => {
    setFormData({
      title: itinerary.title,
      destinations: itinerary.destinations.map(dest => ({
        ...dest,
        startDate: dest.startDate.split('T')[0],
        endDate: dest.endDate.split('T')[0]
      }))
    });
    setEditingId(itinerary._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      destinations: [{ location: '', startDate: '', endDate: '', notes: '', latitude: '', longitude: '' }]
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        await itineraryAPI.delete(id);
        fetchItineraries();
      } catch (err) {
        setError('Failed to delete itinerary');
      }
    }
  };

  const addDestination = () => {
    setFormData({
      ...formData,
      destinations: [...formData.destinations, { location: '', startDate: '', endDate: '', notes: '', latitude: '', longitude: '' }]
    });
  };

  const removeDestination = (index) => {
    if (formData.destinations.length > 1) {
      setFormData({
        ...formData,
        destinations: formData.destinations.filter((_, i) => i !== index)
      });
    }
  };

  const updateDestination = (index, field, value) => {
    const updated = formData.destinations.map((dest, i) => 
      i === index ? { ...dest, [field]: value } : dest
    );
    setFormData({ ...formData, destinations: updated });
  };

  const getAllDestinations = () => {
    return itineraries.flatMap(itinerary => 
      itinerary.destinations.filter(dest => dest.latitude && dest.longitude)
    );
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>✈️ My Itineraries</h1>
        <button 
          onClick={() => showForm ? resetForm() : setShowForm(true)}
          style={{
            backgroundColor: showForm ? '#e74c3c' : '#3498db',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          {showForm ? '✕ Cancel' : '+ Add New Itinerary'}
        </button>
      </div>

      {error && (
        <div style={{ 
          color: '#e74c3c', 
          backgroundColor: '#fdf2f2',
          padding: '1rem',
          borderRadius: '6px',
          marginBottom: '1rem',
          border: '1px solid #fecaca'
        }}>
          {error}
        </div>
      )}

      {showForm && (
        <div style={{ 
          marginBottom: '2rem', 
          padding: '2rem', 
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e1e8ed'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>
            {editingId ? '✏️ Edit Itinerary' : '📝 Create New Itinerary'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                placeholder="Itinerary Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '2px solid #e1e8ed',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
              />
            </div>
            
            {formData.destinations.map((dest, index) => (
              <div key={index} style={{ 
                marginBottom: '1.5rem', 
                padding: '1.5rem', 
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#495057', margin: 0 }}>📍 Destination {index + 1}</h4>
                  {formData.destinations.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeDestination(index)}
                      style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Location"
                    value={dest.location}
                    onChange={(e) => updateDestination(index, 'location', e.target.value)}
                    required
                    style={{ padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
                  />
                  <input
                    type="date"
                    value={dest.startDate}
                    onChange={(e) => updateDestination(index, 'startDate', e.target.value)}
                    required
                    style={{ padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
                  />
                  <input
                    type="date"
                    value={dest.endDate}
                    onChange={(e) => updateDestination(index, 'endDate', e.target.value)}
                    required
                    style={{ padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
                  />
                  <input
                    type="number"
                    step="any"
                    placeholder="Latitude (optional)"
                    value={dest.latitude}
                    onChange={(e) => updateDestination(index, 'latitude', e.target.value ? parseFloat(e.target.value) : '')}
                    style={{ padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
                  />
                  <input
                    type="number"
                    step="any"
                    placeholder="Longitude (optional)"
                    value={dest.longitude}
                    onChange={(e) => updateDestination(index, 'longitude', e.target.value ? parseFloat(e.target.value) : '')}
                    style={{ padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
                  />
                </div>
                <textarea
                  placeholder="Notes (optional)"
                  value={dest.notes}
                  onChange={(e) => updateDestination(index, 'notes', e.target.value)}
                  rows="3"
                  style={{ 
                    width: '100%', 
                    padding: '0.5rem',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    resize: 'vertical'
                  }}
                />
              </div>
            ))}
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button 
                type="button" 
                onClick={addDestination}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                + Add Destination
              </button>
            </div>
            
            <button 
              type="submit"
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              {editingId ? '💾 Update Itinerary' : '✨ Create Itinerary'}
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h2 style={{ color: '#2c3e50', marginBottom: '1rem' }}>📋 Your Itineraries</h2>
          {itineraries.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              color: '#6c757d'
            }}>
              <p style={{ fontSize: '1.2rem', margin: 0 }}>🌍 No itineraries yet!</p>
              <p style={{ margin: '0.5rem 0 0 0' }}>Create your first travel plan above.</p>
            </div>
          ) : (
            itineraries.map((itinerary) => (
              <div key={itinerary._id} style={{ 
                backgroundColor: '#ffffff',
                border: '1px solid #e1e8ed', 
                borderRadius: '8px',
                padding: '1.5rem', 
                marginBottom: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ color: '#2c3e50', margin: 0 }}>{itinerary.title}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => handleEdit(itinerary)}
                      style={{ 
                        backgroundColor: '#ffc107',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(itinerary._id)} 
                      style={{ 
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                {itinerary.destinations.map((dest, index) => (
                  <div key={index} style={{ 
                    marginBottom: '0.75rem', 
                    paddingLeft: '1rem',
                    borderLeft: '3px solid #3498db',
                    backgroundColor: '#f8f9fa',
                    padding: '0.75rem',
                    borderRadius: '4px'
                  }}>
                    <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>📍 {dest.location}</div>
                    <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                      📅 {new Date(dest.startDate).toLocaleDateString()} - {new Date(dest.endDate).toLocaleDateString()}
                    </div>
                    {dest.notes && (
                      <div style={{ marginTop: '0.5rem', fontStyle: 'italic', color: '#495057' }}>
                        💭 {dest.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
        
        <div>
          <h2 style={{ color: '#2c3e50', marginBottom: '1rem' }}>🗺️ Map View</h2>
          <div style={{ 
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <GoogleMap destinations={getAllDestinations()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itineraries;