#!/usr/bin/env node

'use strict';

const { author } = require('./package.json');
const blue = require('ansi-blue');
const exitHook = require('exit-hook');
const opn = require('opn');
const Select = require('./prompt-select');

const config = { pointer: blue('❯') };
const choices = new Select.Choices([{
  name: 'Github',
  url: 'https://github.com/marinko-peso'
}, {
  name: 'Contact',
  url: `mailto:${author.email}`
}, {
  name: 'Quit',
  action: () => process.exit()
}], config);

const g = `⌐${blue('■')}-${blue('■')}`;
console.log(`
  (${g})

  Hey, I'm
  ${blue('Marinko Pešo')}

  (${g})        I'm developer who adores python and javascript,
  ( •_•)>${g}   and can't imagine my life without coffee, LOTS of coffee.
`);

const select = new Select({ choices });
select.on('select', onSelect);
exitHook(() => select.end());
select.ask();

function onSelect(choice) {
  if (choice.url) return opn(choice.url);
  return choice.action && choice.action(choice, select);
}
