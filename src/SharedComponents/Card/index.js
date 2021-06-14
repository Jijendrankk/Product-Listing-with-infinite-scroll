import React from 'react';
import styles from './index.module.css';

const Card = ({ imageUrl, title, subTitle, sizeVariation }) => {
	return (
		<section className={styles.cardSection}>
			<img src={imageUrl} className={styles.imgStyle} alt='not found' />
			<div className={styles.productTitle}>{title}</div>
			<div className={styles.productDescription}>{subTitle}</div>
			<div className={styles.productMetaLabels}>{String(sizeVariation.map((val) => val.title))}</div>
		</section>
	);
};

export default Card;
