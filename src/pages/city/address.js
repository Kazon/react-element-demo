import { Button, Input, message } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Rows from "../../components/row"
import { useLocalStorge, useSessionStorageWithStore } from "../../hooks/localStorge"
import { getCurrentCity, getPois } from "../../service/city"
import store from "../../store"
import { setHeader, setState } from "../../store/action"
import './address.css'

function Address(){
  const [currentCity, setCurrentCityy] = useState({})
  const [value, setValue] = useState('')
  const [searchList, setSearchList] = useState([])
  const [showList, setShowList] = useState([])
  const params = useParams()
  // const [placeHistory, setPlaceHistory] = useLocalStorge('placeHistory', '[]')
  const [placeHistory, setPlaceHistory] = useLocalStorge('placeHistory', [])
  const [session, setSession] = useSessionStorageWithStore('location', {})
  
  const navigate = useNavigate()

  useEffect(() => {
    setShowList(!!searchList.length ? searchList : placeHistory)
  }, [searchList, placeHistory])

  useEffect(() => {
    if(!value.toString()) setSearchList([])
  }, [value])

  useEffect(() => {
    mounted()
  }, [])

  const mounted = async () => {
    const currentCity = await getCurrentCity(params.id)
    await setCurrentCityy(currentCity)
    store.dispatch(setHeader('center', currentCity.name))
  }

  const findAddress = async () => {
    if(!value.toString()) {
      message.error('请填写地址后提交！')
      return
    }
    const searchList = await getPois({
      keyword: value,
      type: 'search',
      city_id: currentCity.id,
    })
    setSearchList(searchList)
  }

  const selectedAddress = async address => {
    const index = placeHistory.findIndex(i => i.geohash == address.geohash)
    await setPlaceHistory([address, ...placeHistory.filter((f, i) => i != index)])
    await setSession(address)
    // store.dispatch(setState('address', address.name))
    navigate(`/home?geohash=${address.geohash}`)
  }
  
  return (
    <div>
      <Rows 
        style={{padding: '.75rem 0 0 0', border: 'none'}}
        center={
          <Input 
            style={{width: '90vw'}} 
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="输入学校、商务楼、地址"
            allowClear={true}
          />}
      />
      <Rows 
        style={{paddingBottom: '.4rem'}}
        center={
          <Button 
            type="primary"
            style={{width: '90vw'}} 
            onClick={findAddress}
          >
            提交
          </Button>}
      />
      <div style={{padding: '.5rem 0 .5rem .75rem', borderBottom: '1px solid #e4e4e4'}}>搜索历史</div>
      {
        showList.map(a => {
          return (
            <Rows 
              key={a.geohash}
              style={{padding: '.75rem .75rem'}}
              onClick={() => selectedAddress(a)}
              left={
                <div className="history-address">
                  <div className="address">{ a.name }</div>
                  <div className="address-detail">{ a.address }</div>
                </div>}
            />
          )
        })
      }
      { placeHistory.length ? <Rows 
        style={{padding: '.5rem 0'}}
        center={
          <div 
            style={{fontSize: '1rem', color: '#666'}} 
            onClick={() => setPlaceHistory([])}
          >
            清空所有
          </div>}
      /> : null }
    </div>
  )
}

export default Address