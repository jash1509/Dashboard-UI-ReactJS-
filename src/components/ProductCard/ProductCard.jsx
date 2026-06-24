import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { title, price, category, image } = product;

  // Format category labels nicely
  const formatCategory = (cat) => {
    if (!cat) return '';
    return cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ');
  };

  // Convert USD fake store price to Indian Rupees
  const priceInINR = Math.round(price * 83);

  return (
    <div className="product-card animate-fade-in">
      <div className="product-card-img-container">
        <img src={image} alt={title} className="product-card-img" loading="lazy" />
        <span className="product-card-category-badge">{formatCategory(category)}</span>
      </div>
      <div className="product-card-info">
        <h4 className="product-card-name" title={title}>
          {title}
        </h4>
        <div className="product-card-footer">
          <span className="product-card-price">
            ₹{priceInINR.toLocaleString('en-IN')}
          </span>
          <span className="product-card-buy-btn">View Details</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
