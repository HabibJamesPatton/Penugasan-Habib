// Menunggu sampai seluruh HTML selesai dimuat oleh browser
document.addEventListener('DOMContentLoaded', () => {

    // Mengambil semua elemen yang memiliki class 'reveal'
    const reveals = document.querySelectorAll('.reveal');

    // Membuat alat pendeteksi (Observer)
    const revealObserver = new IntersectionObserver((entries, observer) => {

        // Kita gunakan index untuk membuat efek staggering (muncul bergantian)
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {

                // Memberikan jeda waktu (delay) yang bertambah tiap elemen
                // Elemen ke-1 delay 0ms, ke-2 delay 150ms, ke-3 delay 300ms, dst.
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 150);

                // Hentikan pantauan setelah elemen muncul agar animasinya tidak berulang
                // saat di-scroll ke atas dan ke bawah (hemat performa browser)
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Animasi tertrigger sedikit sebelum elemen benar-benar masuk layar
        threshold: 0.1 // Berapa persen elemen harus terlihat sebelum animasi dimulai (10%)
    });

    // Memerintahkan observer untuk memantau setiap elemen 'reveal'
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // --- FITUR LIGHTBOX INFOGRAFIS ---
    const wadahInfografis = document.getElementById('wadah-infografis');
    const gambarInfografis = document.getElementById('gambar-infografis');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.getElementById('close-lightbox');

    if (wadahInfografis && lightbox) {
        // 1. Saat Infografis diklik -> Buka Lightbox
        wadahInfografis.addEventListener('click', () => {
            // Ambil sumber gambar (src) dari infografis yang diklik
            lightboxImg.src = gambarInfografis.src;

            // Hapus class 'hidden' dan tambahkan 'flex' agar muncul
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');

            // Sedikit jeda (10ms) agar efek transisi CSS berjalan mulus
            setTimeout(() => {
                lightbox.classList.remove('opacity-0');
                lightboxImg.classList.remove('scale-95');
                lightboxImg.classList.add('scale-100');
            }, 10);
        });

        // 2. Fungsi untuk menutup Lightbox
        const tutupLightbox = () => {
            // Mulai animasi menghilang
            lightbox.classList.add('opacity-0');
            lightboxImg.classList.remove('scale-100');
            lightboxImg.classList.add('scale-95');

            // Tunggu animasi selesai (300ms) baru benar-benar disembunyikan
            setTimeout(() => {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
            }, 300);
        };

        // 3. Menutup saat tombol X diklik
        closeLightboxBtn.addEventListener('click', tutupLightbox);

        // 4. Menutup saat area kosong (hitam) di luar gambar diklik
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                tutupLightbox();
            }
        });
    }
});