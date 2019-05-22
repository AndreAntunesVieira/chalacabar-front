export const getAsyncTypes = (storeName, actionName) => ({
  [`${storeName}_${actionName}_FETCHING`]: `${storeName}/${actionName}/FETCHING`,
  [`${storeName}_${actionName}_FETCHED`]: `${storeName}/${actionName}/FETCHED`,
  [`${storeName}_${actionName}_FETCH_ERROR`]: `${storeName}/${actionName}/FETCH_ERROR`,
})

export const prepareAsyncReducer = (state, action) => ({
  fetched: asyncReducer(state, action, { fetched: true, fetching: false }),
  fetching: asyncReducer(state, action, { fetched: false, fetching: true }),
})

const asyncReducer = (state, action, fetchProps) => (obj, spreadAction = true) => {
  const mergeAction = spreadAction ? action : {}
  return { ...state, ...mergeAction, ...obj, ...fetchProps }
}
