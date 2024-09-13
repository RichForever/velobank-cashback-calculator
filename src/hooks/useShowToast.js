import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

const useToastNotification = () => {
  const toast = useToast();

  // Function to show toast notifications
  const showToast = useCallback(
    (id, message, type = 'success', duration = 3000) => {
      if (!toast.isActive(id)) {
        toast({
          id,
          description: message,
          status: type,
          duration,
          isClosable: false,
          variant: 'subtle',
          position: 'bottom-right',
        });
      }
    },
    [toast],
  );

  return { showToast };
};

export default useToastNotification;
