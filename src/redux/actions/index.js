import productSet from '../../Utils/productList.json';

export const fetchCardsDetails = (limit = 10) => {
	return async (dispatch, getState) => {
		let cardsData = Object.assign({}, getState().updateCardsDetails);
		let start = cardsData.data.length ? cardsData.data.length : 0;
		let end = start + limit;
		dispatch({
			type: 'UPDATE_CARD_DETAILS',
			payload: {
				inProgress: true,
				data: cardsData?.data || [],
				filterData: [],
			},
		});

		let response = await new Promise((resolve) => {
			setTimeout(() => resolve(productSet.slice(start, end)), 2000);
		});

		cardsData.data = [...(cardsData?.data || []), ...response];
		cardsData.inProgress = false;
		cardsData.filterData = [];
		dispatch({
			type: 'UPDATE_CARD_DETAILS',
			payload: cardsData,
		});
	};
};

export const filterCards = (searchData) => {
	return async (dispatch, getState) => {
		let cardsData = Object.assign({}, getState().updateCardsDetails);
		cardsData.inProgress = true;
		dispatch({
			type: 'UPDATE_CARD_DETAILS',
			payload: cardsData,
		});
		let response = await new Promise((resolve) => {
			setTimeout(
				() =>
					resolve(
						productSet.filter((obj) =>
							obj.title.toLocaleLowerCase().includes(searchData.toLocaleLowerCase())
						)
					),
				2000
			);
		});
		cardsData.inProgress = false;
		cardsData.filterData = [...response];
		dispatch({
			type: 'UPDATE_CARD_DETAILS',
			payload: cardsData,
		});
	};
};
