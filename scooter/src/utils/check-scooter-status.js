module.exports = function checkScooterStatus(status) {
    return (
        status === 'available' ||
        status === 'not available' ||
        status === 'rented'
    )
}