import { SealCheckIcon } from "@phosphor-icons/react";

export default function MessageValidateAccount() {
  return (
    <section className="mt-6 p-6 border border-green-200 dark:border-green-900/50 rounded-2xl flex gap-5 items-start bg-green-50 dark:bg-green-900/20">
      <div className="text-green-600 dark:text-green-400 shrink-0 mt-1">
        <SealCheckIcon size={32} weight="fill" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-300">
          Verifica tu correo electrónico
        </h3>
        <p className="mt-2 text-sm text-green-800/80 dark:text-green-200/70 leading-relaxed">
          Te has registrado correctamente. Te hemos enviado un correo electrónico para que verifiques tu cuenta
          y puedas ingresar a la aplicación. El código de verificación caduca en 10 minutos.
        </p>
      </div>
    </section>
  )
}