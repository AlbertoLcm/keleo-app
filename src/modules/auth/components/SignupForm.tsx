export default function SignupForm() {
  return (
    <>
      <h2>Crear Cuenta</h2>
      <form>
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="username">Nombre de Usuario</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Crear Cuenta</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a>
      </p>
    </>
  )
}