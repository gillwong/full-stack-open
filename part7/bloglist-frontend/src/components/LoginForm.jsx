const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div className="m-1">
        username
        <input
          className="border-2 border-slate-500 rounded-md ml-1 px-1"
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          required
        />
      </div>
      <div className="m-1 mb-3">
        password
        <input
          className="border-2 border-slate-500 rounded-md ml-1 px-1"
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
        />
      </div>
      <button
        className="m-1 px-3 py-1 bg-green-600 text-white rounded-md"
        type="submit"
      >
        login
      </button>
    </form>
  )
}

export default LoginForm
