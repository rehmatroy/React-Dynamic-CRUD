import React, { useState } from 'react';
import './App.css';

interface Item {
  id: number;
  name: string;
  description: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const addItem = () => {
    if (newItem.name && newItem.description) {
      setItems([...items, { ...newItem, id: Date.now() }]);
      setNewItem({ name: '', description: '' });
    }
  };

  const updateItem = () => {
    if (editingItem && editingItem.name && editingItem.description) {
      setItems(items.map(item => item.id === editingItem.id ? editingItem : item));
      setEditingItem(null);
    }
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <h1>Dynamic CRUD Application</h1>
      
      <div className="add-item-section">
        <h2>Add New Item</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
          <button onClick={addItem} className="add-button">Add Item</button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => setEditingItem(item)} className="edit-button">Edit</button>
                    <button onClick={() => deleteItem(item.id)} className="delete-button">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Item</h2>
            <input
              type="text"
              placeholder="Name"
              value={editingItem.name}
              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={editingItem.description}
              onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={updateItem} className="update-button">Update Item</button>
              <button onClick={() => setEditingItem(null)} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

