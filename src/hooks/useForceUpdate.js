import { useCallback, useState } from 'react';

// refer to https://github.com/CharlesStover/use-force-update

export default function useForceUpdate() {
  const [ , dispatch ] = useState(Object.create(null));

  const memoizedDispatch = useCallback( () => {
      dispatch(Object.create(null));
    },
    [ dispatch ],
  );
  return memoizedDispatch;
}