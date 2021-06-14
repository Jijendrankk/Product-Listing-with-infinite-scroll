import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../SharedComponents/Card';
import { fetchCardsDetails, filterCards } from '../../redux/actions';
import { cardLimit } from '../../Utils/constants';
import styles from './index.module.css';
import iconLabel from '../../Assets/nykaa_logo.svg';

const Cards = () => {
	const dispatch = useDispatch();
	const totalCards = useSelector((state) => state.updateCardsDetails); // getting card details from global state
	const refNode = useRef(null);
	const filterRef = useRef(null);

	// callback function - handleObserver : Using this function fetching the product details
	const handleObserver = (entities) => {
		const isEnd = entities[0];
		if (isEnd.isIntersecting && filterRef.current.value === '') {
			dispatch(fetchCardsDetails(cardLimit));
		}
	};

	useEffect(() => {
		// Options
		const options = {
			root: null, // Page as root
			rootMargin: '0px',
			threshold: 1.0,
		};
		const observer = new IntersectionObserver(handleObserver, options);
		refNode && refNode.current && observer.observe(refNode.current);
		return () => observer.unobserve(refNode.current);
	}, [refNode]);

	// This will return list of cards component
	const renderCards = (list) => list.map((card, index) => <Card key={index} {...card} />);

	// scroll to top
	const handleScroll = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	// filtering the product cards based on product title
	let timer;
	const updateProduct = (e) => {
		clearTimeout(timer);
		timer = setTimeout(() => dispatch(filterCards(e.target.value)), 2000);
	};

	return (
		<div>
			<header className={styles.headerBlock}>
				<div className={styles.headerSearch}>
					<div className={styles.iconLabelContainer}>
						<img src={iconLabel} className={styles.iconLabelBlock} />
					</div>
					<div className={styles.inputElementContainer}>
						<input
							type='text'
							placeholder='search'
							className={styles.inputLabelBlock}
							onChange={updateProduct}
							ref={filterRef}
						/>
					</div>
				</div>
			</header>
			<div className={styles.cardsContainer}>
				{renderCards(
					filterRef.current && filterRef.current.value === '' ? totalCards.data : totalCards.filterData
				)}
			</div>
			<div ref={refNode} className={styles.loadingContainer}>
				{totalCards.inProgress ? <div className={styles.loadingLabel}>Loading...</div> : null}
			</div>
			<div className={styles.goTop} onClick={handleScroll}>
				&uarr;
			</div>
		</div>
	);
};

export default Cards;
