import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const pool = new pg.Pool({
connectionString: process.env.DATABASE_URL,
});

const tiles = [
{
code: 'A1001',
length_ft: 2,
width_ft: 2,
coverage_per_box: 16,
price_per_sqft: 45,
discount_percent: 10,
},
{
code: 'B2002',
length_ft: 1.5,
width_ft: 1.5,
coverage_per_box: 12,
price_per_sqft: 40,
discount_percent: 5,
},
{
code: 'C3003',
length_ft: 3.5,
width_ft: 2.0,
coverage_per_box: 16,
price_per_sqft: 10,
discount_percent: 5,
},
{
code: 'D4004',
length_ft: 4.5,
width_ft: 3.0,
coverage_per_box: 12,
price_per_sqft: 100,
discount_percent: 10,
}
];

async function seed() {
try {
for (const tile of tiles) {
await pool.query(
`INSERT INTO tiles (code, length_ft, width_ft, coverage_per_box, price_per_sqft, discount_percent) 
VALUES ($1, $2, $3, $4, $5, $6) 
ON CONFLICT (code) DO NOTHING`,
[
tile.code,
tile.length_ft,
tile.width_ft,
tile.coverage_per_box,
tile.price_per_sqft,
tile.discount_percent,
]
);
}
console.log('✅ Seed complete.');
} catch (err) {
console.error('❌ Seed error:', err);
} finally {
await pool.end();
}
}

seed();