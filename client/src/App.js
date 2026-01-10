import React, { useState, useEffect } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { getAllItems } from './api';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllItems();
      setItems(response.data);
    } catch (err) {
      setError('Failed to fetch items: ' + (err.response?.data?.error || err.message));
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFormSubmit = () => {
    setEditingItem(null);
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>CRUD Application</h1>
        <p>Manage your items with ease</p>
      </header>
      
      <main className="app-main">
        <div className="container">
          <div className="grid">
            <div className="form-column">
              <ItemForm 
                onSubmit={handleFormSubmit}
                editingItem={editingItem}
                onCancel={handleCancel}
              />
            </div>

            <div className="list-column">
              <ItemList 
                items={items}
                onDelete={handleDelete}
                onEdit={handleEdit}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 CRUD APP. Built with React, Node.js, and MySQL.</p>
      </footer>
    </div>
  );
}

export default App;
