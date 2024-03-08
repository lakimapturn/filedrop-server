class User {
  constructor(id, name, location) {
    this.id = id;
    this.name = name;
    this.location = { lat: location.latitude, long: location.longitude };
  }
}

module.exports = User;
