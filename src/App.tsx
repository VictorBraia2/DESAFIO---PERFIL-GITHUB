import { useState } from "react";
import { getUser } from "./services/github";
import Profile from "./components/Profile";
import RepoList from "./components/RepoList";

function App(){
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!username) return;
    setLoading(true);
    setError("");
    try{
      const{user, repositories} = await(username);
      setUserData(user);
      setRepos(repositories);
    } catch (error) {
      setError("Usuario não econtrado ou erro na Api");
      setUserData(null);
      setRepos([]);
    }finally{
      setLoading(false);
    }
  };
return

}