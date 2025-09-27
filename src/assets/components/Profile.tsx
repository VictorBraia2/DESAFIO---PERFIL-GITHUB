import type { User } from "../../services/github";



type Props = { user: User };

export default function Profile({ user }: Props) {
  return (
    <div className="card profile">
      <div className="profile-left">
        <img src={user.avatar_url} alt={user.login} className="avatar" />
      </div>
      <div className="profile-right">
        <h2>{user.name ?? user.login}</h2>
        <p className="muted">@{user.login}</p>
        {user.bio && <p>{user.bio}</p>}
        <div className="counters">
          <div><strong>{user.public_repos}</strong><span>Repos</span></div>
          <div><strong>{user.followers}</strong><span>Followers</span></div>
          <div><strong>{user.following}</strong><span>Following</span></div>
        </div>
        <div className="meta">
          {user.company && <div>{user.company}</div>}
          {user.location && <div>{user.location}</div>}
          {user.blog && <div><a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noreferrer">{user.blog}</a></div>}
        </div>
      </div>
    </div>
  );
}
