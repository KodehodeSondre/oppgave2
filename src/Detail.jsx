import React, { useState, useEffect } from "react";

const BookDetail = ({ bookId }) => {
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const response = await fetch(`https://gutendex.com/books/${bookId}`);
      const data = await response.json();
      setBookDetails(data);
    };
    fetchBookDetails();
  }, [bookId]);

  if (!bookDetails) return <div>Loading...</div>;

  return (
    <div className="book-detail">
      <h2>{bookDetails.title}</h2>
      <p><strong>Author(s):</strong> {bookDetails.authors.map((author) => author.name).join(", ")}</p>
      <p><strong>Subjects:</strong> {bookDetails.subjects.join(", ")}</p>
      <img className="boksigma"src={bookDetails.formats["image/jpeg"]} alt=""></img>
    </div>
  );
};

export default BookDetail;