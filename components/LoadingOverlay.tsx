'use client';

import React from 'react';
import { CircleNotch } from '@phosphor-icons/react';

interface LoadingOverlayProps {
  isVisible: boolean;
  title?: string;
  statusText?: string;
}

const LoadingOverlay = ({ 
  isVisible, 
  title = "Synthesizing Audio...", 
  statusText = "Processing PDF" 
}: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper">
        <div className="loading-shadow">
          <CircleNotch className="loading-animation w-12 h-12 text-[#663820]" weight="bold" />
          <h3 className="loading-title">{title}</h3>
          
          <div className="loading-progress">
            <div className="loading-progress-item">
              <span className="loading-progress-status"></span>
              <span className="text-[#3d485e]">{statusText}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
