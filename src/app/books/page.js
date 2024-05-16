'use client'
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
      <div>
        {books.map(book => (
          <div key={book.id}>{book.alias}</div>
        ))}
      </div>
    </div>
  );
};

export default Books;
