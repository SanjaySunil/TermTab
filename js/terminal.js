/* eslint-disable require-jsdoc */
greeting = 'TermTab [Version 1.1.0]\n(c) Sanjay Sunil. All rights reserved.\n';

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
    description: 'Use Google search engine.'
  },
  {
    command: 'ddg [query]',
    description: 'Use DuckDuckGo search engine.'
  }
];

const term = $('body').terminal(
    {
      reboot: function() {
        window.location.reload();
      },
      help: function() {
        const sorted_command_list = commands.sort(function(a, b) {
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

        sorted_command_list.forEach((i) => {
          space_length = 10 - i.command.length;
          space = ' ';
          this.echo(`${i.command}${space.repeat(space_length)}${i.description}`);
        });

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
