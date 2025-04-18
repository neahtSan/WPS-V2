type DotButtonProps = {
    selected: boolean;
    onClick: () => void;
  };
  
  export const DotButton: React.FC<DotButtonProps> = ({ selected, onClick }) => (
    <button
      className={`w-3 h-3 rounded-full ${
        selected ? "bg-black" : "bg-gray-400"
      } transition-colors duration-300`}
      onClick={onClick}
      aria-label="carousel dot"
    />
  );
  