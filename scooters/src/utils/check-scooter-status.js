module.exports = function checkScooterStatus(status) {
    return (
        status === 'available' ||
        status === 'disabled' ||
        status === 'rented'
    )
}