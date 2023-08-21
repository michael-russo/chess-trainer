'use client';
import { useEffect, useState } from 'react';

import HomeClient from './page.client';

export default function Home() {
  const [isWindow, setIsWindow] = useState(false);
  useEffect(() => {
    if (window) {
      setIsWindow(true);
    }
  }, []);

  return <>{isWindow && <HomeClient />}</>;
}
