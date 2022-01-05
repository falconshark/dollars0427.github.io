export default class History {
  constructor(core) {
    this.core = core;
    core.plugins.history = this;
    this.records = [];
    this.currentName = '';

    this.init();
  }
  init() {
    const core = this.core;

    core.use('script-exec', this.record.bind(this));
  }
  async record(ctx, next) {
    const { command, params } = ctx;
    let text;

    if (command === 'text' && params.text) {
      text = params.text;
    } else if (command === '*') {
      text = params.raw;
    } else {
      return next();
    }

    const start = text.indexOf('【');
    const end = text.indexOf('】');
    let name = '';

    if (start > -1 && end > -1) {
      name = text.substring(start + 1, end);
      this.currentName = name;

      return next();
    }

    this.records.push({
      name: this.currentName,
      text
    });

    return next();
  }
  getData() {
    return this.records;
  }
}
