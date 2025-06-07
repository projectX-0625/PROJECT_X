/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('tiles', {
id: 'id',
code: { type: 'varchar(50)', notNull: true, unique: true },
length_ft: { type: 'numeric', notNull: true },
width_ft: { type: 'numeric', notNull: true },
coverage_per_box: { type: 'numeric', notNull: true },
price_per_sqft: { type: 'numeric', notNull: true },
discount_percent: { type: 'numeric', default: 0 }
});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('tiles');
};
