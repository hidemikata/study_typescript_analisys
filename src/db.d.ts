import sqlite3 from 'sqlite3';

declare global {
  var db: sqlite3.Database;
}
export { };
