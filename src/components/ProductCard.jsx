function ProductCard({ product, onAddToCart }) {
  const finalPrice = Math.round(
    product.price * (1 - product.discountPercent / 100)
  )

  return (
    <article className="product-card">
      {product.image && (
        <img
          className="product-card__image"
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      )}

      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__description">{product.description}</p>

        <p className="product-card__price">
          {finalPrice.toLocaleString('ru-RU')} ₽
          {product.discountPercent > 0 && (
            <del className="product-card__old-price">
              {product.price.toLocaleString('ru-RU')} ₽
            </del>
          )}
        </p>

        <p className="product-card__rating">
          Рейтинг: {product.rating} ★
        </p>

        <p className="product-card__status">
          {product.isAvailable ? 'В наличии' : 'Нет в наличии'}
        </p>

        <button
          className="product-card__button"
          type="button"
          disabled={!product.isAvailable}
          onClick={() => onAddToCart(product)}
        >
          {product.isAvailable ? 'Добавить' : 'Недоступно'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard

