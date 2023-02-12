import { useEffect, useState } from "react"
import './city.css'
import Rows from "../../components/row/index"
import { RightOutlined } from '@ant-design/icons'
import { getCityList, guessCity, hotcity } from '../../service/city'
import { Row, Col } from 'antd'
import { useNavigate } from "react-router-dom"

function City(){
  // let cityList = {}
  const [sortCityList, setSortCityList] = useState({})
  const [currentCity, setCurrentCity] = useState({})
  const [hotCitys, setHotCitys] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    mounted()
    // setCurrentCity()
  }, [])

  const mounted = async () => {
    const cityList = await getCityList()
    const currentCity = await guessCity()
    const hotCity = await hotcity()
    setSortCityList(sortCity(cityList))
    setCurrentCity(currentCity)
    setHotCitys(hotCity)
  }

  const sortCity = cityList => {
    let sortList = {}
    for (let i = 65; i <= 90; i++) {
      if (cityList[String.fromCharCode(i)]) {
        sortList[String.fromCharCode(i)] = cityList[String.fromCharCode(i)];
      }
    }
    return sortList
  }

  const goToAddress = city => {
    navigate(`/address/${city.id}`)
  }
// 

  return (
    <div>
      <Rows 
        style={{ paddingTop: ".5rem" }}
        left={<span>当前定位城市：</span>}
        right={<span>定位不准时，请在城市列表中选择</span>}
      />
      <Rows
        onClick={() => goToAddress(currentCity)}
        style={{ cursor: 'pointer' }}
        left={<span style={{color: '#3190e8'}}>{ currentCity.name }</span>}
        right={ <RightOutlined/> }
      />
      <Rows 
        style={{ marginTop: ".5rem", fontSize: '.5rem' }}
        left={<span>热门城市</span>}
      />
      <Row>
        {
          hotCitys.map(v => {
            return (
              <Col span={6} key={v.id} onClick={() => goToAddress(v)}>
                <div className="block hot-city">{v.name}</div>
              </Col>
            )
          })
        }
      </Row>

      {
        Object.keys(sortCityList).map((k, i) => {
          return (
            <div style={{marginTop: '.75rem'}} key={k}>
              <Rows 
                left={<span>{ k }{ i === 0 ? <span>（按字母排序）</span> : null }</span>}
              />
              <Row>
                {
                  sortCityList[k].map(v => {
                    return (
                      <Col span={6} key={v.id} onClick={() => goToAddress(v)}>
                        <div className="block">{v.name}</div>
                      </Col>
                    )
                  })
                }
              </Row>
            </div>
          )
        })
      }
    </div>
  )
}

export default City