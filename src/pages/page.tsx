"use client";

import { useState } from 'react';
// import styles from './page.css';

interface Item {
  id: number;
  name: string;
  description: string;
}

export default function CRUDComponent() {
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
    <div className={styles.container}>
      <h1 className={styles.title}>Dynamic CRUD Application</h1>
      
      <div className={styles.addItemSection}>
        <h2>Add New Item</h2>
        <div className={styles.inputGroup}>
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
          <button onClick={addItem} className={styles.addButton}>Add Item</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
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
                  <div className={styles.actionButtons}>
                    <button onClick={() => setEditingItem(item)} className={styles.editButton}>Edit</button>
                    <button onClick={() => deleteItem(item.id)} className={styles.deleteButton}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
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
            <div className={styles.modalActions}>
              <button onClick={updateItem} className={styles.updateButton}>Update Item</button>
              <button onClick={() => setEditingItem(null)} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}