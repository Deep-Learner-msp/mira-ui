const config = (BASE: string) => ({
  API: {
    GENERAL: {
      GET_INITIAL_SUGGESTIONS: BASE + "/get_initial_suggestions",
    },
    SESSION: {
      GET_ALL_SESSIONS: BASE + "/get_all_sessions",
      CREATE_SESSION: BASE + "/create_session",
    },
    CONVERSATION: {
      GET_MESSAGES: BASE + "/get_messages",
      GET_SESSION_STATUS: BASE + "/get_session_status",
      PROCESS_QUESTION: BASE + "/process_question",
    },
  },
});

export default config;
