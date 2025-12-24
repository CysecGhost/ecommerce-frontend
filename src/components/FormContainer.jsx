import React from "react";

const FormContainer = ({ title, children }) => {
  return (
    <div className="container w-full max-w-md h-full flex flex-col justify-center items-start mx-auto p-6 space-y-6 space-x-0 shadow-md rounded-md bg-gray-800">
      {title && (
        <h2 className="text-3xl font-[Montserrat] font-bold md:text-4xl mb-12">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default FormContainer;
