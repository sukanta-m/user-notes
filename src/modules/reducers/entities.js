const initialState = {
  user: {}
};

export default (state = initialState, { type, payload }) => {
  const included = payload?.included || payload?.data?.included;

  if (included) {
    const includedEntities = included.reduce((cum, entity) => {
      const data = cum[entity.type];
      data[entity.id] = entity;
      return { ...cum, [entity.type]: data };
    }, state);
    return includedEntities;
  }
  return state;
};