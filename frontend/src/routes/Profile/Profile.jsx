import { Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthorInfo from "../../components/AuthorInfo";
import ContainerRow from "../../components/ContainerRow";
import NavItem from "../../components/NavItem";
import { useAuth } from "../../context/AuthContext";
import getProfile from "../../services/getProfile";

function Profile() {
  const { state } = useLocation();
  const { username } = useParams();
  const { headers } = useAuth();
  const [activeTab, setActiveTab] = useState("about-me");
  const [profile, setProfile] = useState(state || {});

  useEffect(() => {
    getProfile({ headers, username })
      .then(setProfile)
      .catch(console.error);
  }, [username, headers]);

  return (
    <div className="profile-page">
      <div className="user-info">
        <ContainerRow>
          <AuthorInfo />
        </ContainerRow>
      </div>

      <ContainerRow>
        <div className="col-xs-12 col-md-10 offset-md-1">
          <div className="articles-toggle">
            <ul className="nav nav-pills outline-active">
              <li className={activeTab === "about-me" ? "active" : ""} style={{cursor: "pointer"}} onClick={() => setActiveTab("about-me")}>
                <span className="nav-link">About Me</span>
              </li>
              <NavItem text="My Articles" url="" state={state} />
              <NavItem text="Favorited Articles" url="favorites" state={state} />
            </ul>
          </div>
          {activeTab === "about-me" ? (
            <div className="about-me-content p-3">
              <p className="text-gray-dark">{profile.bio || "暂无个人简介"}</p>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </ContainerRow>
    </div>
  );
}

export default Profile;
