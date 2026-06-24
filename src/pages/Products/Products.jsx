import { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import StatCard from '../../components/StatCard/StatCard';
import { Package, IndianRupee, AlertTriangle, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import './Products.css';

export const Products = () => {
  const { products, loading, error, searchQuery, setSearchQuery, refreshData } = useDashboard();
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 8;

  // Track filter changes during render to reset the page
  const [prevCategory, setPrevCategory] = useState(activeCategory);
  const [prevSearch, setPrevSearch] = useState(searchQuery);

  if (activeCategory !== prevCategory) {
    setPrevCategory(activeCategory);
    setCurrentPage(1);
  }
  if (searchQuery !== prevSearch) {
    setPrevSearch(searchQuery);
    setCurrentPage(1);
  }

  // Clean search on unmount
  useEffect(() => {
    return () => {
      setSearchQuery('');
    };
  }, [setSearchQuery]);

  // Loading state
  if (loading) {
    return <Loader message="Loading products data..." />;
  }

  // Error state
  if (error) {
    return <ErrorMessage message={error} onRetry={refreshData} />;
  }

  // Categories list
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const formatCategoryName = (cat) => {
    if (!cat) return '';
    return cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ');
  };

  // Filtering products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate metrics
  const totalCount = filteredProducts.length;
  const averagePriceINR = totalCount
    ? Math.round((filteredProducts.reduce((acc, p) => acc + p.price, 0) / totalCount) * 83)
    : 0;

  // Pagination
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="page-container animate-fade-in">
      {/* Metrics Row */}
      <div className="kpi-grid">
        <StatCard
          title="Catalog Items"
          value={totalCount.toString()}
          icon={Package}
          subtitle="Matching current filter"
        />
        <StatCard
          title="Avg Selling Price"
          value={`₹${averagePriceINR.toLocaleString('en-IN')}`}
          icon={IndianRupee}
          subtitle="Scaled from USD catalog"
        />
        <StatCard
          title="API Supplier"
          value="FakeStore"
          icon={AlertTriangle}
          subtitle="Verifiable sample payload"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="products-controls">
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'All' ? 'All Products' : formatCategoryName(cat)}
            </button>
          ))}
        </div>

        {/* Local Search Input (fallback if header search is collapsed) */}
        <div className="products-search-box">
          <input
            type="text"
            className="products-search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} className="search-box-icon" />
        </div>
      </div>

      {/* Grid Display */}
      {totalCount === 0 ? (
        <div className="empty-catalog-message">
          <h3>No Products Found</h3>
          <p>We couldn't find any products matching your filters or search keywords.</p>
        </div>
      ) : (
        <div className="products-grid-layout">
          {paginatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Pagination Row */}
      {totalPages > 1 && (
        <div className="pagination-row">
          <span className="pagination-info">
            Showing {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, totalCount)} of {totalCount} items
          </span>
          <div className="pagination-controls">
            <button
              className="page-btn"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              <ChevronLeft size={16} />
              Prev
            </button>
            <div className="page-number-indicator">{currentPage}</div>
            <button
              className="page-btn"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
