const Button = ({ children, ...props }) => {
  return (
    <button {...props} className="rounded-md focus:outline-none">
      {children}
    </button>
  );
};

export { Button };
