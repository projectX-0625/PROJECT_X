import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import pg from 'pg';

const router = express.Router();
const pool = new pg.Pool({
connectionString: process.env.DATABASE_URL,
});

// Utility function to calculate area in sqft
const calculateTotalArea = (room) => {
let totalSqft = 0;
const surfaces = ['floor', 'wall1', 'wall2'];

for (const surface of surfaces) {
if (room[surface]) {
const { length, width } = room[surface];
totalSqft += Number(length) * Number(width);
}
}

return totalSqft;
};

router.post('/calculate', async (req, res) => {
console.log('📥 POST /api/tiles/calculate hit');
try {
const { tileCode, room } = req.body;

if (!tileCode || !room) {
  return res.status(400).json({ error: 'tileCode and room dimensions are required.' });
}

const result = await pool.query('SELECT * FROM tiles WHERE code = $1', [tileCode]);

if (result.rows.length === 0) {
  return res.status(404).json({ error: 'Tile not found.' });
}

const tile = result.rows[0];
const tileArea = Number(tile.length_ft) * Number(tile.width_ft);
const coveragePerBox = Number(tile.coverage_per_box);
const pricePerSqft = Number(tile.price_per_sqft);
const discount = Number(tile.discount_percent);

const totalArea = calculateTotalArea(room);
const tilesNeeded = Math.ceil(totalArea / tileArea);
const boxesNeeded = Math.ceil(totalArea / coveragePerBox);
const costBeforeDiscount = totalArea * pricePerSqft;
const totalCost = costBeforeDiscount * (1 - discount / 100);

res.json({
  tileCode: tile.code,
  tileSize: `${tile.length_ft}ft x ${tile.width_ft}ft`,
  coveragePerBox: `${coveragePerBox} sqft`,
  pricePerSqft,
  discountPercent: discount,
  totalAreaSqft: totalArea,
  tilesNeeded,
  boxesNeeded,
  totalCost: totalCost.toFixed(2),
});
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Internal server error' });
}
});

export default router;

