const getPagination = (page = 1, limit = 9) => {
    const skip = (parseInt(page) * parseInt(limit)) - parseInt(limit)
    return {
        limit: parseInt(limit),
        skip
    }
}

export default getPagination