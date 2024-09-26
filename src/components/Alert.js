import {
    BellAlertIcon,
    CheckCircleIcon,
    XCircleIcon,
  } from '@heroicons/react/20/solid';
  import React from 'react';
  
  export default function Alert({
    variant,
    className,
    padding = 'p-4',
    children,
  }) {
    return variant === 'success' ? (
      <div className={`rounded-md bg-green-50 ${padding}`}>
        <div className={`flex ${className ?? ''}`}>
          <div className="flex-shrink-0">
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <div className="font-medium text-green-800 ">{children}</div>
          </div>
        </div>
      </div>
    ) : variant === 'warn' ? (
      <div className={`rounded-md bg-yellow-50 ${padding}`}>
        <div className={`flex ${className ?? ''}`}>
          <div className="flex-shrink-0">
            <BellAlertIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <div className="font-medium text-yellow-800">{children}</div>
          </div>
        </div>
      </div>
    ) : (
      <div className={`rounded-md bg-red-50 ${padding}`}>
        <div className={`flex ${className ?? ''}`}>
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <div className="font-medium text-red-800">{children}</div>
          </div>
        </div>
      </div>
    );
  }
  