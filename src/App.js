import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store'
import { Spin } from 'antd'
import Layout from './layout/index';
import { useEffect, useState } from 'react';


function App() {
  const [laoding, setLoading] = useState(store.getState().globalLoading)
  store.subscribe(() => {
    setLoading(store.getState().globalLoading)
  })
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Spin 
          className="spin"
          spinning={ laoding } 
          tip="加载中..." 
          size="large">
          <Layout />
        </Spin>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
