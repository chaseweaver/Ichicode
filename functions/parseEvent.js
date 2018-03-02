module.exports = (eve = '', dt = '', tm = '') => {
  return { event: eve, date: dt, time: tm };
};

module.exports.conf = { requiredModules: [] };
module.exports.help = {
  name: 'parseEvent',
  type: 'function',
  help: 'Returns a list object of event.',
};