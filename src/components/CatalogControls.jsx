
function CatalogControls({
  searchQuery,
  selectedCategory,
  sortType,
  onSearchChange,
  onCategoryChange,
  onSortChange
}) {
  return (
    <section className="catalog-controls">
      <div className="catalog-controls__group">
        <label htmlFor="catalog-search">Поиск товаров</label>
        <input
          id="catalog-search"
          type="search"
          placeholder="Например, костюм"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="catalog-controls__group">
        <label htmlFor="category-filter">Категория</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="all">Все категории</option>
          <option value="costumes">Костюмы и маски</option>
          <option value="decor">Декор</option>
          <option value="makeup">Грим</option>
          <option value="sweets">Сладости</option>
        </select>
      </div>

      <div className="catalog-controls__group">
        <label htmlFor="sort-select">Сортировка</label>
        <select
          id="sort-select"
          value={sortType}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="default">По умолчанию</option>
          <option value="price-asc">Сначала дешевле</option>
          <option value="price-desc">Сначала дороже</option>
          <option value="title-asc">По названию А–Я</option>
        </select>
      </div>
    </section>
  )
}

export default CatalogControls
