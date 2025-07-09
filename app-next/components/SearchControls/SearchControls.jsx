"use client";
import styles from "./SearchControls.module.css";

export default function SearchControls({
  searchTerm,
  setSearchTerm,
  handleSearch,
  sortKey,
  setSortKey,
  sortDir,
  setSortDir,
}) {
  return (
    <div className={styles.controls}>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search meals..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <label>
        Sort by:
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="price">Price</option>
          <option value="title">Title</option>
        </select>
      </label>
      <label>
        Direction:
        <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
}
