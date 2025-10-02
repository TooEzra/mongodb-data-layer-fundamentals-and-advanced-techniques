## 🗄️ MongoDB Fundamentals - Week 1
-----

## 📂 Overview

This repository contains a JavaScript file (queries.js) designed to run various MongoDB queries and aggregation pipelines against a books collection in the plp_bookstore database. The scripts demonstrate CRUD operations, aggregation pipelines, indexing, and performance analysis using the MongoDB Node.js driver.

-----

## 🚀 Prerequisites

Node.js: Ensure Node.js is installed on your system.
MongoDB: A running MongoDB instance (e.g., mongod on port 27017).
MongoDB Driver: Install the MongoDB Node.js driver by running:npm install mongodb

-----

## 🧪 Database and Collection

Database: plp_bookstore
Collection: books
Fields: title (string), author (string), genre (string), published_year (number), price (number), in_stock (boolean), pages (number), publisher (string)

-----

## 🛠️ Setup

Clone or copy the queries.js file to your project directory.
Update the MongoDB connection URI in queries.js if needed (default: mongodb://localhost:27017).
Ensure the plp_bookstore database and books collection exist with sample data matching the specified fields.

-----

##✅ Running the Script

Open a terminal in the directory containing queries.js.
Run the script:node queries.js

------

Observe the console output for query results, aggregations, index creation, and explain() performance details.

------

## Script Details

The queries.js file executes the following operations:

# Queries

Find all books in a specific genre: Searches for books by genre.
Find books published after a certain year: Filters by published_year.
Find books by a specific author: Searches by author.
Update the price of a specific book: Modifies the price field.
Delete a book by its title: Removes a book by title.

------

## Aggregations with Projection, Sorting, and Pagination

Find in-stock books after 2010: Uses projection to return title, author, and price.
Sort by price: Ascending and descending order.
Pagination: Displays 5 books per page (page 1 and page 2).
Average price by genre: Calculates the average price per genre.
Author with most books: Identifies the author with the highest book count.
Group by publication decade: Counts books by decade based on published_year.

------

## Indexing

Create index on title: Improves search performance.
Create compound index on author and published_year: Enhances query performance for combined filters.
Explain performance: Uses explain("executionStats") to compare performance before and after indexing (note: script creates indexes first; run separately without indexes for a true comparison).

------

## Customization

Connection URI: Modify the uri in queries.js to match your MongoDB setup (e.g., include username/password or remote server).
Placeholder Values: Replace "specificGenre", "specificAuthor", "specificBookTitle", 2020, and 29.99 with actual values from your data.
Output Management: For large datasets, limit output or redirect to a file (e.g., node queries.js > output.txt).

------

## Notes

Ensure your MongoDB server is running before executing the script.
The script logs results to the console; use console.log() output to verify operations.
For large collections, consider using cursors or limiting .toArray() results to manage memory.
The current date and time is 05:06 PM EAT on Thursday, October 02, 2025.

------

## Troubleshooting

Connection Errors: Verify MongoDB is running and the URI is correct.
Missing Data: Ensure the books collection contains data matching the query fields.
Performance Issues: Check explain() output for executionTimeMillis and totalDocsExamined to diagnose inefficiencies.

