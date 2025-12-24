export default function Navbar(){
    return(
        <nav className="flex justify-between bg-blue-500 px-10 py-5 shadow-lg shadow-gray-400
        w-full text-white top-0 left-0 z-50 font-sans mb-10">
            <h1 className="font-bold text-xl"> EVENT TICKET</h1>
            <div className="space-x-6">
                <a href="#Home" className="hover:text-blue-400 cursor-pointer">Home</a>
                <a href="#Event" className="hover:text-blue-400 cursor-pointer">Event</a>
            </div>

        </nav>
    );
}