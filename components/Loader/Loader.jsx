'use client';

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <DotLottieReact
        src="https://lottie.host/ac6682c0-9727-425a-b2f4-654ea806679c/IwnsL2QACO.lottie"
        loop
        autoplay
        onError={() => {}}
      />
    </div>
  );
};

export default Loader;