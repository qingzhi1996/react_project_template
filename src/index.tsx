import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import App from './App';
import { store } from './store';

const container = document.getElementById('root');

if (container) {
  ReactDom.render(
    <Provider store={store}>
      <ConfigProvider locale={zh_CN}>
        <App />
      </ConfigProvider>
    </Provider>,
    container
  );
}
