import { Outlet, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthorInfo from "../../components/AuthorInfo";
import ContainerRow from "../../components/ContainerRow";
import NavItem from "../../components/NavItem";

function Profile() {
  const { state, pathname } = useLocation();
  const { username } = useParams();
  const { loggedUser } = useAuth();

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
              <NavItem text="About Me" url="about" state={state} />              <NavItem text="My Articles" url="" state={state} />
              <NavItem text="Favorited Articles" url="favorites" state={state} />
            </ul>
          </div>
          {pathname.endsWith('/about') ? (
            <div className="about-me-content p-4">
              {state?.bio ? <p>{state.bio}</p> : <p className="text-muted">暂无个人简介</p>}
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
