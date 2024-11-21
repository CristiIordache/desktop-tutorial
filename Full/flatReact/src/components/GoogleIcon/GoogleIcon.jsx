import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

const GoogleIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 48 48">
      <path fill="#4285F4" d="M46.47 24.28c0-1.62-.14-3.18-.41-4.68H24v8.84h12.62c-.55 2.97-2.16 5.48-4.56 7.16v5.96h7.35c4.31-3.97 6.77-9.81 6.77-17.28z" />
      <path fill="#34A853" d="M24 48c6.12 0 11.24-2.03 14.98-5.48l-7.35-5.96c-2.04 1.37-4.61 2.18-7.63 2.18-5.87 0-10.83-3.97-12.6-9.29H3.84v6.04C7.6 43.49 15.22 48 24 48z" />
      <path fill="#FBBC05" d="M11.4 28.45a14.72 14.72 0 0 1 0-9.18V13.23H3.84a24.05 24.05 0 0 0 0 21.55l7.56-6.33z" />
      <path fill="#EA4335" d="M24 9.64c3.34 0 6.33 1.15 8.69 3.41l6.49-6.49C34.73 2.77 29.61 0 24 0 15.22 0 7.6 4.51 3.84 11.04l7.56 6.04c1.77-5.32 6.73-9.29 12.6-9.29z" />
    </SvgIcon>
  );
};

export default GoogleIcon;