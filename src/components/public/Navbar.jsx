export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-blue-500 px-10 py-5 shadow-lg shadow-gray-400 w-full text-white sticky top-0 left-0 z-50 font-sans">
      <h1 className="font-bold text-xl tracking-wide">
        EVENT TICKET
      </h1>

      <div className="space-x-8">
        <a 
          href="#Home" 
          className="hover:text-blue-200 transition-colors cursor-pointer font-medium"
        >
          Home
        </a>
        <a 
          href="#Event" 
          className="hover:text-blue-200 transition-colors cursor-pointer font-medium"
        >
          Event
        </a>
      </div>
    </nav>
  );
}