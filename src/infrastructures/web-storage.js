export default class WebStorage {
  constructor (storageType) {
    switch (storageType) {
      case 'session':
      default:
        this.storageEngine = sessionStorage
        break

      case 'local':
        this.storageEngine = localStorage
        break
    }
  }

  /**
   * Get data from storage
   * @param keyName
   * @returns {null}
   */
  get (keyName) {
    let storedData = this.storageEngine.getItem(keyName)

    return storedData === null ? null : JSON.parse(storedData)
  }

  /**
   * Save data to storage
   *
   * @param keyName
   * @param data
   */
  set (keyName, data) {
    try {
      this.storageEngine.setItem(keyName, JSON.stringify(data))
    } catch (e) {} // eslint-disable-line
  }

  /**
   * Remove data from storage
   *
   * @param keyName
   */
  remove (keyName) {
    this.storageEngine.removeItem(keyName)
  }

  /**
   * Clear all data stored in storage
   */
  clear () {
    this.storageEngine.clear()
  }

  /**
   * Get data then remove it from storage
   *
   * @param keyName
   * @returns {null}
   */
  slice (keyName) {
    let data = this.get(keyName)
    this.remove(keyName)

    return data
  }
}
