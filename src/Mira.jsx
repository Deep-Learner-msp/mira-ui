import React from 'react';
import { Button } from 'antd'; // Assuming you're using Ant Design for buttons
import { ArrowLeftIcon } from 'lucide-react'; // Example icon, replace with your icon or use any other
import { useNavigate } from 'react-router-dom';

const Mira = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); // Navigate to the previous page in the history stack
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      <iframe
        src="https://mira-aqddfyeca6asehgh.australiacentral-01.azurewebsites.net/" // Replace with the URL you want to display
        title="Embedded Content"
        className="w-full h-full border-0"
        allowFullScreen
      >
        {/* Fallback content */}
        <p>Your browser does not support iframes.</p>
      </iframe>
      <Button
        onClick={handleBack}
        className="absolute top-4 left-3 z-10"
        type="primary"
        icon={<ArrowLeftIcon className="w-5 h-5" />}
        shape="circle"
      >
        <span className="sr-only">Back</span>
      </Button>
    </div>
  );
};

export default Mira;
