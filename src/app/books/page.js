'use client'
import { Interweave } from 'interweave';
import React, { useState, useEffect } from 'react';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json()
        setBooks(data)
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Книги</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {books.map(book => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div key={book.id}>{book.alias}</div>
            <Interweave content={book.description} />
          </div>
        ))}

      </div>
    </div>
  );
};

export default Books;
