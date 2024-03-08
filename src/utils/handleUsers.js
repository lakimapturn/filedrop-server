const radius = 0.2;

const users = {};

const findNearbyUsers = (user) => {
  const usersWithinRadius = [];

  // const usersWithinRadius = users.filter((u) => {
  //   if (user.id !== u.id) {
  //     const distance = calculateDistance(
  //       user.location.lat,
  //       user.location.lon,
  //       u.lat,
  //       u.lon
  //     );
  //     return distance <= radius;
  //   }
  //   return false;
  // });
  for (let userId in users) {
    if (userId === user.id) {
      continue;
    }
    const distance = calculateDistance(
      user.location.lat,
      user.location.long,
      users[userId].location.lat,
      users[userId].location.long
    );
    if (Math.abs(distance) <= radius) {
      usersWithinRadius.push(users[userId]);
    }
  }

  return usersWithinRadius;
};

const addUser = (user) => {
  users[user.id] = user;
};

const removeUser = (user) => {
  delete users[user.id];
};

const getUser = (id) => {
  return users[id];
};

// const calculateDistance = (x1, y1, x2, y2) => {
//   const deltaX = x2 - x1;
//   const deltaY = y2 - y1;
//   return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
// };

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

module.exports = { findNearbyUsers, addUser, removeUser, getUser };
