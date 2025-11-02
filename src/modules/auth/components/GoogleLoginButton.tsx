import React from "react";
import { GoogleOAuthProvider, GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import axios from "axios";

interface LoginResponse {
  access_token: string;
}

const GoogleLoginButton: React.FC = () => {
  
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("No se recibió credencial de Google");
      return;
    }

    try {
      const res = await axios.post<LoginResponse>(
        "http://localhost:3000/auth/google",
        { token: credentialResponse.credential }
      );
      localStorage.setItem("token", res.data.access_token);
      alert("Inicio de sesión con Google exitoso");
    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesión con Google");
    }
  };

  return (
    <GoogleOAuthProvider clientId="TU_CLIENT_ID.apps.googleusercontent.com">
      <GoogleLogin
        shape="pill"
        onSuccess={handleSuccess}
        onError={() => console.log("Error al iniciar con Google")}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
