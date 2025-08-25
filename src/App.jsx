import {Routes,BrowserRouter,Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import FocusZone from "./pages/FocusZone"
import Journal from "./pages/Journal"
import LearnGrowth from "./pages/Learn"
import Mood from "./pages/Mood"
import SelfCare from "./pages/SelfCare"
import WellBeing from "./pages/WellBeing"
import Sidebar from "./components/common/Sidebar"
function App() {

  return (
    <div className="flex bg-[#FAFAFA] min-h-screen">
      <Sidebar/>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/focuszone" element={<FocusZone/>}/>
          <Route path="/journal" element={<Journal/>}/>
          <Route path="/learn" element={<LearnGrowth/>}/>
          <Route path="/mood" element={<Mood/>}/>
          <Route path="/selfcare" element={<SelfCare/>}/>
          <Route path="/wellbeing" element={<WellBeing/>}/>
        </Routes>
      </main>
      
    </div>
  )
}

export default App
