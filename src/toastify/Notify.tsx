import React from 'react'
import { toast } from 'react-toastify';

interface Props {
    text: string;
    type: 'error' | 'success';
}

interface toastConfig {
    position: 'top-center';
    theme: 'dark' | 'light'
}

export const Notify = (text :string , type : 'error' | 'success') => {
    
    const config : toastConfig= {
        position: 'top-center',
        theme: 'dark'
    }

    switch (type) {
        case 'error':
            toast.error(text, config)
            break;
        case 'success':
            toast.success(text, config)
            break;
    
        default:
            break;
    }
  
}
