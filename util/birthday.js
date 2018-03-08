module.exports = class Birthday {

  constructor(guild) {
    this.guild = guild;
    this.client = guild.client;
    this.user = null;
    this.time = new Date();
  }

  setUser(user) {
    this.user = {
      id: user.id,
      tag: user.tag
    };
    return this;
  }

  setTime(time) { return this.time = new Date(time); }

  get pack() {
    return {
      user: {
        id: this.user.id,
        tag: this.user.tag
      },
      time: this.time
    };
  }
  
  get provider() { return this.client.providers.get('json'); }
};