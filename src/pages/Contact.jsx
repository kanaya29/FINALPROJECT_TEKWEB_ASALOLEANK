export default function Contact() {
    return (
        <section className="py-20 px-2 pb-2 bg-blue-700 min-h-screen">
            <div className="flex flex-col max-w-2xl mx-auto gap-2 py-20 md:flex-row md:gap-9 justify-between md:mb-2">

                <div className="flex-1 text-white font-thin ">
                    <div className="flex items-center gap-2 mb-2">
                    
                        <div className="leading-tight ">
                            <h1 className="text-2xl font-semibold">Event Ticket</h1>
                        </div>
                    </div>

                    <p className="mb-2 text-l leading-tight w-4/5">
                        Wadah eksploratif untuk menemukan berbagai tiket event konser musik di wilayah Yogyakarta. 
                        Berbagai tiket musik tersedia dan booking secara mudah.
                    </p>

                    <div className="flex  mb-2 w-3/5">
                     
                        <p className="text-l leading-tight">
                            Jl. Ringroad Selatan, Kragilan, Tamanan, Kec. Banguntapan,
                            Bantul, Daerah Istimewa Yogyakarta 55191
                        </p>
                    </div>

                    <div className="flex gap-2 mb-2">
                       
                        <p className="text-l leading-tight">event_ticket@gmail.com</p>
                    </div>

                    <div className="flex gap-2 mb-2">
                       
                        <p className="text-l leading-tight">089517793305</p>
                    </div>
                </div>

                <div className="text-white py-3 md:py-5">
                    <h2 className="text-xl font-semibold mb-2">Quick Link</h2>
                    <div className="space-y-1 text-l">
                        <p>Home</p>
                        <p>Event</p>
                        <p>Contact</p>
                    </div>
                </div>
            </div>

         
        </section>
    )
}
