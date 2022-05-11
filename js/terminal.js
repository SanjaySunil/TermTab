/* eslint-disable require-jsdoc */
greeting = 'TermTab [Version 1.2.1]\n(c) Sanjay Sunil. All rights reserved.\n';

commands = [
  {
    command: 'help',
    description: 'Provides a list of commands.',
  },
  {
    command: 'reboot',
    description: 'Restarts the terminal.',
  },
  {
    command: 'clear',
    description: 'Clears the terminal.',
  },
  {
    command: 'google [query]',
    description: 'Use Google search engine.',
  },
  {
    command: 'ddg [query]',
    description: 'Use DuckDuckGo search engine.',
  },
  {
    command: 'drive [query]',
    description: 'Query Google Drive.',
  },
  {
    command: 'bing [query]',
    description: 'Use Bing search engine.',
  },
  {
    command: 'yt [query]',
    description: 'Use Youtube search engine.',
  },
  {
    command: 'screenfetch',
    description: 'Displays useful system information.',
  },
];

const term = $('body').terminal(
    {
      reboot: function() {
        window.location.reload();
      },
      help: function() {
        const sortedCommandList = commands.sort(function(a, b) {
          const nameA = a.command.toUpperCase();
          const nameB = b.command.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        for (const i in sortedCommandList) {
          spaceLength = 30 - sortedCommandList[i]['command'].length;
          console.log(spaceLength);
          space = ' ';
          this.echo(`${sortedCommandList[i]['command']}${space.repeat(spaceLength)}${sortedCommandList[i]['description']}`);
        }
        this.echo('');
      },
      google: function(...args) {
        str = '';
        args.forEach((i) => {
          str = str + '+' + i;
        });
        location.href = `https://www.google.com/search?q=${str.substring(1)}`;
      },
      ddg: function(...args) {
        str = '';
        args.forEach((i) => {
          str = str + '+' + i;
        });
        location.href = `https://duckduckgo.com/?q=${str.substring(1)}`;
      },
      bing: function(...args) {
        str = '';
        args.forEach((i) => {
          str = str + '+' + i;
        });
        location.href = `https://www.bing.com/search?q=${str.substring(1)}`;
      },
      drive: function(...args) {
        str = '';
        args.forEach((i) => {
          str = str + '+' + i;
        });
        location.href = `https://drive.google.com/drive/search?q=${str.substring(1)}`;
      },
      yt: function(...args) {
        str = '';
        args.forEach((i) => {
          str = str + '+' + i;
        });
        location.href = `https://www.youtube.com/results?search_query=${str.substring(1)}`;
      },
      screenfetch: function() {
        navigator.sayswho = (function() {
          const ua = navigator.userAgent;
          let tem;
          let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
          if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
          }
          if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
          }
          M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
          if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
          return M.join(' ');
        })();

        function getPreferredColorScheme() {
          if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              return 'Dark';
            } else {
              return 'Light';
            }
          }
          return 'light';
        }

        term.echo(
            `\n88888888888 88888888888    root@termtab
    888         888        ------------
    888         888        OS: ${navigator.platform}
    888         888        Browser: ${navigator.sayswho}
    888         888        Resolution: ${window.screen.availWidth}x${window.screen.availWidth}
    888         888        Language: ${navigator.language}
    888         888        Browser Theme: ${getPreferredColorScheme()}
    888         888\n`.replace(new RegExp(' {' + (term.version().length + 1) + '}$'), ''),
        );
      },
    },
    {
      checkArity: false,
      name: 'TermTab',
      greetings: greeting,
      strings: {
        commandNotFound: '%s: command not found',
      },
    },
);

term.set_prompt(function(set_prompt) {
  set_prompt(`$ `);
});
