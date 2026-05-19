import Swal from 'sweetalert2';
import { notifications } from '@mantine/notifications';
import { sileo as sileoToast } from "sileo";

/*
HOW TO USE:
import this to your page/file: 
    import { swal, toast, sileo } from "../../utils/alerts";

    Custom message:
        sileo.success('This is a success sileo message');
    or with custom Title:
        sileo.success('This is a success sileo message', "Successful");


    onClick button: 
        <button type="button" onClick={() => sileo.success('This is a success sileo message')} className="login-btn">

*/

// ======================= UNIFIED STYLES INJECTION ==========================//

if (typeof document !== 'undefined' && !document.getElementById('alert-dynamic-styles')) {
  const style = document.createElement('style');
  style.id = 'alert-dynamic-styles';
  style.innerHTML = `
    /* SWEETALERT2 ENHANCEMENTS */
    .custom-swal-popup {
      background-color: var(--brand-white) !important;
      border-radius: 16px !important;
      box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important;
      padding: 32px 24px !important;
      font-family: var(--font-family) !important;
      border: 1px solid rgba(0,0,0,0.04) !important;
    }
    .custom-swal-title {
      font-size: 1.5rem !important;
      font-weight: 700 !important;
      color: var(--brand-dark-text) !important;
      margin-bottom: 8px !important;
      letter-spacing: -0.02em !important;
    }
    .custom-swal-html-container {
      font-size: 1rem !important;
      color: var(--brand-mid-gray) !important;
      line-height: 1.6 !important;
      margin-top: 8px !important;
    }
    .custom-swal-confirm-btn, .custom-swal-cancel-btn {
      border-radius: 8px !important;
      padding: 12px 28px !important;
      font-weight: 600 !important;
      font-size: 0.95rem !important;
      letter-spacing: 0.3px !important;
      transition: transform 0.1s ease, filter 0.2s ease, box-shadow 0.2s ease !important;
      color: var(--brand-white) !important;
      border: none !important;
    }
    .custom-swal-confirm-btn:hover, .custom-swal-cancel-btn:hover {
      filter: brightness(0.9) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      transform: translateY(-1px) !important;
    }
    .custom-swal-confirm-btn:active, .custom-swal-cancel-btn:active {
      transform: translateY(1px) !important;
    }
    
    /* SILEO TOAST ENHANCEMENTS */
    .sileo-dynamic-title { 
      color: var(--brand-white) !important; 
      font-weight: 700 !important; 
      font-size: 0.95rem !important; 
      letter-spacing: 0.3px !important; 
    }
    .sileo-dynamic-desc { 
      color: var(--brand-background) !important; 
      font-size: 0.85rem !important; 
      margin-top: 4px !important; 
      line-height: 1.4 !important;
    }
    .sileo-dynamic-badge { 
      background-color: rgba(255, 255, 255, 0.2) !important; 
      color: var(--brand-white) !important; 
      padding: 8px !important; 
      border-radius: 50% !important; 
      box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
    }
    .sileo-dynamic-badge svg { 
      color: var(--brand-white) !important; 
      fill: currentColor !important; 
      width: 20px !important; 
      height: 20px !important; 
    }
    .sileo-toaster { 
      z-index: 10000 !important; 
    }
  `;
  document.head.appendChild(style);
}

// ======================= SWEET ALERTS2 ==========================//

const MySwal = Swal.mixin({
  customClass: {
    popup: 'custom-swal-popup',
    title: 'custom-swal-title',
    htmlContainer: 'custom-swal-html-container',
    confirmButton: 'custom-swal-confirm-btn',
    cancelButton: 'custom-swal-cancel-btn',
  },
  buttonsStyling: true,
});

// SweetAlert2 - Modal dialogs
export const swal = {
  success: (title, text = '') => {
    return MySwal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: 'var(--brand-success)',
      timer: 4000,
      timerProgressBar: true,
    });
  },

  error: (title, text = '') => {
    return MySwal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: 'var(--brand-danger)',
      timer: 4000,
      timerProgressBar: true,
    });
  },

  warning: (title, text = '', time = 4000) => {
    const hasTimer = typeof time === "number" && time > 0;

    return MySwal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonColor: 'var(--brand-warning)',
      timer: time,
      ...(hasTimer ? { timer: time, timerProgressBar: true } : {}),
    });
  },

  info: (title, text = '') => {
    return MySwal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonColor: 'var(--brand-info)',
      timer: 4000,
      timerProgressBar: true,
    });
  },

  confirm: (title, text = '') => {
    return MySwal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonColor: 'var(--brand-success)',
      cancelButtonColor: 'var(--brand-danger)',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    });
  },

  loading: (title = 'Loading...') => {
    return MySwal.fire({
      title,
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
  },

  close: () => MySwal.close(),
};


// ======================= MANTINE TOAST ==========================//

// Global toast styles helper
const getToastStyles = (backgroundColor) => ({
  root: {
    backgroundColor,
    borderRadius: '12px',
    border: 'none',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
    padding: '16px 20px',
    '&::before': { display: 'none' },
  },
  title: {
    color: 'var(--brand-white)',
    fontWeight: 700,
    fontSize: '0.95rem',
    marginBottom: '4px',
    letterSpacing: '0.3px',
  },
  description: {
    color: 'var(--brand-background)',
    fontSize: '0.85rem',
    lineHeight: 1.4,
  },
  closeButton: {
    color: 'var(--brand-white)',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
});

// Mantine Notifications - Toast messages
export const toast = {
  success: (message, title = 'Success') => {
    notifications.show({
      title,
      message,
      autoClose: 3000,
      styles: () => getToastStyles('var(--brand-success)'),
    });
  },

  error: (message, title = 'Error') => {
    notifications.show({
      title,
      message,
      autoClose: 5000,
      styles: () => getToastStyles('var(--brand-danger)'),
    });
  },

  warning: (message, title = 'Warning') => {
    notifications.show({
      title,
      message,
      autoClose: 4000,
      styles: () => getToastStyles('var(--brand-warning)'),
    });
  },

  info: (message, title = 'Info') => {
    notifications.show({
      title,
      message,
      autoClose: 3000,
      styles: () => getToastStyles('var(--brand-info)'),
    });
  },
};

// ======================= SILEO ==========================//

// Centralized Theme Helper using the generated classes
const getSileoTheme = (fillColor) => ({
  fill: fillColor,
  styles: {
    title: "sileo-dynamic-title",
    description: "sileo-dynamic-desc",
    badge: "sileo-dynamic-badge",
  },
});

export const sileo = {
  success: (message, title = 'Success') => {
    sileoToast.success({
      title: title,
      description: message,
      ...getSileoTheme('var(--brand-success)'),
    });
  },

  error: (message, title = 'Error') => {
    sileoToast.error({
      title: title,
      description: message,
      ...getSileoTheme('var(--brand-danger)'),
    });
  },

  warning: (message, title = 'Warning') => {
    sileoToast.warning({
      title: title,
      description: message,
      ...getSileoTheme('var(--brand-warning)'),
    });
  },

  info: (message, title = 'Info') => {
    sileoToast.info({
      title: title,
      description: message,
      ...getSileoTheme('var(--brand-info)'),
    });
  },
};

// Regie ver
export const showSuccessAlert = (title, text) => {
  return MySwal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonColor: 'var(--brand-success)',
    showConfirmButton: true,
  });
};

export const showErrorAlert = (title, text) => {
  return MySwal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonColor: 'var(--brand-danger)',
    showConfirmButton: true,
  });
};

export const showConfirmationAlert = (title, text) => {
  return MySwal.fire({
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: 'var(--brand-success)',
    cancelButtonColor: 'var(--brand-danger)',
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
  });
};