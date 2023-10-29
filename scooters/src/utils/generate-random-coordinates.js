module.exports = function generateRandomCoordinates() {
  const minLat = 27.5;
  const maxLat = 27.7;
  const minLng = -48.5;
  const maxLng = -48.4;

  const randomLat = Math.random() * (maxLat - minLat) + minLat;
  const randomLng = Math.random() * (maxLng - minLng) + minLng;

  return { latitude: randomLat, longitude: randomLng };
}


