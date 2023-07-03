const LoginForm = ({
  username, setUsername,
  password, setPassword,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          name="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          required
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm