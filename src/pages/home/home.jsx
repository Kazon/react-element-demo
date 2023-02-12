import { Carousel, Row, Col } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { useSessionStorageWithStore } from "../../hooks/localStorge"
import { msiteFoodTypes } from "../../service/city"
import store from "../../store"
import { setHeader } from "../../store/action"
import './home.css'


function Home() {
  const [goodTypes, setGoodTypes] = useState([])
  const [typeList, setTypeList] = useState([])

  const [session] = useSessionStorageWithStore('location', {})
  const [params] = useSearchParams()

  const imgBaseUrl = 'https://fuss10.elemecdn.com'

  useEffect(() => {
    mounted()
  }, [])

  useEffect(() => {
    const typeList = goodTypes.reduce((res, pre, i) => {
      const curIndex = Math.ceil((i + 1) / 8)
      if(!res[curIndex]) res[curIndex] = new Array()
      res[curIndex].push(pre)
      return res
    }, [])
    setTypeList(typeList)
  }, [goodTypes])

  const mounted = async () => {
    const goodTypes = await msiteFoodTypes(params.get('geohash'))
    setGoodTypes(goodTypes)
  }

  useEffect(() => {
    store.dispatch(setHeader('center', session.address))
  }, [session])

  return (
    <div>
      <div className="swiper">
        {
          !!goodTypes.length ? (
            <Carousel autoplay dots={{className: 'dots'}}>
              {
                typeList.map((t, i) => {
                  return (
                    <div key={i}>
                      <Row>
                        {
                          t.map(g => {
                            return (
                              <Col span={6} key={g.id}>
                                <div className="good-type">
                                  <img className="type-img" src={imgBaseUrl + g.image_url} alt={g.description} />
                                  <div className="type-name">{g.title}</div>
                                </div>
                              </Col>
                            )
                          })
                        }
                        <Col span={24}><div style={{height: '1.5rem', backgroundColor: '#fff'}}></div></Col>
                      </Row>
                    </div>
                  )
                })
              }
            </Carousel>
          ) : null
        }
      </div>
    </div>
  )
}

export default Home