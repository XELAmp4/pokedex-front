const SessionManager = {
    setSessionData(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
    getSessionData(key) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    },
    clearSessionData(key) {
      localStorage.removeItem(key);
    }
  };
  
export default SessionManager;
  