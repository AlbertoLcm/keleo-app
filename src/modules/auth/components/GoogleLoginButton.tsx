import React from "react";

const GoogleLoginButton: React.FC = () => {
  const loginGoogleAuth = () => {
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    window.location.href = `${backendUrl}/api/v1/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={loginGoogleAuth}
      className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-keleo-50 dark:hover:bg-dark-card transition bg-white dark:bg-transparent text-gray-700 dark:text-white"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        className="w-5 h-5"
        alt="Google"
      />
      <span className="text-sm font-medium">Google</span>
    </button>
  );
};

export default GoogleLoginButton;
