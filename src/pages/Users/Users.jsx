import { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import StatCard from '../../components/StatCard/StatCard';
import { Users as UsersIcon, Search, Mail, Phone, Briefcase, Landmark } from 'lucide-react';
import './Users.css';

export const Users = () => {
  const { users, loading, error, searchQuery, setSearchQuery, refreshData } = useDashboard();
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 8;

  // Track search change during render to reset the page
  const [prevSearch, setPrevSearch] = useState(searchQuery);
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
    return <Loader message="Loading users directory..." />;
  }

  // Error state
  if (error) {
    return <ErrorMessage message={error} onRetry={refreshData} />;
  }

  // Filter users based on query
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.company?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Calculate metrics
  const totalCount = filteredUsers.length;
  const uniqueCompanies = new Set(filteredUsers.map((u) => u.company?.name)).size;

  // Pagination
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="page-container animate-fade-in">
      {/* Metrics Header */}
      <div className="kpi-grid">
        <StatCard
          title="Total Profiles"
          value={totalCount.toString()}
          icon={UsersIcon}
          subtitle="Matching directory query"
        />
        <StatCard
          title="Registered Businesses"
          value={uniqueCompanies.toString()}
          icon={Briefcase}
          subtitle="Unique employer groups"
        />
        <StatCard
          title="Source Endpoint"
          value="JSONPlaceholder"
          icon={Landmark}
          subtitle="Mock REST user records"
        />
      </div>

      {/* Search and Table Controls */}
      <div className="users-controls">
        <div className="table-title-area">
          <h3 className="table-main-title">👥 Administrative Directory</h3>
          <span className="table-subtitle">Manage customer and vendor profiles</span>
        </div>
        <div className="users-search-box">
          <input
            type="text"
            className="users-search-input"
            placeholder="Search by name, company, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} className="search-box-icon" />
        </div>
      </div>

      {/* Users Responsive Table/Cards */}
      {totalCount === 0 ? (
        <div className="empty-directory-message">
          <h3>No User Records Found</h3>
          <p>We couldn't find any users matching your query: "{searchQuery}".</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="table-responsive">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Profile Name</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>Company Info</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="user-table-row">
                    <td>
                      <div className="user-profile-cell">
                        <div className="user-avatar-circle">
                          {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div className="user-profile-details">
                          <span className="user-full-name">{user.name}</span>
                          <span className="user-username">@{user.username}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="table-icon-cell">
                        <Mail size={14} className="cell-icon saffron-txt" />
                        <span className="cell-text">{user.email}</span>
                      </div>
                    </td>
                    <td>
                      <div className="table-icon-cell">
                        <Phone size={14} className="cell-icon green-txt" />
                        <span className="cell-text">{user.phone}</span>
                      </div>
                    </td>
                    <td>
                      <div className="table-icon-cell">
                        <Briefcase size={14} className="cell-icon navy-txt" />
                        <div className="company-text-container">
                          <span className="company-name-text">{user.company?.name}</span>
                          <span className="company-tagline-text">{user.company?.catchPhrase}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="users-mobile-cards">
            {paginatedUsers.map((user) => (
              <div key={user.id} className="user-mobile-card">
                <div className="mobile-card-header">
                  <div className="user-avatar-circle">
                    {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h4 className="user-full-name">{user.name}</h4>
                    <span className="user-username">@{user.username}</span>
                  </div>
                </div>
                <div className="mobile-card-body">
                  <div className="mobile-detail-row">
                    <Mail size={14} className="saffron-txt" />
                    <span>{user.email}</span>
                  </div>
                  <div className="mobile-detail-row">
                    <Phone size={14} className="green-txt" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="mobile-detail-row">
                    <Briefcase size={14} className="navy-txt" />
                    <span>{user.company?.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-row">
          <span className="pagination-info">
            Showing {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, totalCount)} of {totalCount} profiles
          </span>
          <div className="pagination-controls">
            <button
              className="page-btn"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
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
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
