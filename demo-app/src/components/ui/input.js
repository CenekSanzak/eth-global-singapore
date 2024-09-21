const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="border rounded-md p-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800" // Added text and background colors
    />
  );
};

export { Input };