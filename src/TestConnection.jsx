import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const TestConnection = () => {
  const [status, setStatus] = useState("Menunggu uji coba...");

  const handleTestLogin = () => {
    const email = "2438016047@webmail.uad.ac.id";
    const password = "mMEILANY1223_";

    setStatus("Sedang menghubungkan ke Firebase...");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setStatus(`Koneksi Berhasil! Terhubung sebagai: ${userCredential.user.email}`);
        console.log("Login Berhasil! Detail User:", userCredential.user);
      })
      .catch((error) => {
        setStatus(`Koneksi Gagal: ${error.message}`);
        console.error("Kode Error Firebase:", error.code);

        if (error.code === "auth/invalid-credential") {
          console.warn("TIP: Periksa apakah 'Email/Password' sudah di-enable di Firebase Console.");
        }
      });
  };

  return (
    <div className="p-5 border rounded-lg bg-white shadow-md my-4 mx-auto max-w-md">
      <h3 className="text-lg font-bold text-blue-600 mb-2">Firebase Connection Test</h3>
      <div className="p-3 bg-gray-50 rounded border mb-4">
        <p className="text-sm">
          Status: <span className="font-semibold text-red-600">{status}</span>
        </p>
      </div>
      <button
        onClick={handleTestLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
      >
        Klik untuk Test Login
      </button>
    </div>
  );
};

export default TestConnection;
