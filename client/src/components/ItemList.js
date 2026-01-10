import React from 'react';
import { deleteItem } from '../api';
import './ItemList.css';

const ItemList = ({ items, onDelete, onEdit, loading, error }) => {
  const [deleting, setDeleting] = React.useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setDeleting(id);
      try {
        await deleteItem(id);
        onDelete(id);
      } catch (err) {
        console.error('Error deleting item:', err);
        alert('Failed to delete item: ' + (err.response?.data?.error || err.message));
      } finally {
        setDeleting(null);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading items...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (items.length === 0) {
    return <div className="no-items">No items found. Add one to get started!</div>;
  }

  return (
    <div className="item-list">
      <h2>Items</h2>
      <table className="items-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            const priceNum = parseFloat(item.price);
            const priceDisplay = Number.isFinite(priceNum) ? `₹${priceNum.toFixed(2)}` : '-';

            return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description || '-'}</td>
              <td>{priceDisplay}</td>
              <td className="actions">
                <button 
                  onClick={() => onEdit(item)} 
                  className="btn-edit"
                  title="Edit item"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting === item.id}
                  className="btn-delete"
                  title="Delete item"
                >
                  {deleting === item.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
