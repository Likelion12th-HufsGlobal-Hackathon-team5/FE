import Main from '../src/pages/main/index';
import Login from './pages/login';
import Mypage from './pages/mypage';
import SettingGame from './pages/game/settingGame';
import Game from './pages/game';
import GameResult from './pages/game/gameResult';
import Point from './pages/point';
import SiteMap from './pages/siteMap';

import Map from '../src/components/game/Map';

const routes=[
    {
        path: '/',
        element: <SiteMap />,
        name: '00.이동 페이지'
    },
    {
        path: '/main',
        element: <Main />,
        name: '01. 메인 페이지'
    },
    {
        path: '/login',
        element: <Login />,
        name: '02. 로그인 페이지'
    },
    {
        path: '/mypage',
        element: <Mypage />,
        name: '03. 마이 페이지'
    },
    {
        path: '/settingGame',
        element: <SettingGame />,
        name: '04. 게임세팅 페이지'
    },
    {
        path: '/game',
        element: <Game />,
        name: '05. 게임페이지'
    },
    {
        path: '/gameResult',
        element: <GameResult />,
        name: '06.게임 결과 페이지'
    },
    {
        path: '/point',
        element: <Point />,
        name: '07. 포인트 페이지'
    },
    {
        path:'/game/map',
        element:<Map />,
        name:'05-1.게임 - 카카오맵 페이지'
    },
]

export default routes;