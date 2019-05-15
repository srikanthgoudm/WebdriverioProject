const { Page } = require('./../core/page');

class HomepagePage extends Page {
  constructor(world) {
    super(world);
  }

  open() {
    super.open();
    this.browser.waitForVisible('#header_logo');
  }

  getPageTitle() {
    const pageTitle = this.getTitle();
    console.log(pageTitle)
    return pageTitle;
  }
  
}

module.exports = { HomepagePage };
