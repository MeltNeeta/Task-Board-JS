
    // =============================================================
    // 1. STATE & DATABASE LOKAL (Array of Objects)
    // =============================================================
    // Array penampung daftar tugas
    let tasks = [
    { id: 1, judul: "Kerjakan PR Matematika", status: "TODO" },
    { id: 2, judul: "Belajar JavaScript ES6", status: "DONE" }
    ];

    // AMBIL ELEMEN DOM
    const inputTask = document.querySelector("#inputTask");
    const btnTambah = document.querySelector("#btnTambah");
    const colTodo = document.querySelector("#colTodo");
    const colDone = document.querySelector("#colDone");

    // =============================================================
    // 2. FUNGSI RENDER TAMPILAN (Array Methods: filter & forEach)
    // =============================================================
    function renderTasks() {
    // Bersihkan isi kolom sebelum digambar ulang
    colTodo.innerHTML = "";
    colDone.innerHTML = "";

    // BACA: Gunakan .filter() untuk memisahkan tugas berdasarkan statusnya
    const listTodo = tasks.filter((t) => t.status === "TODO");
    const listDone = tasks.filter((t) => t.status === "DONE");

    // RENDER KOLOM TODO (BELUM SELESAI)
    listTodo.forEach((item) => {
        // ES6 Destructuring
        const { id, judul } = item;

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <span>${judul}</span>
        <button class="btn-done" onclick="pindahStatus(${id})"> Selesai</button>
        `;
        colTodo.appendChild(card);
    });

    // RENDER KOLOM DONE (SELESAI)
    listDone.forEach((item) => {
        const { judul } = item;

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<span><s>${judul}</s></span>`;
        colDone.appendChild(card);
    });
    }

    // =============================================================
    // 3. TAMBAH TUGAS BARU (Try-Catch & Spread Operator)
    // =============================================================
    btnTambah.addEventListener("click", () => {
    try {
        const teksInput = inputTask.value.trim();

        // Validasi input tidak boleh kosong menggunakan Try-Catch
        if (teksInput === "") {
        throw new Error("Judul tugas tidak boleh kosong!");
        }

        // Buat objek tugas baru
        const newTask = {
        id: Date.now(), // ID unik menggunakan timestamp
        judul: teksInput,
        status: "TODO"
        };

        // Gunakan Spread Operator (...) untuk menambah tugas ke array
        tasks = [...tasks, newTask];

        // Reset input teks & render ulang
        inputTask.value = "";
        renderTasks();

    } catch (error) {
        alert(`Warning: ${error.message}`);
    }
    });

    // =============================================================
    // 4. MENGUBAH STATUS TUGAS (Array Method: find)
    // =============================================================
    function pindahStatus(idTask) {
    // BACA: Gunakan .find() untuk mencari tugas yang diklik
    const taskDipilih = tasks.find((t) => t.id === idTask);

    if (taskDipilih) {
        // Ubah status tugas menjadi DONE
        taskDipilih.status = "DONE";
        // Render ulang tampilan
        renderTasks();
    }
    }

    // Jalankan fungsi render saat web pertama kali dimuat
    renderTasks();