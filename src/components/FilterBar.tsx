interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-categories">
        <span className="filter-label">FILTER://</span>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="search-container">
        <span className="search-prefix">$</span>
        <input
          type="text"
          placeholder="grep -i 'project'"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <div className="search-cursor" />
      </div>
    </div>
  );
}
