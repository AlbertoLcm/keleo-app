import { SealCheckIcon } from "@phosphor-icons/react";

export default function MessageValidateAccount() {
  return (
    <section className="mt-6 p-4 ring-1 ring-green-100 rounded flex gap-4 items-center bg-green-50">
      <SealCheckIcon size={32} />
      <div className="flex-1">
        <h3>Verifica tu correo electrónico</h3>
        <p className="mt-2 text-sm text-gray-500">
          Te haz registrado correctamente. Te hemos enviado un correo electrónico para que verifiques tu cuenta
          y puedas ingresar a la aplicación. El código de verificación caduca en 10 minutos.
        </p>
      </div>
    </section>
  )
}