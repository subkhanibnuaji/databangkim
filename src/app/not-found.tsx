import { Building2, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="w-20 h-20 rounded-2xl bg-primary-500 flex items-center justify-center mx-auto mb-6">
          <Building2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-6xl font-bold text-primary-500 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-muted mb-6 max-w-sm mx-auto">
          Halaman yang Anda cari tidak tersedia. Mungkin telah dipindahkan atau dihapus.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
        >
          <Home className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
