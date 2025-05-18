const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser"); 

const prisma = new PrismaClient();

async function main() {
  const books = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(__dirname, "data/book-details.csv"))
      .pipe(csvParser())
      .on("data", (row) => {
        books.push({
          name: row["Name"],
          author: row["Author"],
          userRating: row["User Rating"]
            ? parseFloat(row["User Rating"])
            : null,
          reviews: row["Reviews"] ? parseInt(row["Reviews"]) : null,
          price: row["Price"] ? parseFloat(row["Price"]) : null,
          year: row["Year"] ? parseInt(row["Year"]) : null,
          genre: row["Genre"] || null,
        });
      })
      .on("end", () => resolve())
      .on("error", (error) => reject(error));
  });

  for (const book of books) {
    await prisma.book.create({ data: book });
  }

  console.log(`Seeded ${books.length} books.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
