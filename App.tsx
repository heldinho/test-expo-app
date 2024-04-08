import * as React from 'react';
import BoardScreen from './src/App/Kanban/screens/board.screen';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <BoardScreen />
    </RecoilRoot>
  );
}
