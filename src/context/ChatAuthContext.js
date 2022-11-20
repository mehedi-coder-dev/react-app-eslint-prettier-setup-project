import {
  createContext, useContext, useMemo, useReducer,
} from 'react';
import { AuthUseContext } from './AuthContext';

const ChatContext = createContext();

export const ChatUseContext = () => useContext(ChatContext);

// eslint-disable-next-line react/prop-types
export function ChatProvider({ children }) {
  const { currentUser } = AuthUseContext();

  const initialState = {
    chatId: null,
    user: {},
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'USER_CLICK':
        return {
          // eslint-disable-next-line max-len
          chatId: currentUser.uid > action.playload.uid ? currentUser.uid + action.playload.uid : action.playload.uid + currentUser.uid,
          user: action.playload,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ChatContext.Provider value={useMemo(() => ({ state, dispatch }), [state])}>
      {children}
    </ChatContext.Provider>
  );
}
