import Header from "../components/Header"
import DefineRoutes from "../router/router"

function Layout(){
  return (
    <div style={{height: '100vh'}}>
      <Header/>
      <div style={{minHeight: 'calc(100vh - 2.5rem)', backgroundColor: '#f5f5f5'}}>
        <DefineRoutes></DefineRoutes>
      </div>
    </div>
  )
}

export default Layout