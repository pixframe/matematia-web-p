import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // passes i18n down to react-i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          continue: 'Continue',
          login: 'Sign In',
          register: 'Sign Up',
          or: 'or',
          googleSignIn: 'Sign in with Google',
          facebookSignIn: 'Sign in with Facebook',
          email: 'Email',
          password: 'Password',
          repassword: 'Password confirmation',
          forgotPassword: 'Forgot password?',
          dontHaveAccount: "Don't have an account?",
          haveAccount: 'Already have an accound?',
          recoverInstructions:
            'To recover your password, enter the email address with which you registered.',
          recoverSuccess: 'We have sent you an email with which you can reset your password.',
          successEmailVerification: 'Your email has been successfully verified',
          invalidVerificationCode: 'Invalid verification code',
          enterNewPassword: 'Enter your new password',
          newPassword: 'New Password',
          reNewPassword: 'Confirm New Password',
          resetPasswordSuccess: 'Password successfully changed',
          resetPasswordInvalidCode:
            'Your request to reset your password has expired or the link has already been used',
          verifyYourEmail: 'Verify your email',
          verifyEmailInstructions:
            'Verifica tu cuenta usando el enlace que enviamos a tu dirección de correo electrónico'
        }
      },
      es: {
        translation: {
          continue: 'Continuar',
          login: 'Inicia Sesión',
          register: 'Regístrate',
          or: 'o',
          googleSignIn: 'Inicia sesión Google',
          facebookSignIn: 'Inicia sesión Facebook',
          email: 'Correo electrónico',
          password: 'Contraseña',
          repassword: 'Confirmación de contraseña',
          forgotPassword: '¿Olvidaste tu contraseña?',
          dontHaveAccount: '¿Aún no tienes cuenta?',
          haveAccount: '¿Ya tienes cuenta?',
          recoverInstructions:
            'Para recuperar tu contraseña, introduce la dirección de correo electrónico con la que te regístraste.',
          recoverSuccess: 'Te hemos enviado un correo con el que podrás restablecer tu contraseña.',
          successEmailVerification: 'Tu correo ha sido verificado con éxito',
          invalidVerificationCode: 'Código de verificación invalido',
          enterNewPassword: 'Introduce tu nueva contraseña',
          newPassword: 'Nueva Contraseña',
          reNewPassword: 'Confirmación de Contraseña',
          resetPasswordSuccess: 'Contraseña actualizada con éxito',
          resetPasswordInvalidCode:
            'Tu solicitud para restablecer tu contraseña ha expirado o el enlace ya se ha utilizado',
          verifyYourEmail: 'Verifica tu correo',
          verifyEmailInstructions:
            'Verifica tu cuenta usando el enlace que enviamos a tu dirección de correo electrónico'
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
