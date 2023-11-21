import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
export const useTransitionNavigate = () => {
  const navigate = useNavigate();

  const transitionNavigate = useCallback(
    async (
      newRoute: string,
      transitionClass:
        | 'slide-to-left'
        | 'slide-to-right'
        | 'fade' = 'slide-to-left',
    ) => {
      if (!document.startViewTransition) {
        return navigate(newRoute);
      }

      document.documentElement.classList.add(transitionClass);

      // API はページの現在の状態をキャプチャ
      const transition = document.startViewTransition(() => {
        // コールバックが呼び出され、ページの新しい状態をキャプチャする
        navigate(newRoute);
      });

      try {
        await transition.finished;
      } finally {
        document.documentElement.classList.remove(transitionClass);
      }

      return;
    },
    [navigate],
  );

  return {
    transitionNavigate,
  };
};
