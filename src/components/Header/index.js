import { LeftOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import store from '../../store'
import './index.css'

function Header(){
  const navigate = useNavigate()

  const path = useLocation().pathname.split('/')[1]
  const [showBack, setShowBack] = useState(true)
  const [showLogo, setShowLogo] = useState(false)
  const [showCenter, setShowCenter] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [showSwitchCity, setShowSwitchCity] = useState(false)

  const [header, setHeaders] = useState(store.getState().header)
  store.subscribe(async () => {
    await setHeaders(store.getState().header)
  })

  const unshowBackRoute = ['city', '']
  const showSwitchCityRoute = ['address']
  const showCenterRoute = ['address', 'home']

  const back = () => {
    window.history.back()
  }

  useEffect(() => {
    setShowLogin(!showSwitchCity)
  }, [showSwitchCity])

  useEffect(() => {
    setShowLogo(!showBack)
  }, [showBack])

  useEffect(() => {
    setShowBack(!unshowBackRoute.some(k => path == k))
    setShowCenter(showCenterRoute.some(k => path == k))
    setShowSwitchCity(showSwitchCityRoute.some(k => path == k))
  }, [path])

  const centerClick = () => {
    if(['home'].includes(path))
      navigate('/')
  }

  return (
    <div className="city-header">
      <div className='left'>
        { showLogo ? <span>react.ele</span> : null }
        { showBack ? <LeftOutlined onClick={back} /> : null }
      </div>
      <div className='center' onClick={centerClick}>{ showCenter ? <span>{header.center}</span> : null}</div>
      <div className='right'>
          { showLogin ? (
            <div >
              <span>登录</span> | <span>注册</span>
            </div>
          ) : null }
          { showSwitchCity ? <span onClick={() => navigate('/')}>切换城市</span> : null }
      </div>
    </div>
  )
}

export default Header