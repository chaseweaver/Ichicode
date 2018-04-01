const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'fool',
      enabled: true,
      runIn: ['text'],
      cooldown: 2,
      bucket: 1,
      aliases: [],
      permLevel: 5,
      botPerms: [],
      requiredConfigs: [],
      description: 'April Fools 1up',
      quotedStringSupport: false,
      usage: '<apply|restore|backup>',
      usageDelim: '',
      extendedHelp: '',
    });
  }

  async run(msg, action) { return this[action](msg); }

  async apply(msg) {
    const out = [];
    await msg.guild.roles.forEach(e => {
      if (e.id == '417909635782279178') {
        out.push('[Original] ' + 'Like A Sibling' + ' : ' + '#277ecd');
        e.edit({ name: 'Yancy Becket', color: '#277ecd' });
        out.push('[Modified] ' + 'Yancy Becket' + ' : ' + '#277ecd');
      } 
      else if (e.id == '391489710922530828') {
        out.push('[Original] ' + 'BOTS' + ' : ' + '#607d8b');
        e.edit({ name: 'Bots', color: '#607d8b' });
        out.push('[Modified] ' + 'Bots' + ' : ' + '#607d8b');
      }
      else if (e.id == '391490235227439104') {
        out.push('[Original] ' + 'Tatsumaki' + ' : ' + '#000000');
        e.edit({ name: 'Green Bitch', color: '#000000' });
        out.push('[Modified] ' + 'Green Bitch' + ' : ' + '#000000');
      }
      else if (e.id == '392897098875404289') {
        out.push('[Original] ' + 'Muted' + ' : ' + '#992d22');
        e.edit({ name: 'Naughty Rangers', color: '#992d22' });
        out.push('[Modified] ' + 'Naughty Rangers' + ' : ' + '#992d22');
      }
      else if (e.id == '412589195702435840') {
        out.push('[Original] ' + 'Developer' + ' : ' + '#69dab5');
        e.edit({ name: 'Shatterdome Staff', color: '#69dab5' });
        out.push('[Modified] ' + 'Shatterdome Staff' + ' : ' + '#69dab5');
      }
      else if (e.id == '421016755834716181') {
        out.push('[Original] ' + 'Happy Birthday!' + ' : ' + '#000000');
        e.edit({ name: 'Promotion', color: '#000000' });
        out.push('[Modified] ' + 'Promotion' + ' : ' + '#000000');
      }
      else if (e.id == '426686091274354690') {
        out.push('[Original] ' + 'Geeks Bearing Dicks' + ' : ' + '#69dab5');
        e.edit({ name: 'Hannibal Chau', color: '#69dab5' });
        out.push('[Modified] ' + 'Hannibal Chau' + ' : ' + '#69dab5');
      }
      else if (e.id == '392894112036159499') {
        out.push('[Original] ' + 'Strelizia' + ' : ' + '#dd4b4b');
        e.edit({ name: 'Crimson Typhoon', color: '#dd4b4b' });
        out.push('[Modified] ' + 'Crimson Typhoon' + ' : ' + '#dd4b4b');
      }
      else if (e.id == '392894894999601153') {
        out.push('[Original] ' + 'Genista' + ' : ' + '#2ecc71');
        e.edit({ name: 'Cherno Alpha', color: '#2ecc71' });
        out.push('[Modified] ' + 'Cherno Alpha' + ' : ' + '#2ecc71');
      }
      else if (e.id == '392894507424940034') {
        out.push('[Original] ' + 'Argentea' + ' : ' + '#da76a3');
        e.edit({ name: 'Coyote Tango', color: '#da76a3' });
        out.push('[Modified] ' + 'Coyote Tango' + ' : ' + '#da76a3');
      }
      else if (e.id == '392894974234198026') {
        out.push('[Original] ' + 'Chlorophytum' + ' : ' + '#9a72ce');
        e.edit({ name: 'Striker Eureka', color: '#9a72ce' });
        out.push('[Modified] ' + 'Striker Eureka' + ' : ' + '#9a72ce');
      }
      else if (e.id == '403740756105363457') {
        out.push('[Original] ' + 'Kyoryu' + ' : ' + '#84c8ce');
        e.edit({ name: 'Kaiju', color: '#84c8ce' });
        out.push('[Modified] ' + 'Kaiju' + ' : ' + '#84c8ce');
      }
      else if (e.id == '392894559853477899') {
        out.push('[Original] ' + 'Delphinium' + ' : ' + '#0089af');
        e.edit({ name: 'Gipsy Danger', color: '#0089af' });
        out.push('[Modified] ' + 'Gipsy Danger' + ' : ' + '#0089af');
      }
      else if (e.id == '412069721832292372') {
        out.push('[Original] ' + 'Blue Oni' + ' : ' + '#2772cd');
        e.edit({ name: 'Newt & Gottlieb', color: '#2772cd' });
        out.push('[Modified] ' + 'Newt & Gottlieb' + ' : ' + '#2772cd');
      }
      else if (e.id == '402315991918575636') {
        out.push('[Original] ' + 'Pollination' + ' : ' + '#000000');
        e.edit({ name: 'Drift Compatible', color: '#000000' });
        out.push('[Modified] ' + 'Drift Compatible' + ' : ' + '#000000');
      }
      else if (e.id == '407759891927924737') {
        out.push('[Original] ' + 'Literature Club' + ' : ' + '#000000');
        e.edit({ name: 'Analog Not Digital', color: '#000000' });
        out.push('[Modified] ' + 'Analog Not Digital' + ' : ' + '#000000');
      }
      else if (e.id == '405107014356697099') {
        out.push('[Original] ' + 'Thot Patrol' + ' : ' + '#000000');
        e.edit({ name: 'Retired Pilots', color: '#000000' });
        out.push('[Modified] ' + 'Retired Pilots' + ' : ' + '#000000');
      }
      else if (e.id == '422153053718708245') {
        out.push('[Original] ' + 'Parasites' + ' : ' + '#000000');
        e.edit({ name: 'Washed-Out Rangers', color: '#000000' });
        out.push('[Modified] ' + 'Washed-Out Rangers' + ' : ' + '#000000');
      }
    });

    await msg.guild.channels.forEach(e => { 
      if (e.type === 'category' && e.id == '409149728823967745') {
        out.push('[Original] ' + 'FRANXX');
        e.edit({ name: 'PACIFIC RIM'});
        out.push('[Modified] ' + 'PACIFIC RIM');
      }
      else if (e.type === 'category' && e.id == '410935760535945227') {
        out.push('[Original] ' + 'COMMUNITY');
        e.edit({ name: 'RANGER-RECREATION'});
        out.push('[Modified] ' + 'RANGER-RECREATION');
      }
      else if (e.type === 'category' && e.id == '409150034744049704') {
        out.push('[Original] ' + 'NSFW');
        e.edit({ name: 'RANGERS-REPRODUCTION'});
        out.push('[Modified] ' + 'RANGERS-REPRODUCTION');
      }
      else if (e.type === 'category' && e.id == '415326318691876866') {
        out.push('[Original] ' + 'DEVELOPERS DOMAIN');
        e.edit({ name: 'SHATTERDOME'});
        out.push('[Modified] ' + 'SHATTERDOME');
      }
    });

    await msg.guild.channels.forEach(e => { 
      if (e.type === 'text' && e.id == '391490980249075722') {
        out.push('[Original] ' + 'rules_and_info');
        e.edit({ name: 'regulations'});
        out.push('[Modified] ' + 'regulations');
      }
      else if (e.type === 'text' && e.id == '399720486566887427') {
        out.push('[Original] ' + 'server_announcements');
        e.edit({ name: 'mission_orders'});
        out.push('[Modified] ' + 'mission_orders');
      }
      else if (e.type === 'text' && e.id == '391491052961398794') {
        out.push('[Original] ' + 'darlifra_news');
        e.edit({ name: 'breach_monitoring'});
        out.push('[Modified] ' + 'breach_monitoring');
      }
      else if (e.type === 'text' && e.id == '392840122158022656') {
        out.push('[Original] ' + 'twitter_feed');
        e.edit({ name: 'useless_clock'});
        out.push('[Modified] ' + 'useless_clock');
      }

      else if (e.type === 'text' && e.id == '391483720244264961') {
        out.push('[Original] ' + 'general_no_spoilers');
        e.edit({ name: 'general_no_uprising'});
        out.push('[Modified] ' + 'general_no_uprising');
      }
      else if (e.type === 'text' && e.id == '410176501506637825') {
        out.push('[Original] ' + 'serious_discussions');
        e.edit({ name: 'general_no_nonsense'});
        out.push('[Modified] ' + 'general_no_nonsense');
      }
      else if (e.type === 'text' && e.id == '405106850837823489') {
        out.push('[Original] ' + 'thotpatrol_talk');
        e.edit({ name: 'ranger_patrol'});
        out.push('[Modified] ' + 'ranger_patrol');
      }

      else if (e.type === 'text' && e.id == '391483819854790659') {
        out.push('[Original] ' + 'spoiler_talk');
        e.edit({ name: 'movie_talk'});
        out.push('[Modified] ' + 'movie_talk');
      }
      else if (e.type === 'text' && e.id == '410854637323681793') {
        out.push('[Original] ' + 'spoiler_garden');
        e.edit({ name: 'movie_debate'});
        out.push('[Modified] ' + 'movie_debate');
      }
      else if (e.type === 'text' && e.id == '401757017141805057') {
        out.push('[Original] ' + 'manga_talk');
        e.edit({ name: 'comics'});
        out.push('[Modified] ' + 'comics');
      }
      else if (e.type === 'text' && e.id == '391802707561938955') {
        out.push('[Original] ' + 'fanart');
        e.edit({ name: 'mecha_no_humans'});
        out.push('[Modified] ' + 'mecha_no_humans');
      }

      else if (e.type === 'text' && e.id == '420389771509104640') {
        out.push('[Original] ' + 'user_content');
        e.edit({ name: 'content_user'});
        out.push('[Modified] ' + 'content_user');
      }
      else if (e.type === 'text' && e.id == '405917768290926607') {
        out.push('[Original] ' + 'gaming_and_events');
        e.edit({ name: 'events_and_gaming'});
        out.push('[Modified] ' + 'events_and_gaming');
      }
      else if (e.type === 'text' && e.id == '392755801569099776') {
        out.push('[Original] ' + 'memes');
        e.edit({ name: 'semem'});
        out.push('[Modified] ' + 'semem');
      }
      else if (e.type === 'text' && e.id == '402327819536826368') {
        out.push('[Original] ' + 'music_and_voice');
        e.edit({ name: 'voice_and_music'});
        out.push('[Modified] ' + 'voice_and_music');
      }
      else if (e.type === 'text' && e.id == '391490499527311361') {
        out.push('[Original] ' + 'bot_channel');
        e.edit({ name: 'channel_bot'});
        out.push('[Modified] ' + 'channel_bot');
      }

      else if (e.type === 'text' && e.id == '403785158668320778') {
        out.push('[Original] ' + 'nsfw_text');
        e.edit({ name: 'smut'});
        out.push('[Modified] ' + 'smut');
      }
      else if (e.type === 'text' && e.id == '396819408489676820') {
        out.push('[Original] ' + 'nsfw_pics');
        e.edit({ name: 'porn'});
        out.push('[Modified] ' + 'porn');
      }

      else if (e.type === 'text' && e.id == '410189085714546698') {
        out.push('[Original] ' + 'dev_cave');
        e.edit({ name: 'shatterdome_control_room'});
        out.push('[Modified] ' + 'shatterdome_control_room');
      }
      else if (e.type === 'text' && e.id == '418976680363687936') {
        out.push('[Original] ' + 'dev_testing');
        e.edit({ name: 'shatterdome_hangar'});
        out.push('[Modified] ' + 'shatterdome_hangar');
      }
    });
    
    return msg.author.send(out, { split: true, code: 'txt' });
  }

  async restore(msg) {
    const out = [];
    await msg.guild.roles.forEach(e => {
      if (e.id == '417909635782279178') {
        out.push('[Original] ' + 'Yancy Becket' + ' : ' + '#277ecd');
        e.edit({ name: 'Like A Sibling', color: '#277ecd' });
        out.push('[Modified] ' + 'Like A Sibling' + ' : ' + '#277ecd');
      } 
      else if (e.id == '391489710922530828') {
        out.push('[Original] ' + 'Bots' + ' : ' + '#607d8b');
        e.edit({ name: 'BOTS', color: '#607d8b' });
        out.push('[Modified] ' + 'BOTS' + ' : ' + '#607d8b');
      }
      else if (e.id == '391490235227439104') {
        out.push('[Original] ' + 'Green Bitch' + ' : ' + '#000000');
        e.edit({ name: 'Tatsumaki', color: '#000000' });
        out.push('[Modified] ' + 'Tatsumaki' + ' : ' + '#000000');
      }
      else if (e.id == '392897098875404289') {
        out.push('[Original] ' + 'Naughty Rangers' + ' : ' + '#992d22');
        e.edit({ name: 'Muted', color: '#992d22' });
        out.push('[Modified] ' + 'Muted' + ' : ' + '#992d22');
      }
      else if (e.id == '412589195702435840') {
        out.push('[Original] ' + 'Shatterdome Staff' + ' : ' + '#69dab5');
        e.edit({ name: 'Developer', color: '#69dab5' });
        out.push('[Modified] ' + 'Developer' + ' : ' + '#69dab5');
      }
      else if (e.id == '421016755834716181') {
        out.push('[Original] ' + 'Promotion' + ' : ' + '#000000');
        e.edit({ name: 'Happy Birthday!', color: '#000000' });
        out.push('[Modified] ' + 'Happy Birthday!' + ' : ' + '#000000');
      }
      else if (e.id == '426686091274354690') {
        out.push('[Original] ' + 'Hannibal Chau' + ' : ' + '#69dab5');
        e.edit({ name: 'Geeks Bearing Dicks', color: '#69dab5' });
        out.push('[Modified] ' + 'Geeks Bearing Dicks' + ' : ' + '#69dab5');
      }
      else if (e.id == '392894112036159499') {
        out.push('[Original] ' + 'Crimson Typhoon' + ' : ' + '#dd4b4b');
        e.edit({ name: 'Strelizia', color: '#dd4b4b' });
        out.push('[Modified] ' + 'Strelizia' + ' : ' + '#dd4b4b');
      }
      else if (e.id == '392894894999601153') {
        out.push('[Original] ' + 'Cherno Alpha' + ' : ' + '#2ecc71');
        e.edit({ name: 'Genista', color: '#2ecc71' });
        out.push('[Modified] ' + 'Genista' + ' : ' + '#2ecc71');
      }
      else if (e.id == '392894507424940034') {
        out.push('[Original] ' + 'Coyote Tango' + ' : ' + '#da76a3');
        e.edit({ name: 'Argentea', color: '#da76a3' });
        out.push('[Modified] ' + 'Argentea' + ' : ' + '#da76a3');
      }
      else if (e.id == '392894974234198026') {
        out.push('[Original] ' + 'Striker Eureka' + ' : ' + '#9a72ce');
        e.edit({ name: 'Chlorophytum', color: '#9a72ce' });
        out.push('[Modified] ' + 'Chlorophytum' + ' : ' + '#9a72ce');
      }
      else if (e.id == '403740756105363457') {
        out.push('[Original] ' + 'Kaiju' + ' : ' + '#84c8ce');
        e.edit({ name: 'Kyoryu', color: '#84c8ce' });
        out.push('[Modified] ' + 'Kyoryu' + ' : ' + '#84c8ce');
      }
      else if (e.id == '392894559853477899') {
        out.push('[Original] ' + 'Gipsy Danger' + ' : ' + '#0089af');
        e.edit({ name: 'Delphinium', color: '#0089af' });
        out.push('[Modified] ' + 'Delphinium' + ' : ' + '#0089af');
      }
      else if (e.id == '412069721832292372') {
        out.push('[Original] ' + 'Newt & Gottlieb' + ' : ' + '#2772cd');
        e.edit({ name: 'Blue Oni', color: '#2772cd' });
        out.push('[Modified] ' + 'Blue Oni' + ' : ' + '#2772cd');
      }
      else if (e.id == '402315991918575636') {
        out.push('[Original] ' + 'Drift Compatible' + ' : ' + '#000000');
        e.edit({ name: 'Pollination', color: '#000000' });
        out.push('[Modified] ' + 'Pollination' + ' : ' + '#000000');
      }
      else if (e.id == '407759891927924737') {
        out.push('[Original] ' + 'Analog Not Digital' + ' : ' + '#000000');
        e.edit({ name: 'Literature Club', color: '#000000' });
        out.push('[Modified] ' + 'Literature Club' + ' : ' + '#000000');
      }
      else if (e.id == '405107014356697099') {
        out.push('[Original] ' + 'Retired Pilots' + ' : ' + '#000000');
        e.edit({ name: 'Thot Patrol', color: '#000000' });
        out.push('[Modified] ' + 'Thot Patrol' + ' : ' + '#000000');
      }
      else if (e.id == '422153053718708245') {
        out.push('[Original] ' + 'Washed-Out Rangers' + ' : ' + '#000000');
        e.edit({ name: 'Parasites', color: '#000000' });
        out.push('[Modified] ' + 'Parasites' + ' : ' + '#000000');
      }
    });

    await msg.guild.channels.forEach(e => { 
      if (e.type === 'category' && e.id == '409149728823967745') {
        out.push('[Original] ' + 'PACIFIC RIM');
        e.edit({ name: 'FRANXX'});
        out.push('[Modified] ' + 'FRANXX');
      }
      else if (e.type === 'category' && e.id == '410935760535945227') {
        out.push('[Original] ' + 'RANGER-RECREATION');
        e.edit({ name: 'COMMUNITY'});
        out.push('[Modified] ' + 'COMMUNITY');
      }
      else if (e.type === 'category' && e.id == '409150034744049704') {
        out.push('[Original] ' + 'RANGERS-REPRODUCTION');
        e.edit({ name: 'NSFW'});
        out.push('[Modified] ' + 'NSFW');
      }
      else if (e.type === 'category' && e.id == '415326318691876866') {
        out.push('[Original] ' + 'SHATTERDOME');
        e.edit({ name: 'DEVELOPERS DOMAIN'});
        out.push('[Modified] ' + 'DEVELOPERS DOMAIN');
      }
    });

    await msg.guild.channels.forEach(e => { 
      if (e.type === 'text' && e.id == '391490980249075722') {
        out.push('[Original] ' + 'regulations');
        e.edit({ name: 'rules_and_info'});
        out.push('[Modified] ' + 'rules_and_info');
      }
      else if (e.type === 'text' && e.id == '399720486566887427') {
        out.push('[Original] ' + 'mission_orders');
        e.edit({ name: 'server_announcements'});
        out.push('[Modified] ' + 'server_announcements');
      }
      else if (e.type === 'text' && e.id == '391491052961398794') {
        out.push('[Original] ' + 'breach_monitoring');
        e.edit({ name: 'darlifra_news'});
        out.push('[Modified] ' + 'darlifra_news');
      }
      else if (e.type === 'text' && e.id == '392840122158022656') {
        out.push('[Original] ' + 'useless_clock');
        e.edit({ name: 'twitter_feed'});
        out.push('[Modified] ' + 'twitter_feed');
      }

      else if (e.type === 'text' && e.id == '391483720244264961') {
        out.push('[Original] ' + 'general_no_uprising');
        e.edit({ name: 'general_no_spoilers'});
        out.push('[Modified] ' + 'general_no_spoilers');
      }
      else if (e.type === 'text' && e.id == '410176501506637825') {
        out.push('[Original] ' + 'general_no_nonsense');
        e.edit({ name: 'serious_discussions'});
        out.push('[Modified] ' + 'serious_discussions');
      }
      else if (e.type === 'text' && e.id == '405106850837823489') {
        out.push('[Original] ' + 'ranger_patrol');
        e.edit({ name: 'thotpatrol_talk'});
        out.push('[Modified] ' + 'thotpatrol_talk');
      }

      else if (e.type === 'text' && e.id == '391483819854790659') {
        out.push('[Original] ' + 'movie_talk');
        e.edit({ name: 'spoiler_talk'});
        out.push('[Modified] ' + 'spoiler_talk');
      }
      else if (e.type === 'text' && e.id == '410854637323681793') {
        out.push('[Original] ' + 'movie_debate');
        e.edit({ name: 'spoiler_garden'});
        out.push('[Modified] ' + 'spoiler_garden');
      }
      else if (e.type === 'text' && e.id == '401757017141805057') {
        out.push('[Original] ' + 'comics');
        e.edit({ name: 'manga_talk'});
        out.push('[Modified] ' + 'manga_talk');
      }
      else if (e.type === 'text' && e.id == '391802707561938955') {
        out.push('[Original] ' + 'mecha_no_humans');
        e.edit({ name: 'fanart'});
        out.push('[Modified] ' + 'fanart');
      }

      else if (e.type === 'text' && e.id == '420389771509104640') {
        out.push('[Original] ' + 'content_user');
        e.edit({ name: 'user_content'});
        out.push('[Modified] ' + 'user_content');
      }
      else if (e.type === 'text' && e.id == '405917768290926607') {
        out.push('[Original] ' + 'events_and_gaming');
        e.edit({ name: 'gaming_and_events'});
        out.push('[Modified] ' + 'gaming_and_events');
      }
      else if (e.type === 'text' && e.id == '392755801569099776') {
        out.push('[Original] ' + 'semem');
        e.edit({ name: 'memes'});
        out.push('[Modified] ' + 'memes');
      }
      else if (e.type === 'text' && e.id == '402327819536826368') {
        out.push('[Original] ' + 'voice_and_music');
        e.edit({ name: 'music_and_voice'});
        out.push('[Modified] ' + 'music_and_voice');
      }
      else if (e.type === 'text' && e.id == '391490499527311361') {
        out.push('[Original] ' + 'channel_bot');
        e.edit({ name: 'bot_channel'});
        out.push('[Modified] ' + 'bot_channel');
      }

      else if (e.type === 'text' && e.id == '403785158668320778') {
        out.push('[Original] ' + 'smut');
        e.edit({ name: 'nsfw_text'});
        out.push('[Modified] ' + 'nsfw_text');
      }
      else if (e.type === 'text' && e.id == '396819408489676820') {
        out.push('[Original] ' + 'porn');
        e.edit({ name: 'nsfw_pics'});
        out.push('[Modified] ' + 'nsfw_pics');
      }

      else if (e.type === 'text' && e.id == '410189085714546698') {
        out.push('[Original] ' + 'shatterdome_control_room');
        e.edit({ name: 'dev_cave'});
        out.push('[Modified] ' + 'dev_cave');
      }
      else if (e.type === 'text' && e.id == '418976680363687936') {
        out.push('[Original] ' + 'shatterdome_hangar');
        e.edit({ name: 'dev_testing'});
        out.push('[Modified] ' + 'dev_testing');
      }
    });
    
    return msg.author.send(out, { split: true, code: 'txt' });
  }

  async backup(msg) {
    const out = [];
    out.push('ROLES');
    await msg.guild.roles.forEach(e => { out.push(e.name + ' : ' + e.hexColor); });
    out.push(' ');
    out.push('CATEGORIES - TEXT');
    await msg.guild.channels.forEach(e => { if (e.type === 'text') out.push(e.name); });
    out.push(' ');
    out.push('CATEGORIES - CATEGORY');
    await msg.guild.channels.forEach(e => { if (e.type === 'category') out.push(e.name); });
    return msg.author.send(out, { split: true, code: 'txt' });
  }
};