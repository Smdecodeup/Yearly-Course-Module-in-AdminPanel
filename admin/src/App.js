import { Route, Routes } from "react-router-dom";
import ModuleListing from "./component/modules/ModuleListing";
import Header from "./component/navcomponent/Header";
import Sidebar from "./component/navcomponent/sidebar";
import AddTopic from "./component/topics/AddTopic";
import EditTopic from "./component/topics/EditTopic";
import TopicListing from "./component/topics/TopicListing";
import ViewTopic from "./component/topics/ViewTopic";

function App() {
  return (
    <>
      <Routes>
        <Route path="/module" element={<ModuleListing />} />
        <Route path="/topic" element={<TopicListing />} />
        <Route path="/topic/add-topic" element={<AddTopic />} />
        <Route path="/topic/view-topic" element={<ViewTopic />} />
        <Route path="/topic/edit-topic" element={<EditTopic />} />
      </Routes>
      <Sidebar />
      <Header />
    </>
  );
}

export default App;
