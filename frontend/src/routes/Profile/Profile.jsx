import { Outlet, useLocation, useParams, useSearchParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthorInfo from "../../components/AuthorInfo";
import ContainerRow from "../../components/ContainerRow";
import NavItem from "../../components/NavItem";
import getProfile from "../../services/getProfile";

function Profile() {
  const { state } = useLocation();
  const { username } = useParams();
  const { headers } = useAuth();
  const [searchParams] = useSearchParams();
  const isAboutTab = searchParams.get("tab") === "about";
  const [profileBio, setProfileBio] = useState(typeof state?.bio === "string" ? state.bio : "");
  const [bioLoading, setBioLoading] = useState(false);

  useEffect(() => {
    if (!isAboutTab || !username) {
      return;
    }

    let cancelled = false;
    setBioLoading(true);

    getProfile({ headers, username })
      .then((profile) => {
        if (!cancelled) {
          setProfileBio(profile?.bio || "");
        }
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) {
          setBioLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [headers, isAboutTab, username]);

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
              <NavItem text="About Me" url="?tab=about" state={state} />
              <NavItem text="My Articles" url="" state={state} />
              <NavItem text="Favorited Articles" url="favorites" state={state} />
            </ul>
          </div>
          {isAboutTab ? (
            <div className="article-preview profile-about-me">
              {bioLoading ? (
                <em>Loading About Me...</em>
              ) : profileBio.trim() ? (
                <Markdown options={{ forceBlock: true }}>{profileBio}</Markdown>
              ) : (
                <p className="text-muted">暂无个人简介</p>
              )}
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
