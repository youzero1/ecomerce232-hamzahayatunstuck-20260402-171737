interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={`flex items-center gap-0.5 ${sizes[size]}`}>
      {[1, 2, 3, 4, 5].map(star => {
        const filled = star <= Math.floor(rating);
        const half = !filled && star === Math.ceil(rating) && rating % 1 !== 0;
        return (
          <span
            key={star}
            className={filled ? 'text-yellow-400' : half ? 'text-yellow-300' : 'text-gray-300'}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
