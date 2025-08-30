import { useReactiveVar } from '@apollo/client';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { socketVar, userVar } from '../../apollo/store';
import { RippleBadge } from '../../scss/MaterialTheme/styled';
import { REACT_APP_API_URL } from '../config';
import { sweetErrorAlert } from '../sweetAlert';
import { Member } from '../types/member/member';

interface MessagePayload {
  event: string;
  text: string;
  memberData: Member;
}

interface InfoPayload {
  event: string;
  totalClients: number;
  memberData: Member;
  action: string;
}

const Chat = () => {
  const chatContentRef = useRef<HTMLDivElement>(null);
  const [messagesList, setMessagesList] = useState<MessagePayload[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [messageInput, setMessageInput] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [openButton, setOpenButton] = useState(false);
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const socket = useReactiveVar(socketVar);

  /** LIFECYCLES **/
  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      switch (data.event) {
        case 'info':
          setOnlineUsers(data.totalClients);
          break;
        case 'getMessages':
          setMessagesList(data.list);
          break;
        case 'message':
          setMessagesList((prev) => [...prev, data]);
          break;
      }
    };
  }, [socket]);

  useEffect(() => {
    const timeoutId = setTimeout(() => setOpenButton(true), 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleOpenChat = () => setOpen((prev) => !prev);

  const getInputMessageHandler = useCallback(
    (e: any) => setMessageInput(e.target.value),
    []
  );

  const getKeyHandler = (e: any) => e.key === 'Enter' && onClickHandler();

  const onClickHandler = () => {
    if (!messageInput) sweetErrorAlert('Please enter a message');
    else {
      socket.send(JSON.stringify({ event: 'message', data: messageInput }));
      setMessageInput('');
    }
  };

  const handleAvatarClick = (id: string) => {
    router.push(`/member?memberId=${id}`);
  };

  return (
    <Stack className="chatting">
      {openButton && (
        <button className="chat-button" onClick={handleOpenChat}>
          {open ? <CloseFullscreenIcon /> : <MarkChatUnreadIcon />}
        </button>
      )}

      <Stack className={`chat-frame ${open ? 'open' : ''}`}>
        <Box className="chat-top">
          <div style={{ fontFamily: 'DM Sans' }}>Online Chat</div>
          <RippleBadge badgeContent={onlineUsers} />
        </Box>

        <Box className="chat-content" ref={chatContentRef}>
          <ScrollableFeed>
            <Stack className="chat-main">
              <Box className="welcome-box">
                <div className="welcome">Welcome to Live chat!</div>
              </Box>

              {messagesList.map((msg: MessagePayload, idx) => {
                const { text, memberData } = msg;
                const memberImage = memberData?.memberImage
                  ? `${REACT_APP_API_URL}/${memberData.memberImage}`
                  : '/img/profile/defaultUser.svg';

                const isMine = memberData?._id === user?._id;

                return (
                  <Box
                    key={idx}
                    className={`msg-row ${isMine ? 'mine' : 'other'}`}
                  >
                    {!isMine && (
                      <Avatar
                        src={memberImage}
                        alt={memberData.memberNick}
                        className="chat-avatar"
                        onClick={() => handleAvatarClick(memberData._id)}
                      />
                    )}
                    <div className={isMine ? 'msg-right' : 'msg-left'}>{text}</div>
                  </Box>
                );
              })}
            </Stack>
          </ScrollableFeed>
        </Box>

        <Box className="chat-bott">
          <input
            type="text"
            placeholder="Type message"
            value={messageInput}
            onChange={getInputMessageHandler}
            onKeyDown={getKeyHandler}
          />
          <button className="send-msg-btn" onClick={onClickHandler}>
            <SendIcon style={{ color: '#fff' }} />
          </button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Chat;
