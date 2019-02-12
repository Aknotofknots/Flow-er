function articles(state = [], action) {
  switch (action.type) {
    case 'ADD_ARTICLES':
      return [...state, ...action.payload];

    default:
      return state;
  }
}

export default articles;
