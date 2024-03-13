export const SessionMixin = superClass =>
  class extends superClass {
    /* class fields & methods to extend superClass with */
    onBeforeEnter(location, commands) {
      if (!this.getAuthorized()) {
        return commands.redirect(
          '/login/' + encodeURIComponent(location.pathname)
        );
      }
    }

    getAuthorized() {
      return /true/i.test(sessionStorage.getItem('authorized'));
    }

    setAuthorized(val) {
      sessionStorage.setItem('authorized', val);
    }
  };
