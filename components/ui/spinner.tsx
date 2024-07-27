import React from 'react';

const Spinner = () => (
    <>
        <div className="spinner"></div>
        <style jsx>{`
            .spinner {
                border: 4px solid rgba(255, 255, 255, 0.2);
                border-left-color: #ffffff;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `}</style>
    </>
);

export default Spinner;