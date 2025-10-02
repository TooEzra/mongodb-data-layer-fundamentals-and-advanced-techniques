const { MongoClient } = require('mongodb');

async function run() {
  const uri = "mongodb://localhost:27017"; // Update with your MongoDB URI
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("plp_bookstore"); // database name
    const books = database.collection("books"); //  collection name

    // 1. Find all books in a specific genre
    console.log("Finding books in genre Fiction:");
    const genreResult = await books.find({ genre: "Fiction" }).toArray();
    console.log(genreResult);

    // 2. Find books published after a certain year
    console.log("Finding books published after 1950:");
    const yearResult = await books.find({ published_year: { $gt: 1950 } }).toArray();
    console.log(yearResult);

    // 3. Find books by a specific author
    console.log("Finding books by George Orwell:");
    const authorResult = await books.find({ author: "George Orwell" }).toArray();
    console.log(authorResult);

    // 4. Update the price of a specific book
    console.log("Updating price of book 'The Alchemist' to 29.99:");
    const updateResult = await books.updateOne(
      { title: "The Alchemist" },
      { $set: { price: 29.99 } }
    );
    console.log(`Modified ${updateResult.modifiedCount} document(s)`);

    // 5. Delete a book by its title
    console.log("Deleting book 'Moby Dick':");
    const deleteResult = await books.deleteOne({ title: "Moby Dick" });
    console.log(`Deleted ${deleteResult.deletedCount} document(s)`);

    // 6. Find books in stock after 1950 with projection
    console.log("Finding in-stock books after 1950 with projection:");
    const stockResult = await books.find(
      { in_stock: true, published_year: { $gt: 1950 } },
      { title: 1, author: 1, price: 1, _id: 0 }
    ).toArray();
    console.log(stockResult);

    // 7. Sort by price (ascending)
    console.log("Sorting in-stock books after 1950 by price (ascending):");
    const sortAscResult = await books.find(
      { in_stock: true, published_year: { $gt: 1950 } },
      { title: 1, author: 1, price: 1, _id: 0 }
    ).sort({ price: 1 }).toArray();
    console.log(sortAscResult);

    // 8. Sort by price (descending)
    console.log("Sorting in-stock books after 1950 by price (descending):");
    const sortDescResult = await books.find(
      { in_stock: true, published_year: { $gt: 1950 } },
      { title: 1, author: 1, price: 1, _id: 0 }
    ).sort({ price: -1 }).toArray();
    console.log(sortDescResult);

    // 9. Pagination (page 1, 5 books)
    console.log("Paginating in-stock books after 1950 (page 1, 5 books):");
    const page1Result = await books.find(
      { in_stock: true, published_year: { $gt: 1950 } },
      { title: 1, author: 1, price: 1, _id: 0 }
    ).sort({ price: 1 }).skip(0).limit(5).toArray();
    console.log(page1Result);

    // 10. Pagination (page 2, 5 books)
    console.log("Paginating in-stock books after 1950 (page 2, 5 books):");
    const page2Result = await books.find(
      { in_stock: true, published_year: { $gt: 1950 } },
      { title: 1, author: 1, price: 1, _id: 0 }
    ).sort({ price: 1 }).skip(5).limit(5).toArray();
    console.log(page2Result);

    // 11. Average price by genre
    console.log("Calculating average price by genre:");
    const avgPriceResult = await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log(avgPriceResult);

    // 12. Author with most books
    console.log("Finding author with most books:");
    const mostBooksResult = await books.aggregate([
      { $group: { _id: "$author", bookCount: { $sum: 1 } } },
      { $sort: { bookCount: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log(mostBooksResult);

    // 13. Group by publication decade
    console.log("Grouping books by publication decade:");
    const decadeResult = await books.aggregate([
      {
        $project: {
          decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] }
        }
      },
      {
        $group: {
          _id: "$decade",
          bookCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log(decadeResult);

    // 14. Create index on title
    console.log("Creating index on title:");
    await books.createIndex({ title: 1 });
    console.log("Index on title created");

    // 15. Create compound index on author and published_year
    console.log("Creating compound index on author and published_year:");
    await books.createIndex({ author: 1, published_year: 1 });
    console.log("Compound index created");

    // 16. Explain query on title (with index)
    console.log("Explain query on title with index:");
    const explainTitle = await books.find({ title: "specificBookTitle" }).explain("executionStats");
    console.log(explainTitle);

    // 17. Explain query on author and published_year (with compound index)
    console.log("Explain query on author and published_year with compound index:");
    const explainCompound = await books.find({ author: "specificAuthor", published_year: 2020 }).explain("executionStats");
    console.log(explainCompound);

  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);