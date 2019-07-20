import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { NotificationsActive } from '@material-ui/icons';
import { get } from 'lodash/fp';
import { notification as notificationActions } from '../store/actions';
import { noTextHero } from '../assets';
import { firebase } from '../utils';
import { Notifications, Title } from '../components/home';

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    height: 100%;
    max-height: 100%;
    padding: 8vh 0 0;
    background-color: ${({ theme }) => theme.palette.primary.light};
  `,
  Header: styled.header`
    width: 90%;
  `,
  Main: styled.main`
    width: 90%;
  `,
  Paragraph: styled.p`
    margin-bottom: 32px;
    padding: 4vh 0;
    color: #000;
    background: url(${noTextHero}) right top / contain no-repeat;
    font-size: ${({ theme }) => theme.typography.pxToRem(20)};
    line-height: 1.5;
  `,
  UserName: styled.b`
    font-size: ${({ theme }) => theme.typography.pxToRem(22)};
    font-weight: 700;
  `,
  Row: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  `,
  Notification: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    padding: 2px 16px;
    border-radius: 16px;
    color: ${({ theme }) => theme.palette.primary.contrastText};
    background-color: #3143CA;
  `,
  NotificationsActive: styled(NotificationsActive)`
    margin-right: 8px;
    color: #FCE388;
    font-size: 1.5rem;
  `,
  HelperText: styled.p`
    color: #333333;
    font-size: 0.75rem;
    font-weight: 300;
  `,
};

const Home = () => {
  const user = useMemo(() => firebase.auth.getCurrentUser(), []);

  const notifications = useSelector(state => state.notification.notifications);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(notificationActions.fetchNotificationsRequest({ uid: user.uid }));
  }, [dispatch, user]);

  console.log(notifications);

  return (
    <S.Wrapper>
      <S.Header>
        <Title />
        <S.Paragraph>
          <S.UserName>{get('displayName', user)}</S.UserName>
          님,
          <br />
          서울의 밤을 마음껏 즐기세요.
          <br />
          그리고 편안하게 집으로!
        </S.Paragraph>
      </S.Header>
      <S.Main>
        <S.Row>
          <S.Notification>
            <S.NotificationsActive />
            <span>2</span>
          </S.Notification>
          <S.HelperText>
            하단 예약 2개 중 1개를 눌러 상세 경로를 확인하세요.
          </S.HelperText>
        </S.Row>
        <Notifications notifications={notifications} />
      </S.Main>
    </S.Wrapper>
  );
};

export default Home;
