import React, { useState } from 'react';
import { createItem, updateItem } from '../api';
import './ItemForm.css';

const ItemForm = ({ onSubmit, editingItem, onCancel }) => {
  const [formData, setFormData] = useState({
    name: editingItem?.name || '',
    description: editingItem?.description || '',
    price: editingItem?.price || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingItem) {
        await updateItem(editingItem.id, formData);
      } else {
        await createItem(formData);
      }
      setFormData({ name: '', description: '', price: '' });
      onSubmit();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter item name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter item description"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price *</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="Enter item price"
          step="0.01"
          min="0"
        />
      </div>

      <div className="form-buttons">
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Saving...' : (editingItem ? 'Update Item' : 'Add Item')}
        </button>
        {editingItem && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ItemForm;
