import config from "./config";
import fetch_wrapper from "./fetch-wrapper";
import localforage from "localforage";

const SECONDS = 100000000;

interface Mira {
  config: any;
  options: object;
  events: any;
  user: any;
  user_lastFetched: any;
}

interface Converstaion {
  config: any;
  size: any;
  messages: any;
  events: any;
  intervalId: any;
  eventSourceObject: any;
  interval: any;
  sessionId: any;
  isLoading: any;
  statusMessage: any;
}

class Converstaion implements Converstaion {
  constructor(sessionId, options) {
    this.config = config(options.apiBase);
    this.size = 0;
    this.messages = [];
    this.intervalId = null;
    this.eventSourceObject = null;
    this.interval = SECONDS;
    this.sessionId = sessionId;
    this.isLoading = false;
    this.statusMessage = "";
    this.events = new EventTarget();
  }

  async startPolling() {
    this.checkStatus();
    this.intervalId = setInterval(() => {
      this.checkStatus();
    }, this.interval);
  }

  getMessages() {
    console.log(this.messages);
    return JSON.parse(JSON.stringify(this.messages)).sort(
      (d: { time: string }, k: { time: string }) => {
        return d.time.localeCompare(k.time);
      }
    );
  }

  async getSessionStatus() {
    console.log(this.sessionId);
    return fetch_wrapper(
      this.config.API.CONVERSATION.GET_SESSION_STATUS,
      "POST",
      { sessionId: this.sessionId },
      "Fetched",
      "Failed"
    )
      .then((d: any) => {
        return d;
      })
      .catch((e) => {
        return e;
      });
  }

  async processQuestion(question: string, messageType: string) {
    return fetch_wrapper(
      this.config.API.CONVERSATION.PROCESS_QUESTION,
      "POST",
      {
        sessionId: this.sessionId,
        question: question,
        messageType: messageType,
      },
      "Fetched",
      "Failed"
    )
      .then(async (d: any) => {
        await this.checkStatus();
        return d;
      })
      .catch((e) => {
        return e;
      });
  }

  async fetchMessages(startOffset: number, endOffset: number) {
    return new Promise((resolve, reject) => {
      fetch_wrapper(
        this.config.API.CONVERSATION.GET_MESSAGES,
        "POST",
        {
          sessionId: this.sessionId,
          startOffset: startOffset,
          endOffset: endOffset,
        },
        "Fetched",
        "Failed"
      )
        .then((d: any) => {
          resolve(d.messages);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async persistMessages() {
    return localforage.setItem(this.sessionId, this.messages);
  }

  async checkStatus() {
    return new Promise((resolve, reject) => {
      this.getSessionStatus().then((sessionStaus: any) => {
        if (
          this.isLoading !== sessionStaus.loading ||
          this.statusMessage !== sessionStaus.status_message
        ) {
          this.isLoading = sessionStaus.loading;
          this.statusMessage = sessionStaus.status_message;
          this.events.dispatchEvent(new Event("conversation"));
        }

        if (sessionStaus.size > this.messages.length) {
          this.fetchMessages(this.size, sessionStaus.size)
            .then((newMessages: any) => {
              var currMessageIds = this.messages.map((d) => d.messageId);
              var uniquenewMessages = newMessages.filter((d) => {
                return currMessageIds.indexOf(d.messageId) === -1;
              });
              this.messages = [...this.messages, ...uniquenewMessages];

              this.size = sessionStaus.size;
              this.events.dispatchEvent(new Event("conversation"));
              this.persistMessages();
              resolve(true);
            })
            .catch((e) => {
              reject(e);
            });
        } else {
          resolve(true);
        }
      });
    });
  }

  async loadPersistedMessages() {
    return new Promise((resolve, reject) => {
      localforage
        .getItem(this.sessionId)
        .then((old_messages: any) => {
          if (old_messages && old_messages.length) {
            this.messages = old_messages;
            this.size = old_messages.length;
            this.events.dispatchEvent(new Event("conversation"));
          }
          resolve(true);
        })
        .catch((e) => {
          console.log("get Storage failed", e);
          reject(e);
        });
    });
  }
}

class Mira implements Mira {
  constructor(options) {
    this.options = options;
    this.config = config(options?.apiBase);
    this.events = new EventTarget();
  }
  createConvObj(sessionId) {
    var newConv = new Converstaion(sessionId, this.options);
    newConv.loadPersistedMessages().then(() => {
      newConv.startPolling();
    });
    return newConv;
  }

  async createSession(question: string, messageType: string) {
    return new Promise((resolve, reject) => {
      fetch_wrapper(
        this.config.API.SESSION.CREATE_SESSION,
        "POST",
        {
          question: question,
          messageType: messageType,
        },
        "Fetched",
        "Failed"
      )
        .then(async (d: any) => {
          this.events.dispatchEvent(new Event("session"));
          resolve(d.sessionId);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getAllSessions() {
    return new Promise((resolve, reject) => {
      fetch_wrapper(
        this.config.API.SESSION.GET_ALL_SESSIONS,
        "POST",
        {},
        "Fetched",
        "Failed"
      )
        .then(async (d: any) => {
          // this.events.dispatchEvent(new Event("session"));
          resolve(d.sessions);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export default Mira;
