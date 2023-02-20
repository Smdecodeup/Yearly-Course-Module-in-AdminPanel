import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
import ModuleListing from "./component/modules/ModuleListing";
import Header from "./component/navcomponent/Header";
import Sidebar from "./component/navcomponent/sidebar";
import AddTopic from "./component/topics/AddTopic";
import EditTopic from "./component/topics/EditTopic";
import TopicListing from "./component/topics/TopicListing";
import ViewTopic from "./component/topics/ViewTopic";

export default function App() {
  const { isLoggedIn } = useSelector(state => state.auth)
  return (
    <>
      <Routes>
      <Route element={<Sidebar />}/>
      <Route element={<Header />} />
        <Route exact path="/" element={<Login />} />
        <Route path="/module" element={<ModuleListing />} />
        <Route path="/topic" element={<TopicListing />} />
        <Route path="/topic/add-topic" element={<AddTopic />} />
        <Route path="/topic/view-topic" element={<ViewTopic />} />
        <Route path="/topic/edit-topic" element={<EditTopic />} />
      </Routes>
      {isLoggedIn && <Sidebar />}
      {isLoggedIn && <Header />}
    </>
  );
}

function RestrictPage(children) {
  const {isLoggedIn}  = useSelector(state =>state.auth)
  return (isLoggedIn) ? children : <Navigate to="/" replace />;
}
