import { Link } from "react-router-dom";
import contactIcon from "../assets/contact.png";
import emailIcon from "../assets/email.png";
import mapsIcon from "../assets/maps.png";

export default function Contact() {
  return (
    <section className="py-20 px-6 bg-blue-700 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 justify-between items-start py-10">
        
        <div className="flex-1 text-white">
          <h1 className="text-3xl font-bold mb-6">MONGGO TICKET</h1>

          <p className="mb-8 text-lg leading-relaxed opacity-90 font-thin">
            Wadah eksploratif untuk menemukan berbagai tiket event konser musik di wilayah Yogyakarta.
            Berbagai tiket musik tersedia dan booking secara mudah.
          </p>

          <div className="space-y-6">
        
            <div className="flex items-start gap-4">
              <img src={mapsIcon} alt="Maps" className="w-6 h-6 object-contain mt-1" />
              <div>
                <p className="text-xs opacity-70 font-medium uppercase tracking-wider">Lokasi</p>
                <p className="text-lg font-thin">
                  Universitas Ahmad Dahlan Kampus 4, Jl. Ki Ageng Pemanahan, Kragilan, Tamanan, Kec. Banguntapan, 
                  Kabupaten Bantul, Daerah Istimewa Yogyakarta 55191
                </p>
              </div>
            </div>

            <a
              href="mailto:monggoticket.65@gmail.com?subject=Tanya%20Seputar%20Tiket"
              className="flex items-center gap-4 hover:bg-blue-600 p-2 rounded-lg transition-all border border-transparent hover:border-white/20 group"
            >
              <img src={emailIcon} alt="Email" className="w-6 h-6 object-contain" />
              <div>
                <p className="text-xs opacity-70 font-medium uppercase tracking-wider">Kirim Email</p>
                <p className="text-lg font-thin group-hover:underline">monggoticket.65@gmail.com</p>
              </div>
            </a>

            <a
              href="https://wa.me/6289517793305?text=Halo%20Monggo%20Ticket,%20saya%20ingin%20bertanya%20tentang..."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 hover:bg-blue-600 p-2 rounded-lg transition-all border border-transparent hover:border-white/20 group"
            >
              <img src={contactIcon} alt="WhatsApp" className="w-6 h-6 object-contain" />
              <div>
                <p className="text-xs opacity-70 font-medium uppercase tracking-wider">Chat WhatsApp</p>
                <p className="text-lg font-thin group-hover:underline">089517793305</p>
              </div>
            </a>
          </div>
        </div>

        <div className="flex-1 w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.571431445722!2d110.3805364741753!3d-7.835100077836376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5701a37fb301%3A0xcc97092892994f!2sUniversitas%20Ahmad%20Dahlan%20-%20Kampus%204!5e0!3m2!1sid!2sid!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps UAD Kampus 4"
          ></iframe>
        </div>

        <div className="text-white min-w-[150px]">
          <h2 className="text-2xl font-semibold mb-6">Quick Link</h2>
          <div className="flex flex-col space-y-4 text-lg font-thin">
            <Link to="/" className="hover:text-blue-200 transition-colors">Home</Link>
            <Link to="/event" className="hover:text-blue-200 transition-colors">Event</Link>
            <Link to="/contact" className="hover:text-blue-200 transition-colors font-bold border-b border-white w-fit">
              Contact
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}