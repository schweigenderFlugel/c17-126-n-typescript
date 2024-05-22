import { NormalContainer } from "./ActivationFormContainer"

export const BlockedAccountMessage = () => {
  return (
    <NormalContainer subtitle="Cuenta bloqueda">
        <p>Lo sentimos, pero has excedido el límite de intentos para ingresar a tu cuenta. Y por motivos de segurida hemos decidido bloquerla. Por favor, pongase en contacto con el soporte técnico</p>
    </NormalContainer>
  )
}