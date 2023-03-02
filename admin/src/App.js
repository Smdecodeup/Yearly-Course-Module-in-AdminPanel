import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./component/Dashboard/Dashboard";
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
        <Route exact path="/admin" element={<Login />} />
        <Route path="/" element={<RestrictPage><Dashboard /></RestrictPage>} />
        <Route path="/module" element={<RestrictPage><ModuleListing /></RestrictPage>} />
        <Route path="/topic" element={<RestrictPage><TopicListing /></RestrictPage>} />
        <Route path="/topic/add-topic" element={<RestrictPage><AddTopic /></RestrictPage>} />
        <Route path="/topic/view-topic" element={<RestrictPage><ViewTopic /></RestrictPage>} />
        <Route path="/topic/edit-topic" element={<RestrictPage><EditTopic /></RestrictPage>} />
      </Routes>
      {isLoggedIn && <Sidebar />}
      {isLoggedIn && <Header />}
    </>
  );
}

function RestrictPage({ children }) {
  const { isLoggedIn } = useSelector(state => state.auth)
  return (isLoggedIn) ? children : <Navigate to="/admin" replace />;
}