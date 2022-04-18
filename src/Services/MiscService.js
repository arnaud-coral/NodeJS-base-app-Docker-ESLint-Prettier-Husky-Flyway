class MiscService {
    /**
     * Return a basic message
     * @param {Sting} data
     * @returns {Promise}
     */
    async healthCheck(data) {
        return { result: 'ok', message: 'I\'m alive!', data }
    }
}

export default MiscService
