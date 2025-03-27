import "../css/SkeletonCard.css";

const SkeletonCard = () => {
    return (
		<div className="skeleton-card">
			<div className="skeleton-image"></div>
			<div className="skeleton-text"></div>
			<div className="skeleton-short"></div>
		</div>
	);
};

export default SkeletonCard;