export default function LoginForm() {
  return (
    <>
      <h2>Iniciar Sesión</h2>
      <form>
        <div>
          <label htmlFor="username">Correo Electrónico</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿Aún no tienes una cuenta? <a href="/register">Crear cuenta</a>
      </p>
      <p>
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
      </p>
    </>
  )
}