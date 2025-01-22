import React from "react";

const List = ({ books, onBookClick }) => {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} onClick={() => onBookClick(book.id)} className="book-item">
          <strong>{book.title}</strong> 
          <p>{book.authors.map((author) => author.name).join(", ")}</p>
        </li>
      ))}
    </ul>
  );
};

export default List;
