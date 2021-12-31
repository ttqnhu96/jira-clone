import { Switch } from "react-router-dom";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import DrawerCyberBugs from './HOC/CyberbugsHOC/DrawerCyberBugs';
import NotFound from "./pages/NotFound/NotFound";
import UserManagement from "./pages/UserManagement/UserManagement";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";

function App() {
  return (
    <>
      <LoadingComponent />
      <DrawerCyberBugs />
      <Switch>
        <UserLoginTemplate exact path='/login' Component={LoginCyberBugs} />
        <CyberbugsTemplate exact path='/createproject' Component={CreateProject} />
        <CyberbugsTemplate exact path='/projectmanagement' Component={ProjectManagement} />
        <CyberbugsTemplate exact path='/projectdetail/:projectId' Component={ProjectDetail} />
        <CyberbugsTemplate exact path='/usermanagement' Component={UserManagement} />
        <CyberbugsTemplate exact path='/' Component={ProjectManagement} />
        <HomeTemplate exact path='*' Component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
