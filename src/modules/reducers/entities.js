const initialState = {
  user: {}
};

export default (state = initialState, { type, payload }) => {
  if (payload?.included) {
    const includedEntities = payload.included.reduce((cum, entity) => {
      const data = cum[entity.type];
      data[entity.id] = entity;
      return { ...cum, [entity.type]: data };
    }, state);
    return includedEntities;
  }
  return state;
};