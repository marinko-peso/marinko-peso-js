#!/usr/bin/env node

'use strict';

const { author } = require('./package.json');
const green = require('ansi-green');
const red = require('ansi-red');
const exitHook = require('exit-hook');
const opn = require('opn');
const Select = require('./prompt-select');

const config = { pointer: green('❯') };
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

const g = `⌐${green('■')}-${green('■')}`;
console.log(`
  (${g})

  Hey, I'm
  ${green('Marinko Pešo')}

  (${g})        I'm a developer who loves ${green('Python')} and ${red('Javascript')},
  ( •_•)>${g}   and can't imagine my life without coffee, LOTS & LOTS of coffee.
`);

const select = new Select({ choices });
select.on('select', onSelect);
exitHook(() => select.end());
select.ask();

function onSelect(choice) {
  if (choice.url) return opn(choice.url);
  return choice.action && choice.action(choice, select);
}
