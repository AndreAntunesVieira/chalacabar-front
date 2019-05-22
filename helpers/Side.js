export default class Side{
  static client = typeof window !== 'undefined'
  static server = typeof window === 'undefined'
}
