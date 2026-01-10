const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all items
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM items');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET item by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM items WHERE id = ?', [id]);
    connection.release();
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: error.message });
  }
});

// CREATE new item
router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO items (name, description, price) VALUES (?, ?, ?)',
      [name, description || null, price]
    );
    connection.release();
    
    res.status(201).json({ 
      id: result.insertId, 
      name, 
      description: description || null, 
      price 
    });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE item
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    
    const connection = await pool.getConnection();
    
    // Check if item exists
    const [checkRows] = await connection.query('SELECT * FROM items WHERE id = ?', [id]);
    if (checkRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Item not found' });
    }
    
    // Update item
    const updateFields = [];
    const updateValues = [];
    
    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description);
    }
    if (price !== undefined) {
      updateFields.push('price = ?');
      updateValues.push(price);
    }
    
    if (updateFields.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    updateValues.push(id);
    const query = `UPDATE items SET ${updateFields.join(', ')} WHERE id = ?`;
    
    await connection.query(query, updateValues);
    connection.release();
    
    res.json({ id: parseInt(id), name, description, price });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    // Check if item exists
    const [checkRows] = await connection.query('SELECT * FROM items WHERE id = ?', [id]);
    if (checkRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Item not found' });
    }
    
    // Delete item
    await connection.query('DELETE FROM items WHERE id = ?', [id]);
    connection.release();
    
    res.json({ message: 'Item deleted successfully', id: parseInt(id) });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
