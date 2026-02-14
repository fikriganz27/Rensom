// ==================== BLOCKER SUPER KEJAM ====================
// Ini yang bikin gabisa apa-apa selain di web ini!

// 1. BLOCK SEMUA TOMBOL KEYBOARD
document.addEventListener('keydown', function(e) {
    // Block ALT+TAB, ALT+F4, Windows Key, Ctrl+Esc, dll
    if (e.altKey || e.ctrlKey || e.metaKey || e.key === 'Escape' || e.key === 'F4' || e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    
    // Block F1 - F12
    if (e.keyCode >= 112 && e.keyCode <= 123) {
        e.preventDefault();
        return false;
    }
    
    // Block Windows Key (kiri/kanan)
    if (e.keyCode === 91 || e.keyCode === 92) {
        e.preventDefault();
        return false;
    }
    
    // Block Alt + F4 kombinasi
    if (e.altKey && e.keyCode === 115) {
        e.preventDefault();
        return false;
    }
    
    // Block Ctrl+Shift+Esc (Task Manager)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 27) {
        e.preventDefault();
        return false;
    }
    
    // Block Ctrl+W (close tab)
    if (e.ctrlKey && e.keyCode === 87) {
        e.preventDefault();
        return false;
    }
    
    // Block Ctrl+R (refresh)
    if (e.ctrlKey && e.keyCode === 82) {
        e.preventDefault();
        return false;
    }
    
    // Block F5 (refresh)
    if (e.keyCode === 116) {
        e.preventDefault();
        return false;
    }
    
    // Block Ctrl+N (new window)
    if (e.ctrlKey && e.keyCode === 78) {
        e.preventDefault();
        return false;
    }
    
    // Block Ctrl+T (new tab)
    if (e.ctrlKey && e.keyCode === 84) {
        e.preventDefault();
        return false;
    }
    
    // Block Ctrl+Shift+T (reopen closed tab)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 84) {
        e.preventDefault();
        return false;
    }
    
    // Block Print Screen
    if (e.keyCode === 44) {
        e.preventDefault();
        return false;
    }
});

// 2. BLOCK SEMUA KLIK KANAN (Context Menu)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// 3. BLOCK SELECTION
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

// 4. BLOCK DRAG
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

// 5. BLOCK SEMUA KLIK DI LUAR ELEMENT UTAMA
document.addEventListener('click', function(e) {
    // Cek apakah yang diklik adalah bagian dari lock screen
    if (!e.target.closest('.lock-screen')) {
        e.preventDefault();
        e.stopPropagation();
        
        // Kasih efek geter
        document.querySelector('.lock-screen').style.animation = 'shake 0.1s ease-in-out 3';
        setTimeout(() => {
            document.querySelector('.lock-screen').style.animation = 'pulse 2s infinite';
        }, 300);
        
        return false;
    }
});

// 6. EFEK GETER KALO KLIK SALAH
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// 7. BLOCK SEMUA SHORTCUT BROWSER
window.addEventListener('keyup', function(e) {
    if (e.altKey || e.ctrlKey || e.metaKey) {
        e.preventDefault();
        return false;
    }
});

// 8. BLOCK CLOSE TAB (Peringatan terus)
window.onbeforeunload = function() {
    return "⚠️ MAU KEMANA?! GA BISA KELUAR SEBELUM UNLOCK! ⚠️";
};

// 9. BLOCK HISTORY BACK
history.pushState(null, null, location.href);
window.onpopstate = function() {
    history.go(1);
};

// 10. AUTO FULLSCREEN TERUS
function requestFullScreen() {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
    }
}

// Request fullscreen terus-terusan
setInterval(requestFullScreen, 1000);

// 11. DETEKSI KELUAR DARI FULLSCREEN
document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        requestFullScreen();
    }
});

// 12. BLOCK CTRL+ALT+DEL (Sebisa mungkin)
// Catatan: Gabisa full block, tapi kita kasih warning
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.altKey && e.keyCode === 46) { // Del
        alert('⚠️ Task Manager gabisa dibuka! Balik ke web! ⚠️');
        requestFullScreen();
        window.focus();
    }
});

// 13. FOCUS TERUS KE WINDOW
window.addEventListener('blur', function() {
    setTimeout(function() {
        window.focus();
        requestFullScreen();
    }, 10);
});

// 14. BLOCK SEMUA INPUT SELAIN ANGKA
document.getElementById('unlock_code').addEventListener('keydown', function(e) {
    // Izinin angka 0-9, backspace, delete, arrow
    if (!((e.keyCode >= 48 && e.keyCode <= 57) || // angka atas
          (e.keyCode >= 96 && e.keyCode <= 105) || // numpad
          e.keyCode === 8 || // backspace
          e.keyCode === 46 || // delete
          e.keyCode === 37 || // left arrow
          e.keyCode === 39)) { // right arrow
        e.preventDefault();
        return false;
    }
});

// 15. VARIABLE BUAT TRACK PERCOBAAN
let attempts = 3;
const correctCode = localStorage.getItem('unlock_code') || '123456'; // GANTI 123456 DENGAN KODE LU

// 16. FUNGSI CEK KODE
function checkCode() {
    const inputCode = document.getElementById('unlock_code').value;
    
    if (inputCode === correctCode) {
        // UNLOCK BERHASIL!
        document.body.innerHTML = `
            <div style="background: linear-gradient(135deg, #00ff00, #006600); height: 100vh; display: flex; justify-content: center; align-items: center; flex-direction: column; color: white; font-family: Arial;">
                <div style="font-size: 100px;">🎉🔓🎉</div>
                <h1 style="font-size: 48px; margin: 20px;">UNLOCK SUCCESS!</h1>
                <p style="font-size: 24px;">Selamat! Lo berhasil keluar dari lock screen!</p>
                <p style="font-size: 18px; margin-top: 30px;">Tapi inget, ini cuma prank ya! 😂</p>
                <button onclick="window.close()" style="padding: 15px 30px; font-size: 18px; margin-top: 20px; cursor: pointer;">Close Tab</button>
            </div>
        `;
        
        // Matiin semua blocker
        window.onbeforeunload = null;
    } else {
        // SALAH KODE
        attempts--;
        
        if (attempts <= 0) {
            // Kalo kehabisan percobaan, bikin makin parah!
            document.body.innerHTML = `
                <div style="background: black; height: 100vh; display: flex; justify-content: center; align-items: center; flex-direction: column; color: red; font-family: Arial;">
                    <div style="font-size: 150px; animation: spin 2s infinite linear;">💀</div>
                    <h1 style="font-size: 48px; animation: blink 1s infinite;">TOO MANY ATTEMPTS!</h1>
                    <p style="font-size: 24px; color: #ff6666;">Sekarang lo harus restart laptop buat cobain lagi!</p>
                    <p style="font-size: 18px; margin-top: 50px;">(Tapi pas restart, bakal balik lagi ke sini! 😈)</p>
                </div>
                <style>
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                    @keyframes blink { 50% { opacity: 0; } }
                </style>
            `;
            
            // Set cookie biar pas restart balik lagi
            document.cookie = "locked=true; max-age=3600";
        } else {
            alert(`❌ SALAH! Kesempatan tersisa: ${attempts}x`);
            document.getElementById('counter').innerHTML = `Kesempatan percobaan: ${attempts}x`;
            
            // Efek geter
            document.querySelector('.lock-screen').style.animation = 'shake 0.1s ease-in-out 3';
            setTimeout(() => {
                document.querySelector('.lock-screen').style.animation = 'pulse 2s infinite';
            }, 300);
        }
    }
    
    document.getElementById('unlock_code').value = '';
}

// 17. AUTO FOCUS KE INPUT
document.getElementById('unlock_code').focus();

// 18. TAMPILIN KODE DI CONSOLE (buat yang masang)
console.log('%c🔐 UNLOCK CODE: ' + correctCode, 'font-size: 20px; background: black; color: green; padding: 10px;');
console.log('%cJANGAN KASIH TAU SIAPAPUN!', 'font-size: 16px; color: red;');

// 19. BLOCK SEMUA INTERAKSI LAIN
setInterval(function() {
    // Force focus ke window
    window.focus();
    
    // Force fullscreen
    if (!document.fullscreenElement) {
        requestFullScreen();
    }
    
    // Block selection
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
}, 100);