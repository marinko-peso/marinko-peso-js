'use strict';

const green = require('ansi-green');
const List = require('prompt-list');

class Select extends List {
  constructor(options = {}) {
    super(options);
    this.rl.removeListener('SIGINT', this.ui.forceClose);
    process.removeListener('exit', this.ui.forceClose);
  }

  end(state) {
    super.end(state);
  }

  renderChoice(choices) {
    return function (line) {
      const selected = choices.get(choices.position);
      return this === selected ? green(line) : line;
    };
  }

  renderHelp() {
    return '';
  }

  renderMessage() {
    return '';
  }

  submitAnswer(key) {
    const selected = this.choices.getChoice(key);
    this.emit('select', selected);
  }
}

module.exports = Select;
