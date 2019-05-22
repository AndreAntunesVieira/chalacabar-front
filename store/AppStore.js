const types = {
  SET_DEVICE_INFOS: 'SET_DEVICE_INFOS',
}

export const setDeviceInfos = ({ headers }) => {
  const userAgent = headers['user-agent']
  return {
    type: types.SET_DEVICE_INFOS,
    isMobile: !!userAgent.match(
      /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/
    ),
    userAgent,
  }
}

export default function reducer(state = {}, { type, ...action }) {
  switch (type) {
    case types.SET_DEVICE_INFOS: {
      return { ...state, ...action }
    }
    default: {
      return state
    }
  }
}
