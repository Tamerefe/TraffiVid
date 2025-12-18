// ===== DATA STRUCTURE =====

// ===== SECURITY & CONFIGURATION =====
// URL'ler encode edilmiştir - kaynak kodda doğrudan görünmez
// Decode: atob(encodedString)
const CONFIG = {
    // Base64 encoded Google Sheets URL (casual kullanıcılar göremez)
    // Decode: atob('aHR0cHM6Ly9zY3J...')
    // Updated: 2025-12-18 23:28 - New deployment v2.0
    _enc: 'aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J3aU1CTlhlQVh2cGNxYTdjbERKN1NrVzh4aEwzRERlY2pLc1ZRRmdMeVBqcWZaNFNERWVCUjNTclgwd2FEYm5rMC9leGVj',
    ENABLE_DATA_SHARING: true,
    MAX_REQUESTS_PER_MINUTE: 10,
    ENCRYPTION_ENABLED: true,

    // URL getter - otomatik decode
    get GOOGLE_SHEETS_URL() {
        try {
            return this._enc ? atob(this._enc) : '';
        } catch (e) {
            console.error('Config decode error');
            return '';
        }
    },

    // URL setter - otomatik encode
    set GOOGLE_SHEETS_URL(url) {
        try {
            this._enc = url ? btoa(url) : '';
        } catch (e) {
            console.error('Config encode error');
            this._enc = '';
        }
    }
};

// ===== SECURITY UTILITIES =====
class SecurityHelper {
    // Basit XOR tabanlı şifreleme (Base64 ile birlikte)
    static encrypt(text) {
        if (!CONFIG.ENCRYPTION_ENABLED) return text;
        try {
            const key = this.getEncryptionKey();
            let encrypted = '';
            for (let i = 0; i < text.length; i++) {
                encrypted += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }
            // Unicode karakterleri için güvenli Base64 encoding
            return btoa(encodeURIComponent(encrypted).replace(/%([0-9A-F]{2})/g,
                (match, p1) => String.fromCharCode('0x' + p1)));
        } catch (e) {
            console.error('Encryption failed:', e);
            return text;
        }
    }

    static decrypt(encryptedText) {
        if (!CONFIG.ENCRYPTION_ENABLED) return encryptedText;
        if (!encryptedText) return encryptedText;

        try {
            // Base64 kontrolü - şifreli mi yoksa düz metin mi?
            if (!/^[A-Za-z0-9+/=]+$/.test(encryptedText)) {
                // Düz metin - muhtemelen eski veri
                console.warn('Unencrypted data detected, returning as-is');
                return encryptedText;
            }
            
            // Unicode-safe Base64 decoding
            const key = this.getEncryptionKey();
            const decoded = atob(encryptedText);
            const decrypted = decodeURIComponent(Array.prototype.map.call(decoded, 
                c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
            let original = '';
            for (let i = 0; i < decrypted.length; i++) {
                original += String.fromCharCode(decrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }
            return original;
        } catch (e) {
            console.error('Decryption failed, might be old unencrypted data:', e);
            // Şifrelenmemiş eski veri olabilir, olduğu gibi döndür
            return encryptedText;
        }
    }

    static getEncryptionKey() {
        // Basit anahtar üretimi (gerçek uygulamada daha güçlü olmalı)
        let key = localStorage.getItem('_tk');
        if (!key) {
            key = this.generateRandomKey();
            localStorage.setItem('_tk', key);
        }
        return key;
    }

    static generateRandomKey() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let key = '';
        for (let i = 0; i < 32; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    }

    // XSS koruması - HTML sanitization
    static sanitizeHTML(dirty) {
        if (typeof DOMPurify !== 'undefined') {
            return DOMPurify.sanitize(dirty);
        }
        // Fallback: Basit sanitization
        const div = document.createElement('div');
        div.textContent = dirty;
        return div.innerHTML;
    }

    // Input validation
    static validateUserId(userId) {
        return /^user_[0-9]+_[a-z0-9]+$/.test(userId);
    }

    static validateSessionId(sessionId) {
        return /^session_[0-9]+_[a-z0-9]+$/.test(sessionId);
    }

    // Rate limiting kontrolü
    static checkRateLimit(action) {
        const now = Date.now();
        const key = `_rl_${action}`;
        let requests = JSON.parse(localStorage.getItem(key) || '[]');

        // Son 1 dakikadaki istekleri filtrele
        requests = requests.filter(time => now - time < 60000);

        if (requests.length >= CONFIG.MAX_REQUESTS_PER_MINUTE) {
            console.warn('Rate limit exceeded for:', action);
            return false;
        }

        requests.push(now);
        localStorage.setItem(key, JSON.stringify(requests));
        return true;
    }
}
class DataSharingManager {
    constructor() {
        this.consentGiven = localStorage.getItem('traffiVidDataConsent') === 'true';
        this.lastSyncTime = localStorage.getItem('traffiVidLastSync');
        console.log('🔐 DataSharingManager başlatıldı');
        console.log('   Consent durumu:', this.consentGiven ? '✅ Verildi' : '❌ Verilmedi');
        console.log('   Son senkronizasyon:', this.lastSyncTime || 'Henüz yapılmadı');
    }

    hasConsent() {
        return this.consentGiven;
    }

    giveConsent() {
        this.consentGiven = true;
        localStorage.setItem('traffiVidDataConsent', 'true');
    }

    revokeConsent() {
        this.consentGiven = false;
        localStorage.removeItem('traffiVidDataConsent');
        localStorage.removeItem('traffiVidLastSync');
    }

    async sendDataToSheets(userData, statistics) {
        console.log('📤 sendDataToSheets çağrıldı');
        console.log('Consent:', this.consentGiven);
        console.log('URL:', CONFIG.GOOGLE_SHEETS_URL ? 'Var' : 'Yok');
        console.log('Enable:', CONFIG.ENABLE_DATA_SHARING);
        
        if (!this.consentGiven) {
            console.warn('❌ Data sharing consent not given');
            return { success: false, error: 'No consent' };
        }

        if (!CONFIG.GOOGLE_SHEETS_URL || CONFIG.GOOGLE_SHEETS_URL === '') {
            console.warn('❌ Google Sheets URL not configured');
            return { success: false, error: 'Not configured' };
        }

        if (!CONFIG.ENABLE_DATA_SHARING) {
            console.warn('❌ Data sharing is disabled in config');
            return { success: false, error: 'Disabled' };
        }

        // Rate limiting kontrolü
        if (!SecurityHelper.checkRateLimit('dataSharing')) {
            console.warn('❌ Rate limit exceeded');
            return { success: false, error: 'Rate limit exceeded' };
        }

        console.log('✅ Tüm kontroller geçildi, veri gönderiliyor...');
        try {
            // Format date for better readability in Google Sheets
            const now = new Date();
            const dateStr = now.toLocaleDateString('tr-TR');
            const timeStr = now.toLocaleTimeString('tr-TR');
            
            // Calculate category statistics for easier reading
            const categoryStats = userData.statistics.categoryStats || {};
            const categories = Object.keys(categoryStats);
            
            // Flatten category stats for individual columns
            const categoryData = {};
            categories.forEach(cat => {
                const stats = categoryStats[cat] || { correct: 0, wrong: 0, total: 0 };
                const accuracy = stats.total > 0 ? ((stats.correct / stats.total) * 100).toFixed(1) : '0';
                categoryData[`${cat}_dogru`] = stats.correct || 0;
                categoryData[`${cat}_yanlis`] = stats.wrong || 0;
                categoryData[`${cat}_toplam`] = stats.total || 0;
                categoryData[`${cat}_basari`] = `${accuracy}%`;
            });
            
            // Format recent mistakes as readable text
            const recentMistakesText = (userData.mistakes || [])
                .slice(-5) // Son 5 hata
                .map(m => `${m.scenarioId} (${m.category})`)
                .join(', ') || 'Yok';

            const payload = {
                // Tarih ve Zaman (Okunabilir format)
                tarih: dateStr,
                saat: timeStr,
                timestamp: now.toISOString(),
                
                // Kullanıcı Bilgileri
                kullaniciId: userData.userId,
                kayitTarihi: new Date(userData.createdAt).toLocaleDateString('tr-TR'),
                toplamOyunSuresi: Math.floor(userData.totalPlayTime / 60000), // dakika

                // Başarı İstatistikleri
                toplamPuan: userData.achievements.totalScore || 0,
                tamamlananSenaryo: userData.achievements.scenariosCompleted || 0,
                mukemmelSkor: userData.achievements.perfectScores || 0,
                seriGun: userData.achievements.streakDays || 0,

                // Genel İstatistikler
                toplamDeneme: userData.statistics.totalAttempts || 0,
                dogruSecim: userData.statistics.correctChoices || 0,
                yanlisSecim: userData.statistics.wrongChoices || 0,
                sureDoldu: userData.statistics.timeouts || 0,
                ortCevapSuresi: (userData.statistics.averageResponseTime || 0).toFixed(2),
                basariOrani: `${statistics.accuracyRate || 0}%`,

                // Kategori Başarı Oranları (Ayrı kolonlar)
                ...categoryData,

                // Son Hatalar
                sonHatalar: recentMistakesText,

                // Oturum Bilgileri
                toplamOturum: userData.sessions?.length || 0,
                sonOynamaTarihi: userData.achievements.lastPlayDate 
                    ? new Date(userData.achievements.lastPlayDate).toLocaleDateString('tr-TR')
                    : dateStr
            };

            console.log('📦 Payload hazırlandı:', {
                kullaniciId: payload.kullaniciId,
                toplamPuan: payload.toplamPuan,
                basariOrani: payload.basariOrani
            });
            console.log('🌐 URL:', CONFIG.GOOGLE_SHEETS_URL);

            const response = await fetch(CONFIG.GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            console.log('📡 Fetch tamamlandı (no-cors mode - response okunamaz)');
            
            // Note: no-cors mode doesn't allow reading response
            // We assume success if no error is thrown
            this.lastSyncTime = new Date().toISOString();
            localStorage.setItem('traffiVidLastSync', this.lastSyncTime);

            console.log('✅ Data sent to Google Sheets successfully');
            console.log('🕐 Last sync:', this.lastSyncTime);
            return { success: true };

        } catch (error) {
            // Network hatası - yerel dosya sistemi veya CORS sorunu olabilir
            if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
                console.warn('NetworkError: Cannot send data from local file system (file://). Use a web server or GitHub Pages.');
            } else {
                console.error('Error sending data to Google Sheets:', error);
            }
            return { success: false, error: error.message };
        }
    }

    getLastSyncTime() {
        if (!this.lastSyncTime) return null;
        return new Date(this.lastSyncTime);
    }
}

// Initialize data sharing manager
const dataSharingManager = new DataSharingManager();

// ===== USER TRACKING SYSTEM =====
class UserTracker {
    constructor() {
        this.userId = this.getOrCreateUserId();
        this.sessionId = this.generateSessionId();
        this.sessionStart = new Date();
        this.loadUserData();
    }

    getOrCreateUserId() {
        let userId = localStorage.getItem('traffiVidUserId');
        if (!userId || !SecurityHelper.validateUserId(userId)) {
            // Kısa format: u_ + son 6 hane timestamp + 4 karakter random = ~12 karakter
            const shortTimestamp = Date.now().toString().slice(-6);
            const shortRandom = Math.random().toString(36).substr(2, 4);
            userId = 'u_' + shortTimestamp + shortRandom;
            localStorage.setItem('traffiVidUserId', SecurityHelper.sanitizeHTML(userId));
        }
        return SecurityHelper.sanitizeHTML(userId);
    }

    generateSessionId() {
        // Kısa format: s_ + son 6 hane timestamp + 4 karakter random = ~12 karakter
        const shortTimestamp = Date.now().toString().slice(-6);
        const shortRandom = Math.random().toString(36).substr(2, 4);
        const sessionId = 's_' + shortTimestamp + shortRandom;
        return SecurityHelper.sanitizeHTML(sessionId);
    }

    loadUserData() {
        let savedData = localStorage.getItem('traffiVidUserData_' + this.userId);
        if (savedData) {
            try {
                // Şifrelenmiş veriyi çöz
                const decryptedData = SecurityHelper.decrypt(savedData);
                this.userData = JSON.parse(decryptedData);

                // Veri yapısı kontrolü - eksik alanlar varsa tamamla
                if (!this.userData.achievements) this.userData.achievements = this.createDefaultUserData().achievements;
                if (!this.userData.statistics) this.userData.statistics = this.createDefaultUserData().statistics;
            } catch (e) {
                console.error('Error loading user data, resetting:', e);
                // Bozuk veri varsa yeni oluştur ve eski veriyi sil
                localStorage.removeItem('traffiVidUserData_' + this.userId);
                this.userData = this.createDefaultUserData();
            }
        } else {
            this.userData = this.createDefaultUserData();
        }
    }

    createDefaultUserData() {
        return {
            userId: this.userId,
            createdAt: new Date().toISOString(),
            totalPlayTime: 0,
            sessions: [],
            mistakes: [],
            achievements: {
                totalScore: 0,
                scenariosCompleted: 0,
                perfectScores: 0,
                categoriesCompleted: {},
                streakDays: 0,
                lastPlayDate: null
            },
            statistics: {
                totalAttempts: 0,
                correctChoices: 0,
                wrongChoices: 0,
                timeouts: 0,
                averageResponseTime: 0,
                categoryStats: {}
            }
        };
    }

    saveUserData() {
        try {
            const jsonData = JSON.stringify(this.userData);
            const encryptedData = SecurityHelper.encrypt(jsonData);
            localStorage.setItem('traffiVidUserData_' + this.userId, encryptedData);
        } catch (e) {
            console.error('Error saving user data:', e);
        }
    }

    startSession() {
        this.currentSession = {
            sessionId: this.sessionId,
            startTime: new Date().toISOString(),
            endTime: null,
            scenariosPlayed: [],
            score: 0,
            mistakes: []
        };
    }

    endSession() {
        if (this.currentSession) {
            this.currentSession.endTime = new Date().toISOString();
            const duration = new Date(this.currentSession.endTime) - new Date(this.currentSession.startTime);
            this.userData.totalPlayTime += duration;
            this.userData.sessions.push(this.currentSession);

            // Keep only last 50 sessions to save space
            if (this.userData.sessions.length > 50) {
                this.userData.sessions = this.userData.sessions.slice(-50);
            }

            this.saveUserData();
        }
    }

    recordScenarioAttempt(scenarioId, correct, responseTime, timedOut = false) {
        const scenario = scenarios.find(s => s.id === scenarioId);

        // Update statistics
        this.userData.statistics.totalAttempts++;
        if (timedOut) {
            this.userData.statistics.timeouts++;
        } else if (correct) {
            this.userData.statistics.correctChoices++;
        } else {
            this.userData.statistics.wrongChoices++;
        }

        // Update average response time
        const totalTime = this.userData.statistics.averageResponseTime * (this.userData.statistics.totalAttempts - 1);
        this.userData.statistics.averageResponseTime = (totalTime + responseTime) / this.userData.statistics.totalAttempts;

        // Update category stats
        if (scenario) {
            if (!this.userData.statistics.categoryStats[scenario.category]) {
                this.userData.statistics.categoryStats[scenario.category] = {
                    attempts: 0,
                    correct: 0,
                    wrong: 0
                };
            }
            this.userData.statistics.categoryStats[scenario.category].attempts++;
            if (correct) {
                this.userData.statistics.categoryStats[scenario.category].correct++;
            } else {
                this.userData.statistics.categoryStats[scenario.category].wrong++;
            }
        }

        // Record mistake
        if (!correct || timedOut) {
            this.userData.mistakes.push({
                scenarioId: scenarioId,
                scenarioTitle: scenario ? scenario.title : 'Unknown',
                category: scenario ? scenario.category : 'Unknown',
                timestamp: new Date().toISOString(),
                responseTime: responseTime,
                timedOut: timedOut
            });

            // Keep only last 100 mistakes
            if (this.userData.mistakes.length > 100) {
                this.userData.mistakes = this.userData.mistakes.slice(-100);
            }
        }

        // Update session
        if (this.currentSession) {
            this.currentSession.scenariosPlayed.push({
                scenarioId: scenarioId,
                correct: correct,
                responseTime: responseTime,
                timedOut: timedOut,
                timestamp: new Date().toISOString()
            });
            if (correct) {
                this.currentSession.score += 100;
            }
            if (!correct || timedOut) {
                this.currentSession.mistakes.push({
                    scenarioId: scenarioId,
                    scenarioTitle: scenario ? scenario.title : 'Unknown'
                });
            }
        }

        this.saveUserData();
    }

    updateAchievements(totalScore, completedScenarios) {
        this.userData.achievements.totalScore = totalScore;
        this.userData.achievements.scenariosCompleted = Object.keys(completedScenarios).length;

        // Count perfect scores
        this.userData.achievements.perfectScores = Object.values(completedScenarios)
            .filter(s => s.score === 100).length;

        // Update category completion
        const categories = ['Yaya Güvenliği', 'Kavşak ve Dönüşler', 'Hız ve Fren Mesafesi',
            'Kurallar ve Dikkat Dağınıklığı', 'Gece Sürüşü'];

        categories.forEach(category => {
            const categoryScenarios = scenarios.filter(s => s.category === category);
            const completedInCategory = categoryScenarios.filter(s =>
                completedScenarios[s.id] && completedScenarios[s.id].score === 100
            ).length;

            this.userData.achievements.categoriesCompleted[category] = {
                total: categoryScenarios.length,
                completed: completedInCategory,
                percentage: (completedInCategory / categoryScenarios.length * 100).toFixed(1)
            };
        });

        // Update streak
        const today = new Date().toDateString();
        if (this.userData.achievements.lastPlayDate !== today) {
            const lastDate = new Date(this.userData.achievements.lastPlayDate);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastDate.toDateString() === yesterday.toDateString()) {
                this.userData.achievements.streakDays++;
            } else {
                this.userData.achievements.streakDays = 1;
            }
            this.userData.achievements.lastPlayDate = today;
        }

        this.saveUserData();
    }

    getUserStats() {
        return {
            userId: this.userId,
            userData: this.userData,
            currentSession: this.currentSession
        };
    }

    exportUserData() {
        return JSON.stringify(this.userData, null, 2);
    }

    getRecentMistakes(limit = 10) {
        return this.userData.mistakes.slice(-limit).reverse();
    }

    getAccuracyRate() {
        const total = this.userData.statistics.correctChoices + this.userData.statistics.wrongChoices;
        if (total === 0) return 0;
        return (this.userData.statistics.correctChoices / total * 100).toFixed(1);
    }
}

// Initialize user tracker
const userTracker = new UserTracker();

// ===== TRANSLATIONS =====
const translations = {
    tr: {
        // Navigation
        nav_home: 'Ana Sayfa',
        nav_categories: 'Kategoriler',
        nav_scores: 'Skorlar',
        guest: 'Misafir',

        // Hero Section
        hero_title: 'Trafik Güvenliği Senaryo Oyunu',
        hero_description: '5 saniyelik kaza videolarını izle, 15 saniye içinde karar ver, doğru tercihle yeni senaryoları kilitten çıkar.',
        hero_start_btn: 'Hemen Başla',

        // Buttons
        go_to_scenario: 'Senaryoya Git',
        view_all: 'Tümünü Gör →',
        enter_scenario: 'Senaryoya Gir',
        retry: 'Tekrar Dene',
        next_scenario: 'Sonraki Senaryo',

        // Scores
        my_scores: 'Skorlarım',
        total_score: 'Toplam Puan',
        completed_scenarios: 'Tamamlanan Senaryolar',
        best_score: 'En İyi',
        points: 'puan',

        // Status
        locked: 'Kilitli',
        not_started: 'Başlamadı',
        completed: 'Tamamlandı',

        // Difficulty
        kolay: 'Kolay',
        orta: 'Orta',
        zor: 'Zor',

        // Categories
        'Yaya Güvenliği': 'Yaya Güvenliği',
        'Kavşak ve Dönüşler': 'Kavşak ve Dönüşler',
        'Hız ve Fren Mesafesi': 'Hız ve Fren Mesafesi',
        'Kurallar ve Dikkat Dağınıklığı': 'Kurallar ve Dikkat Dağınıklığı',
        'Gece Sürüşü': 'Gece Sürüşü',

        // Outcomes
        correct_choice: 'Doğru Tercih!',
        risky_choice: 'Riskli Tercih!',
        time_up: 'Süre Doldu!',
        time_up_msg: 'Karar vermek için zamanınız doldu.',

        // Loading
        loading_video: 'Video yükleniyor...'
    },
    en: {
        // Navigation
        nav_home: 'Home',
        nav_categories: 'Categories',
        nav_scores: 'Scores',
        guest: 'Guest',

        // Hero Section
        hero_title: 'Traffic Safety Scenario Game',
        hero_description: 'Watch 5-second accident videos, make a decision within 15 seconds, unlock new scenarios with correct choices.',
        hero_start_btn: 'Start Now',

        // Buttons
        go_to_scenario: 'Go to Scenario',
        view_all: 'View All →',
        enter_scenario: 'Enter Scenario',
        retry: 'Retry',
        next_scenario: 'Next Scenario',

        // Scores
        my_scores: 'My Scores',
        total_score: 'Total Score',
        completed_scenarios: 'Completed Scenarios',
        best_score: 'Best',
        points: 'points',

        // Status
        locked: 'Locked',
        not_started: 'Not Started',
        completed: 'Completed',

        // Difficulty
        kolay: 'Easy',
        orta: 'Medium',
        zor: 'Hard',

        // Categories
        'Yaya Güvenliği': 'Pedestrian Safety',
        'Kavşak ve Dönüşler': 'Intersections & Turns',
        'Hız ve Fren Mesafesi': 'Speed & Braking Distance',
        'Kurallar ve Dikkat Dağınıklığı': 'Rules & Distracted Driving',
        'Gece Sürüşü': 'Night Driving',

        // Outcomes
        correct_choice: 'Correct Choice!',
        risky_choice: 'Risky Choice!',
        time_up: 'Time\'s Up!',
        time_up_msg: 'Your time to make a decision has expired.',

        // Loading
        loading_video: 'Loading video...'
    }
};

// Scenario translations
const scenarioTranslations = {
    'scenario-1': {
        tr: {
            title: 'Zebra Çizgisinde Ani Karar',
            question: 'Yaya geçidine yaklaşırken bir yaya aniden yola adım attı. Sürücü olarak en güvenli seçenek hangisidir?',
            options: [
                { text: 'A) Ani fren yapıp yaya geçidinin önünde durmak', explanation: 'Doğru tercih! Trafik kurallarına göre sürücüler, yaya geçidinde veya yakınında bulunan yayalara yol vermek zorundadır. Ani fren yapmak, yayaya çarpmanın önüne geçer.' },
                { text: 'B) Önce dur, yaya gelince hızlan', explanation: 'Riskli tercih! Bu davranış hem trafik kurallarına aykırıdır hem de yayaya çarpma riski taşır. Yaya geçidinde yayanın geçiş hakkı vardır ve sürücü durmalıdır.' }
            ]
        },
        en: {
            title: 'Sudden Decision at Crosswalk',
            question: 'A pedestrian suddenly stepped onto the road while you were approaching a crosswalk. What is the safest option as a driver?',
            options: [
                { text: 'A) Make an emergency stop before the crosswalk', explanation: 'Correct choice! According to traffic rules, drivers must yield to pedestrians at or near crosswalks. Emergency braking prevents hitting the pedestrian.' },
                { text: 'B) Stop first, then accelerate when pedestrian approaches', explanation: 'Risky choice! This behavior violates traffic rules and risks hitting the pedestrian. Pedestrians have the right of way at crosswalks and drivers must stop.' }
            ]
        }
    },
    'scenario-2': {
        tr: {
            title: 'Okul Geçidi Uyarısı',
            question: 'Okul yaya geçidinde dönüş sırasında yayaya yol vermenize rağmen yaya duruyor. Ne yapmalısınız?',
            options: [
                { text: 'A) Beklemek ve yayaya işaret vererek geçmesini sağlamak', explanation: 'Doğru tercih! Yaya geçidinde yayaya yol vermek zorunludur. Yaya duraksa bile sabırla beklemek ve geçmesi için nazikçe işaret vermek en güvenli yaklaşımdır.' },
                { text: 'B) Korna basıp yaya şeritte olmasına rağmen geçmeye çalışmak', explanation: 'Riskli tercih! Yaya geçidinde yayanın geçiş hakkı her zaman önceliktir. Aceleci davranmak kazaya yol açabilir ve trafik kurallarına aykırıdır.' }
            ]
        },
        en: {
            title: 'School Crossing Warning',
            question: 'While turning at a school crosswalk, you yielded to a pedestrian but they are standing still. What should you do?',
            options: [
                { text: 'A) Wait patiently and signal the pedestrian to cross', explanation: 'Correct choice! Yielding to pedestrians at crosswalks is mandatory. Even if they hesitate, wait patiently and politely signal them to cross safely.' },
                { text: 'B) Honk and try to pass despite the pedestrian being on the crossing', explanation: 'Risky choice! Pedestrians always have right of way at crosswalks. Acting hastily can cause accidents and violates traffic rules.' }
            ]
        }
    },
    'scenario-3': {
        tr: {
            title: 'Park Halindeki Araçlar Arasından Çıkan Yaya',
            question: 'Dar bir sokakta park halindeki araçlar arasından aniden bir yaya çıktı. En doğru hareket nedir?',
            options: [
                { text: 'A) Frene basarak durmaya çalışmak', explanation: 'Doğru tercih! Park halindeki araçların olduğu bölgelerde her zaman yaya çıkabileceği ihtimaline karşı hazırlıklı olmalı ve hızınızı ona göre ayarlamalısınız.' },
                { text: 'B) Direksiyon kırarak kaçınmaya çalışmak', explanation: 'Riskli tercih! Ani direksiyon hareketleri karşı şeride geçmenize veya park halindeki araçlara çarpmanıza neden olabilir.' }
            ]
        },
        en: {
            title: 'Pedestrian Emerging from Parked Cars',
            question: 'A pedestrian suddenly emerged from between parked cars on a narrow street. What is the correct action?',
            options: [
                { text: 'A) Apply brakes and try to stop', explanation: 'Correct choice! In areas with parked cars, always be prepared for pedestrians and adjust your speed accordingly.' },
                { text: 'B) Swerve to avoid them', explanation: 'Risky choice! Sudden steering movements can cause you to enter oncoming traffic or hit parked vehicles.' }
            ]
        }
    },
    'scenario-4': {
        tr: {
            title: 'Işıksız Kavşakta Öncelik',
            question: 'Işıksız bir kavşağa yaklaşıyorsunuz ve sağdan bir araç geliyor. Ne yapmalısınız?',
            options: [
                { text: 'A) Sağdan gelen araca yol vermek', explanation: 'Doğru tercih! Türkiye\'de sağdan gelen araç önceliklidir. Bu kuralı bilmek ve uygulamak kaza riskini azaltır.' },
                { text: 'B) Hızlıca geçmeye çalışmak', explanation: 'Riskli tercih! Öncelik kuralını ihlal etmek ciddi kazalara yol açabilir. Sağdan gelen araca her zaman yol verilmelidir.' }
            ]
        },
        en: {
            title: 'Priority at Unsignalized Intersection',
            question: 'You are approaching an unsignalized intersection and a vehicle is coming from the right. What should you do?',
            options: [
                { text: 'A) Yield to the vehicle from the right', explanation: 'Correct choice! In Turkey, vehicles from the right have priority. Knowing and following this rule reduces accident risk.' },
                { text: 'B) Try to pass quickly', explanation: 'Risky choice! Violating priority rules can lead to serious accidents. Always yield to vehicles from the right.' }
            ]
        }
    },
    'scenario-5': {
        tr: {
            title: 'Sola Dönüşte Karşıdan Gelen Araç',
            question: 'Yeşil ışıkta sola dönmek istiyorsunuz ancak karşıdan düz giden araçlar var. Nasıl hareket etmelisiniz?',
            options: [
                { text: 'A) Karşıdan gelen araçların geçmesini beklemek', explanation: 'Doğru tercih! Sola dönerken karşıdan düz gelen veya sağa dönen araçlara yol vermek zorundasınız. Bu kural çarpışmaları önler.' },
                { text: 'B) Hızlıca dönüş yapmak', explanation: 'Riskli tercih! Bu hareket karşıdan gelen araçla çarpışmaya neden olabilir ve sizin hatanız sayılır.' }
            ]
        },
        en: {
            title: 'Left Turn with Oncoming Traffic',
            question: 'You want to turn left at a green light but there are vehicles going straight from opposite direction. What should you do?',
            options: [
                { text: 'A) Wait for oncoming vehicles to pass', explanation: 'Correct choice! When turning left, you must yield to vehicles going straight or turning right from opposite direction. This rule prevents collisions.' },
                { text: 'B) Make a quick turn', explanation: 'Risky choice! This action can cause collision with oncoming vehicles and would be your fault.' }
            ]
        }
    },
    'scenario-6': {
        tr: {
            title: 'Yağmurlu Havada Fren',
            question: 'Yağmurlu havada giderken tali yoldan ana yola bağlanmaya çalışan bir sürücü varsa ne yapmalısınız?',
            options: [
                { text: 'A) Kademeli fren yapıp dikkat etmek', explanation: 'Doğru tercih! Yağmurlu havada yol tutuşu azaldığı için kademeli fren yapmak ve dikkatli olmak aracın kontrolünü korumanızı sağlar. Tali yoldan gelen sürücüye karşı hazırlıklı olmalısınız.' },
                { text: 'B) Hiçbir şey yapmadan yolumuza devam etmek', explanation: 'Riskli tercih! Ana yolda öncelik sizde olsa bile, savunma sürüşü yapmalı ve diğer sürücülerin hata yapabileceğini göz önünde bulundurmalısınız. Yağmurlu havada daha da dikkatli olunmalıdır.' }
            ]
        },
        en: {
            title: 'Braking in Rainy Weather',
            question: 'While driving in rainy weather, there is a driver trying to merge from a side road onto the main road. What should you do?',
            options: [
                { text: 'A) Apply gradual braking and be cautious', explanation: 'Correct choice! In rainy weather, road grip is reduced, so gradual braking and caution help maintain vehicle control. Be prepared for drivers merging from side roads.' },
                { text: 'B) Continue on your way without doing anything', explanation: 'Risky choice! Even though you have priority on the main road, practice defensive driving and consider that other drivers may make mistakes. Extra caution is needed in rainy weather.' }
            ]
        }
    },
    'scenario-7': {
        tr: {
            title: 'Takip Mesafesi İhlali',
            question: 'Otobanda 120 km/s hızla giderken önünüzdeki araç ile aranızda 1 araç boyu mesafe var. Ne yapmalısınız?',
            options: [
                { text: 'A) Takip mesafesini artırmak için yavaşlamak', explanation: 'Doğru tercih! Yüksek hızlarda takip mesafesi çok önemlidir. Güvenli mesafe minimum 2-3 saniye olmalıdır.' },
                { text: 'B) Mevcut hızda devam etmek', explanation: 'Riskli tercih! Yetersiz takip mesafesi önünüzdeki araç fren yaptığında size tepki süresi bırakmaz ve zincirleme kazalara yol açabilir.' }
            ]
        },
        en: {
            title: 'Following Distance Violation',
            question: 'You are driving at 120 km/h on the highway with only one car length between you and the vehicle ahead. What should you do?',
            options: [
                { text: 'A) Slow down to increase following distance', explanation: 'Correct choice! Following distance is critical at high speeds. Safe distance should be minimum 2-3 seconds.' },
                { text: 'B) Continue at current speed', explanation: 'Risky choice! Insufficient following distance leaves no reaction time when the vehicle ahead brakes, leading to chain collisions.' }
            ]
        }
    },
    'scenario-8': {
        tr: {
            title: 'Yüksek Rüzgar ve Yağmurda Aşırı Hız',
            question: 'Yağmurlu ve yükseltili bir yolda giderken aşırı rüzgar ve yağmur nedeniyle aracınız savruluyor. Ne yapmalısınız?',
            options: [
                { text: 'A) Hızı düşürmek ve direksiyonu sıkı tutmak', explanation: 'Doğru tercih! Yüksek rüzgar ve yağmurda aşırı hız, aracın savrulmasına ve kontrolün kaybedilmesine neden olur. Hızı düşürmek ve direksiyonu iki elle sıkıca tutmak güvenliği sağlar.' },
                { text: 'B) Mevcut hızda devam etmek', explanation: 'Riskli tercih! Açık havada yüksek rüzgar ve yağmur altında aşırı hız, aracın savrulmasına, şeritten çıkmasına veya devrilmesine neden olabilir. Hava koşullarına göre hız ayarlamak hayati önem taşır.' }
            ]
        },
        en: {
            title: 'High Wind and Rain at Excessive Speed',
            question: 'While driving on a rainy and elevated road, your vehicle is swaying due to strong wind and rain. What should you do?',
            options: [
                { text: 'A) Reduce speed and hold the steering wheel firmly', explanation: 'Correct choice! Excessive speed in high wind and rain causes vehicle swaying and loss of control. Reducing speed and firmly holding the wheel with both hands ensures safety.' },
                { text: 'B) Continue at current speed', explanation: 'Risky choice! Excessive speed in open areas under high wind and rain can cause vehicle swaying, lane departure, or rollover. Adjusting speed according to weather conditions is vital.' }
            ]
        }
    },
    'scenario-9': {
        tr: {
            title: 'Telefon Kullanımı',
            question: 'Şehir içinde sürüş yaparken telefonunuz çalıyor. Ne yapmalısınız?',
            options: [
                { text: 'A) Güvenli bir yere çekip telefonu açmak', explanation: 'Doğru tercih! Sürüş sırasında telefon kullanımı hem yasaktır hem de kazalara neden olur. Güvenli bir yere çekmek en doğru davranıştır.' },
                { text: 'B) Sürüş yaparken ahizesiz telefonu açmak', explanation: 'Riskli tercih! Ahizesiz de olsa telefon konuşması dikkatinizi dağıtır ve kaza riskini artırır.' }
            ]
        },
        en: {
            title: 'Phone Usage',
            question: 'Your phone rings while driving in the city. What should you do?',
            options: [
                { text: 'A) Pull over to a safe place and answer the phone', explanation: 'Correct choice! Phone usage while driving is both illegal and causes accidents. Pulling over safely is the right behavior.' },
                { text: 'B) Answer the phone hands-free while driving', explanation: 'Risky choice! Even hands-free, phone conversations distract you and increase accident risk.' }
            ]
        }
    },
    'scenario-10': {
        tr: {
            title: 'Yorgun Sürücü',
            question: 'Uzun bir yolculuk sırasında uykulu hissetmeye başladınız. En güvenli hareket nedir?',
            options: [
                { text: 'A) Dinlenmek için bir molaya çekmek', explanation: 'Doğru tercih! Yorgunluk kazaların en önemli nedenlerinden biridir. Düzenli molalar vermek hayat kurtarır.' },
                { text: 'B) Müzik açarak uyanık kalmaya çalışmak', explanation: 'Riskli tercih! Müzik veya enerji içeceği gibi çözümler geçicidir. Yorgunluğun tek çözümü dinlenmektir.' }
            ]
        },
        en: {
            title: 'Tired Driver',
            question: 'You start feeling sleepy during a long journey. What is the safest action?',
            options: [
                { text: 'A) Pull over for a rest break', explanation: 'Correct choice! Fatigue is one of the most important causes of accidents. Taking regular breaks saves lives.' },
                { text: 'B) Try to stay awake by playing music', explanation: 'Risky choice! Solutions like music or energy drinks are temporary. The only solution to fatigue is rest.' }
            ]
        }
    },
    'scenario-11': {
        tr: {
            title: 'Karşıdan Gelen Araç Farları',
            question: 'Gece sürüşü sırasında karşıdan gelen araç uzun farla gelmeye devam ediyor ve gözleriniz kamaşıyor. Ne yapmalısınız?',
            options: [
                { text: 'A) Yol kenarındaki beyaz çizgiyi takip ederek dikkatli ilerlemek', explanation: 'Doğru tercih! Kamaşma durumunda yol kenarı çizgisini referans almak ve gerekirse yavaşlamak güvenli sürüşün anahtarıdır.' },
                { text: 'B) Karşılık vermek için kendi farlarınızı uzun yakmak', explanation: 'Riskli tercih! Karşılık vermek her iki sürücünün de görüşünü bozar ve kaza riskini artırır. Asla uzun far ile karşılık verilmemelidir.' }
            ]
        },
        en: {
            title: 'Oncoming Vehicle High Beams',
            question: 'During night driving, an oncoming vehicle continues with high beams and your eyes are dazzled. What should you do?',
            options: [
                { text: 'A) Follow the white line on the road edge and proceed carefully', explanation: 'Correct choice! When dazzled, using the edge line as reference and slowing down if necessary is key to safe driving.' },
                { text: 'B) Retaliate by turning on your own high beams', explanation: 'Risky choice! Retaliating impairs both drivers\' vision and increases accident risk. Never retaliate with high beams.' }
            ]
        }
    },
    'scenario-12': {
        tr: {
            title: 'Yaban Hayvanı Riski',
            question: 'Gece kırsalda sürüş yaparken bir geyik yola atladı. En güvenli hareket nedir?',
            options: [
                { text: 'A) Düz fren yapıp şeritte kalmaya çalışmak', explanation: 'Doğru tercih! Hayvan çarpması ciddi olsa da şeritten çıkmak veya karşı şeride geçmek çok daha tehlikelidir. Düz fren en güvenli seçenektir.' },
                { text: 'B) Ani direksiyon ile kaçınmaya çalışmak', explanation: 'Riskli tercih! Ani manevra yoldan çıkmanıza veya karşı şeritten gelen araçla çarpışmanıza neden olabilir.' }
            ]
        },
        en: {
            title: 'Wildlife Risk',
            question: 'While driving in rural area at night, a deer jumped onto the road. What is the safest action?',
            options: [
                { text: 'A) Brake straight and try to stay in lane', explanation: 'Correct choice! Although animal collision is serious, leaving the lane or entering oncoming traffic is much more dangerous. Straight braking is the safest option.' },
                { text: 'B) Try to avoid with sudden steering', explanation: 'Risky choice! Sudden maneuver can cause you to leave the road or collide with oncoming traffic.' }
            ]
        }
    },
    'scenario-13': {
        tr: {
            title: 'Çocuk Güvenliği',
            question: 'Okul çıkışı saatinde okul önünden geçiyorsunuz. Kaldırımda birçok çocuk var. Ne yapmalısınız?',
            options: [
                { text: 'A) Hızı azaltıp her an durmaya hazır olmak', explanation: 'Doğru tercih! Çocuklar öngörülemez davranışlar sergileyebilir. Okul bölgelerinde ekstra dikkatli olmak ve hızı düşürmek şarttır.' },
                { text: 'B) Normal hızda devam etmek', explanation: 'Riskli tercih! Çocukların ani hareketlerine karşı tepki süreniz yetersiz kalabilir.' }
            ]
        },
        en: {
            title: 'Child Safety',
            question: 'You are passing by a school during dismissal time. There are many children on the sidewalk. What should you do?',
            options: [
                { text: 'A) Reduce speed and be ready to stop at any moment', explanation: 'Correct choice! Children can exhibit unpredictable behaviors. Being extra cautious and reducing speed in school zones is essential.' },
                { text: 'B) Continue at normal speed', explanation: 'Risky choice! Your reaction time may be insufficient for children\'s sudden movements.' }
            ]
        }
    },
    'scenario-14': {
        tr: {
            title: 'Yaşlı Yaya Geçişi',
            question: 'Yaşlı bir yaya yaya geçidinde yavaş yavaş karşıya geçiyor. Ne yapmalısınız?',
            options: [
                { text: 'A) Sabırla beklemek ve acele ettirmemek', explanation: 'Doğru tercih! Yaşlı yayalar daha yavaş hareket eder. Onları acele ettirmek veya stres yaratmak tehlikelidir.' },
                { text: 'B) Korna çalarak acele etmesini sağlamak', explanation: 'Riskli tercih! Korna çalmak yaşlı yayayı korkutabilir ve düşmesine neden olabilir.' }
            ]
        },
        en: {
            title: 'Elderly Pedestrian Crossing',
            question: 'An elderly pedestrian is slowly crossing at a crosswalk. What should you do?',
            options: [
                { text: 'A) Wait patiently without rushing them', explanation: 'Correct choice! Elderly pedestrians move more slowly. Rushing them or creating stress is dangerous.' },
                { text: 'B) Honk to make them hurry', explanation: 'Risky choice! Honking can startle the elderly pedestrian and cause them to fall.' }
            ]
        }
    },
    'scenario-15': {
        tr: {
            title: 'Dönel Kavşak Girişi',
            question: 'Dönel kavşağa girmek istiyorsunuz. Sağdan araç yaklaşıyor. Ne yapmalısınız?',
            options: [
                { text: 'A) Dönel kavşaktaki araca yol vermek', explanation: 'Doğru tercih! Dönel kavşaklarda içerideki araçlar önceliklidir. Girmeden önce mutlaka yol vermelisiniz.' },
                { text: 'B) Hızla kavşağa girmek', explanation: 'Riskli tercih! Öncelik kuralını ihlal etmek ciddi çarpışmalara yol açar.' }
            ]
        },
        en: {
            title: 'Roundabout Entry',
            question: 'You want to enter a roundabout. A vehicle is approaching from the right. What should you do?',
            options: [
                { text: 'A) Yield to vehicles in the roundabout', explanation: 'Correct choice! Vehicles inside the roundabout have priority. You must yield before entering.' },
                { text: 'B) Enter the roundabout quickly', explanation: 'Risky choice! Violating priority rules leads to serious collisions.' }
            ]
        }
    },
    'scenario-16': {
        tr: {
            title: 'U Dönüşü Yapma',
            question: 'Yoğun trafikte U dönüşü yapmak istiyorsunuz. En güvenli yöntem nedir?',
            options: [
                { text: 'A) Her iki yönden de yol açık olduğunda dönüş yapmak', explanation: 'Doğru tercih! U dönüşü riskli bir manevrадыr. Tüm yönlerden gelen trafiği kontrol etmek şarttır.' },
                { text: 'B) Sadece kendi şeridinizdeki trafiği kontrol etmek', explanation: 'Riskli tercih! Karşı şeritten gelen araçları görmezden gelmek ciddi kazalara neden olur.' }
            ]
        },
        en: {
            title: 'Making a U-Turn',
            question: 'You want to make a U-turn in heavy traffic. What is the safest method?',
            options: [
                { text: 'A) Make the turn when the road is clear from both directions', explanation: 'Correct choice! U-turns are risky maneuvers. Checking traffic from all directions is essential.' },
                { text: 'B) Only check traffic in your own lane', explanation: 'Risky choice! Ignoring vehicles from oncoming lanes causes serious accidents.' }
            ]
        }
    },
    'scenario-17': {
        tr: {
            title: 'Buzlu Yolda Fren',
            question: 'Buzlu yolda sürüş yaparken önünüzdeki araç durdu. Nasıl fren yapmalısınız?',
            options: [
                { text: 'A) Kısa kısa fren yaparak (pompalama tekniği)', explanation: 'Doğru tercih! Buzlu yolda pompalama tekniği tekerleklerin kilitlenmesini önler ve kontrolü sürdürmenizi sağlar.' },
                { text: 'B) Ani ve sert fren yaparak', explanation: 'Riskli tercih! Ani fren buzlu yolda tekerlekleri kilitler ve kontrolü tamamen kaybedersiniz.' }
            ]
        },
        en: {
            title: 'Braking on Icy Road',
            question: 'While driving on an icy road, the vehicle ahead stopped. How should you brake?',
            options: [
                { text: 'A) Apply short, repeated braking (pumping technique)', explanation: 'Correct choice! Pumping technique on icy roads prevents wheel lockup and helps maintain control.' },
                { text: 'B) Apply sudden and hard braking', explanation: 'Risky choice! Sudden braking on icy roads locks the wheels and you completely lose control.' }
            ]
        }
    },
    'scenario-18': {
        tr: {
            title: 'Hız Limitinin Üzerinde',
            question: 'Otobanda hız limiti 120 km/s. Arkadan gelen araç farla sinyal veriyor. Ne yapmalısınız?',
            options: [
                { text: 'A) Güvenli bir şekilde sağ şeride geçmek', explanation: 'Doğru tercih! Sol şerit sollama şerididir. Sollama yapmıyorsanız sağ şeride geçmelisiniz.' },
                { text: 'B) Hızınızı daha da düşürerek öğüt vermek', explanation: 'Riskli tercih! Bu davranış trafik akışını bozar ve saldırgan sürücü davranışlarını tetikler.' }
            ]
        },
        en: {
            title: 'Above Speed Limit',
            question: 'The speed limit on the highway is 120 km/h. A vehicle behind is flashing its lights. What should you do?',
            options: [
                { text: 'A) Safely move to the right lane', explanation: 'Correct choice! The left lane is for overtaking. If you are not overtaking, you should move to the right lane.' },
                { text: 'B) Slow down even more to teach a lesson', explanation: 'Risky choice! This behavior disrupts traffic flow and triggers aggressive driving behaviors.' }
            ]
        }
    },
    'scenario-19': {
        tr: {
            title: 'Yemek Yerken Sürüş',
            question: 'Acele bir toplantıya giderken arabada kahvaltı yapmaya karar verdiniz. Doğru olan nedir?',
            options: [
                { text: 'A) Güvenli bir yere çekip yemek yemek', explanation: 'Doğru tercih! Sürüş sırasında yemek yemek dikkatinizi önemli ölçüde dağıtır ve kaza riskini artırır.' },
                { text: 'B) Düz yolda dikkatli bir şekilde yemek', explanation: 'Riskli tercih! Düz yol bile olsa elleriniz direksiyonda değildir ve dikkatiniz bölünmüştür.' }
            ]
        },
        en: {
            title: 'Eating While Driving',
            question: 'You decided to have breakfast in the car while rushing to a meeting. What is correct?',
            options: [
                { text: 'A) Pull over to a safe place and eat', explanation: 'Correct choice! Eating while driving significantly distracts you and increases accident risk.' },
                { text: 'B) Eat carefully on a straight road', explanation: 'Risky choice! Even on a straight road, your hands are not on the wheel and your attention is divided.' }
            ]
        }
    },
    'scenario-20': {
        tr: {
            title: 'Navigasyon Ayarı',
            question: 'Sürüş sırasında navigasyon cihazınızın ayarını değiştirmeniz gerekiyor. Ne yapmalısınız?',
            options: [
                { text: 'A) Güvenli bir yere çekip ayarları değiştirmek', explanation: 'Doğru tercih! Navigasyon ile uğraşmak gözlerinizin yoldan kaymasına neden olur. Durmak en güvenli seçenektir.' },
                { text: 'B) Kırmızı ışıkta beklerken ayarlamak', explanation: 'Riskli tercih! Işık değiştiğinde hazır olmayabilirsiniz ve arkadan gelebilecek çarpmalara karşı savunmasız kalırsınız.' }
            ]
        },
        en: {
            title: 'Navigation Adjustment',
            question: 'You need to change your navigation device settings while driving. What should you do?',
            options: [
                { text: 'A) Pull over to a safe place and change settings', explanation: 'Correct choice! Dealing with navigation causes your eyes to leave the road. Stopping is the safest option.' },
                { text: 'B) Adjust it while waiting at a red light', explanation: 'Risky choice! You may not be ready when the light changes and are vulnerable to rear-end collisions.' }
            ]
        }
    },
    'scenario-21': {
        tr: {
            title: 'Sis Lambası Kullanımı',
            question: 'Yoğun siste sürüş yapıyorsunuz. Hangi farları kullanmalısınız?',
            options: [
                { text: 'A) Sis farları ve kısa farları', explanation: 'Doğru tercih! Uzun farlar siste yansıma yapar ve görüşü daha da kötüleştirir. Sis farları ve kısa farlar en iyisidir.' },
                { text: 'B) Uzun farları', explanation: 'Riskli tercih! Uzun farlar siste parlak bir perde oluşturur ve hiçbir şey görmezsiniz.' }
            ]
        },
        en: {
            title: 'Fog Light Usage',
            question: 'You are driving in heavy fog. Which lights should you use?',
            options: [
                { text: 'A) Fog lights and low beams', explanation: 'Correct choice! High beams reflect in fog and worsen visibility. Fog lights and low beams are best.' },
                { text: 'B) High beams', explanation: 'Risky choice! High beams create a bright curtain in fog and you cannot see anything.' }
            ]
        }
    },
    'scenario-22': {
        tr: {
            title: 'Kırsal Alanda Gece Sürüşü',
            question: 'Aydınlatması olmayan kırsal yolda gece sürüşü yapıyorsunuz. Hızınız ne olmalı?',
            options: [
                { text: 'A) Farların aydınlattığı mesafede durabilecek hızda', explanation: 'Doğru tercih! Gece görüş mesafeniz sınırlıdır. Farlarınızın aydınlattığı mesafede durabilecek hızda gitmelisiniz.' },
                { text: 'B) Gündüz gittiğiniz hızda', explanation: 'Riskli tercih! Gece görüş mesafeniz çok daha kısadır. Gündüz hızıyla gitmek tehlike algılama sürenizi azaltır.' }
            ]
        },
        en: {
            title: 'Night Driving in Rural Area',
            question: 'You are driving at night on an unlit rural road. What should your speed be?',
            options: [
                { text: 'A) Speed at which you can stop within the distance illuminated by headlights', explanation: 'Correct choice! Your visibility at night is limited. You should drive at a speed where you can stop within the distance your headlights illuminate.' },
                { text: 'B) Same speed as daytime', explanation: 'Risky choice! Your visibility at night is much shorter. Driving at daytime speed reduces your hazard detection time.' }
            ]
        }
    },
    'scenario-23': {
        tr: {
            title: 'Bisikletli ile Yan Yana',
            question: 'Dar bir yolda önünüzde bisiklet sürücüsü var. Nasıl sollama yapmalısınız?',
            options: [
                { text: 'A) En az 1.5 metre mesafe bırakarak güvenli sollama yapmak', explanation: 'Doğru tercih! Bisikletliler savunmasızdır. Güvenli mesafe bırakmak ve yavaş sollama yapmak şarttır.' },
                { text: 'B) Yan tarafından hızlıca geçmek', explanation: 'Riskli tercih! Hızlı geçiş bisikletliyi dengesini kaybettirebilir veya çarpabilirsiniz.' }
            ]
        },
        en: {
            title: 'Alongside a Cyclist',
            question: 'There is a cyclist ahead on a narrow road. How should you overtake?',
            options: [
                { text: 'A) Overtake safely leaving at least 1.5 meters distance', explanation: 'Correct choice! Cyclists are vulnerable. Leaving safe distance and overtaking slowly is essential.' },
                { text: 'B) Pass quickly from the side', explanation: 'Risky choice! Quick passing can make the cyclist lose balance or you may hit them.' }
            ]
        }
    },
    'scenario-24': {
        tr: {
            title: 'Yeşil Işıkta Yaya',
            question: 'Yeşil ışıkta sağa dönüyorsunuz ama yaya geçidinde yayalar var. Ne yapmalısınız?',
            options: [
                { text: 'A) Yayaların geçmesini beklemek', explanation: 'Doğru tercih! Yeşil ışığınız olsa bile yaya geçidindeki yayalara yol vermek zorundasınız.' },
                { text: 'B) Yavaşça arayı bulup geçmek', explanation: 'Riskli tercih! Yayaların güvenliği her zaman önceliktir. Geçişlerini tamamlamalarını beklemelisiniz.' }
            ]
        },
        en: {
            title: 'Pedestrians at Green Light',
            question: 'You are turning right at a green light but there are pedestrians at the crosswalk. What should you do?',
            options: [
                { text: 'A) Wait for pedestrians to pass', explanation: 'Correct choice! Even if you have a green light, you must yield to pedestrians at the crosswalk.' },
                { text: 'B) Slowly find a gap and pass', explanation: 'Risky choice! Pedestrian safety is always priority. You must wait for them to complete their crossing.' }
            ]
        }
    },
    'scenario-25': {
        tr: {
            title: 'Aşırı Hız Virajda',
            question: 'Dağ yolunda keskin bir viraja hızlı yaklaştığınızı fark ettiniz. En güvenli hareket nedir?',
            options: [
                { text: 'A) Virajdan önce yavaşlamak', explanation: 'Doğru tercih! Viraj içinde fren yapmak aracın dengesini bozar. Doğru olan virajdan önce hızı düşürmektir.' },
                { text: 'B) Viraj içinde fren yapmak', explanation: 'Riskli tercih! Viraj içinde fren yapmak ağırlık transferi nedeniyle aracın kontrolünü kaybetmenize ve yoldan çıkmanıza neden olabilir.' }
            ]
        },
        en: {
            title: 'Excessive Speed in Curve',
            question: 'You realized you are approaching a sharp curve quickly on a mountain road. What is the safest action?',
            options: [
                { text: 'A) Slow down before the curve', explanation: 'Correct choice! Braking inside a curve disturbs vehicle balance. The correct action is to reduce speed before the curve.' },
                { text: 'B) Brake inside the curve', explanation: 'Risky choice! Braking inside a curve can cause loss of vehicle control and road departure due to weight transfer.' }
            ]
        }
    },
    'scenario-26': {
        tr: {
            title: 'Yeşil Işık Yanarken Geçiş',
            question: 'Kavşakta yeşil ışık size yanıyor ve hızınızla ilerliyorsunuz. Soldan kırmızı ışığa rağmen bir araç yola atlamış. Ne yapmalısınız?',
            options: [
                { text: 'A) Dikkatli olmak ve frene hazır bulunmak', explanation: 'Doğru tercih! Yeşil ışık geçiş hakkı verir ancak kırmızı ışıkta geçen araçlar olabilir. Savunma sürüşü yaparak her zaman dikkatli ve frene hazır olmalısınız.' },
                { text: 'B) Hızınızı bozmadan devam etmek', explanation: 'Riskli tercih! Kırmızı ışıkta geçen araçla çarpışma riski vardır. Yeşil ışığınız olsa bile çevreye dikkat etmek ve savunma sürüşü yapmak hayati önem taşır.' }
            ]
        },
        en: {
            title: 'Crossing at Green Light',
            question: 'You have a green light at an intersection and are proceeding at your speed. A vehicle has jumped into the road from the left despite the red light. What should you do?',
            options: [
                { text: 'A) Be cautious and ready to brake', explanation: 'Correct choice! Green light gives you right of way but vehicles may run red lights. Practice defensive driving and always be cautious and ready to brake.' },
                { text: 'B) Continue without changing speed', explanation: 'Risky choice! There is risk of collision with vehicles running red lights. Even with a green light, paying attention to surroundings and defensive driving is vital.' }
            ]
        }
    }
};

let currentLanguage = localStorage.getItem('traffiVidLanguage') || 'tr';

const scenarios = [
    // Yaya Güvenliği
    {
        id: 'scenario-1',
        title: 'Zebra Çizgisinde Ani Karar',
        category: 'Yaya Güvenliği',
        categoryId: 'yaya-guvenlik',
        difficulty: 'kolay',
        locked: false,
        thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
        videoUrl: 'vid/sc-1.mp4',
        question: 'Yaya geçidine yaklaşırken bir yaya aniden yola adım attı. Sürücü olarak en güvenli seçenek hangisidir?',
        options: [
            {
                id: 'a',
                text: 'A) Ani fren yapıp yaya geçidinin önünde durmak',
                correct: true,
                explanation: 'Doğru tercih! Trafik kurallarına göre sürücüler, yaya geçidinde veya yakınında bulunan yayalara yol vermek zorundadır. Ani fren yapmak, yayaya çarpmanın önüne geçer.'
            },
            {
                id: 'b',
                text: 'B) Önce dur, yaya gelince hızlan',
                correct: false,
                explanation: 'Riskli tercih! Bu davranış hem trafik kurallarına aykırıdır hem de yayaya çarpma riski taşır. Yaya geçidinde yayanın geçiş hakkı vardır ve sürücü durmalıdır.',
                failVideo: 'vid/sc-1-f.mp4'
            }
        ]
    },
    {
        id: 'scenario-2',
        title: 'Okul Geçidi Uyarısı',
        category: 'Yaya Güvenliği',
        categoryId: 'yaya-guvenlik',
        difficulty: 'kolay',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1501959181532-7d2a3c064642?w=600&h=400&fit=crop',
        videoUrl: 'vid/sc-2.mp4',
        question: 'Okul yaya geçidinde dönüş sırasında yayaya yol vermenize rağmen yaya duruyor. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Beklemek ve yayaya işaret vererek geçmesini sağlamak',
                correct: true,
                explanation: 'Doğru tercih! Yaya geçidinde yayaya yol vermek zorunludur. Yaya duraksa bile sabırla beklemek ve geçmesi için nazikçe işaret vermek en güvenli yaklaşımdır.'
            },
            {
                id: 'b',
                text: 'B) Korna basıp yaya şeritte olmasına rağmen geçmeye çalışmak',
                correct: false,
                explanation: 'Riskli tercih! Yaya geçidinde yayanın geçiş hakkı her zaman önceliktir. Aceleci davranmak kazaya yol açabilir ve trafik kurallarına aykırıdır.',
                failVideo: 'vid/sc-2-f.mp4'
            }
        ]
    },

    // Kavşak ve Dönüşler

    // Hız ve Fren Mesafesi
    {
        id: 'scenario-6',
        title: 'Yağmurlu Havada Fren',
        category: 'Hız ve Fren Mesafesi',
        categoryId: 'hiz-fren',
        difficulty: 'orta',
        locked: false,
        thumbnail: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&h=400&fit=crop',
        videoUrl: 'vid/sc-3.1.mp4',
        question: 'Yağmurlu havada giderken tali yoldan ana yola bağlanmaya çalışan bir sürücü varsa ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Kademeli fren yapıp dikkat etmek',
                correct: true,
                explanation: 'Doğru tercih! Yağmurlu havada yol tutuşu azaldığı için kademeli fren yapmak ve dikkatli olmak aracın kontrolünü korumanızı sağlar. Tali yoldan gelen sürücüye karşı hazırlıklı olmalısınız.'
            },
            {
                id: 'b',
                text: 'B) Hiçbir şey yapmadan yolumuza devam etmek',
                correct: false,
                explanation: 'Riskli tercih! Ana yolda öncelik sizde olsa bile, savunma sürüşü yapmalı ve diğer sürücülerin hata yapabileceğini göz önünde bulundurmalısınız. Yağmurlu havada daha da dikkatli olunmalıdır.',
                failVideo: 'vid/sc-3.1-f.mp4'
            }
        ]
    },
    {
        id: 'scenario-8',
        title: 'Yüksek Rüzgar ve Yağmurda Aşırı Hız',
        category: 'Hız ve Fren Mesafesi',
        categoryId: 'hiz-fren',
        difficulty: 'zor',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=600&h=400&fit=crop',
        videoUrl: 'vid/sc-3.3.mp4',
        question: 'Yağmurlu ve yükseltili bir yolda giderken aşırı rüzgar ve yağmur nedeniyle aracınız savruluyor. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Hızı düşürmek ve direksiyonu sıkı tutmak',
                correct: true,
                explanation: 'Doğru tercih! Yüksek rüzgar ve yağmurda aşırı hız, aracın savrulmasına ve kontrolün kaybedilmesine neden olur. Hızı düşürmek ve direksiyonu iki elle sıkıca tutmak güvenliği sağlar.'
            },
            {
                id: 'b',
                text: 'B) Mevcut hızda devam etmek',
                correct: false,
                explanation: 'Riskli tercih! Açık havada yüksek rüzgar ve yağmur altında aşırı hız, aracın savrulmasına, şeritten çıkmasına veya devrilmesine neden olabilir. Hava koşullarına göre hız ayarlamak hayati önem taşır.',
                failVideo: 'vid/sc-3.3-f.mp4'
            }
        ]
    },

    // Kurallar ve Dikkat Dağınıklığı
    {
        id: 'scenario-26',
        title: 'Yeşil Işık Yanarken Geçiş',
        category: 'Kurallar ve Dikkat Dağınıklığı',
        categoryId: 'dikkat-daginiklik',
        difficulty: 'kolay',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=400&fit=crop',
        videoUrl: 'vid/sc-4.3.mp4',
        question: 'Kavşakta yeşil ışık size yanıyor ve hızınızla ilerliyorsunuz. Soldan kırmızı ışığa rağmen bir araç yola atlamış. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Dikkatli olmak ve frene hazır bulunmak',
                correct: true,
                explanation: 'Doğru tercih! Yeşil ışık geçiş hakkı verir ancak kırmızı ışıkta geçen araçlar olabilir. Savunma sürüşü yaparak her zaman dikkatli ve frene hazır olmalısınız.'
            },
            {
                id: 'b',
                text: 'B) Hızınızı bozmadan devam etmek',
                correct: false,
                explanation: 'Riskli tercih! Kırmızı ışıkta geçen araçla çarpışma riski vardır. Yeşil ışığınız olsa bile çevreye dikkat etmek ve savunma sürüşü yapmak hayati önem taşır.',
                failVideo: 'vid/sc-4.3-f.mp4'
            }
        ]
    },

    // Gece Sürüşü

];

// ===== STATE MANAGEMENT =====
let currentScenario = null;
let timerInterval = null;
let remainingTime = 15;
let userProgress = loadProgress();

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    applyLanguage(currentLanguage);
    renderScenarios();
    updateScores();

    // Start tracking session
    userTracker.startSession();

    // Display user ID in console for debugging
    console.log('User ID:', userTracker.userId);
    console.log('Session ID:', userTracker.sessionId);

    // Update user ID in navbar
    updateUserIdDisplay();

    // Show data consent banner if not yet decided
    setTimeout(() => {
        showConsentBanner();
    }, 2000); // Show after 2 seconds
});

// End session before page unload
window.addEventListener('beforeunload', () => {
    userTracker.endSession();

    // Auto-sync data if consent given
    if (dataSharingManager.hasConsent()) {
        syncDataToSheets();
    }
});

function initializeApp() {
    // Check if this is first visit
    if (!userProgress) {
        userProgress = {
            completedScenarios: {},
            totalScore: 0,
            unlockedScenarios: ['scenario-1', 'scenario-4', 'scenario-6', 'scenario-9', 'scenario-11']
        };
        saveProgress();
    }
}

function setupEventListeners() {
    // Start button in hero
    document.getElementById('startBtn').addEventListener('click', () => {
        document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
    });

    // Navigation menu smooth scroll
    document.querySelectorAll('.nav-menu > a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Language toggle switch
    const langToggle = document.getElementById('langToggle');

    // Set initial state
    if (currentLanguage === 'en') {
        langToggle.checked = true;
    }

    langToggle.addEventListener('change', () => {
        const newLang = langToggle.checked ? 'en' : 'tr';
        switchLanguage(newLang);
    });

    // Category dropdown links smooth scroll
    document.querySelectorAll('.dropdown-item').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const categoryRow = targetElement.closest('.category-row');
                if (categoryRow) {
                    categoryRow.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // View All buttons
    document.querySelectorAll('.view-all').forEach((button, index) => {
        const categories = ['Yaya Güvenliği', 'Kavşak ve Dönüşler', 'Hız ve Fren Mesafesi', 'Kurallar ve Dikkat Dağınıklığı', 'Gece Sürüşü'];
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openCategoryModal(categories[index]);
        });
    });

    // Category Modal close button
    document.getElementById('closeCategoryModal').addEventListener('click', closeCategoryModal);

    // Click outside category modal to close
    document.getElementById('categoryModal').addEventListener('click', (e) => {
        if (e.target.id === 'categoryModal') {
            closeCategoryModal();
        }
    });

    // Modal close button
    document.getElementById('closeModal').addEventListener('click', closeModal);

    // Click outside modal to close
    document.getElementById('scenarioModal').addEventListener('click', (e) => {
        if (e.target.id === 'scenarioModal') {
            closeModal();
        }
    });

    // Outcome action buttons
    document.getElementById('retryBtn').addEventListener('click', retryScenario);
    document.getElementById('nextBtn').addEventListener('click', nextScenario);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== RENDER SCENARIOS =====
function renderScenarios() {
    // Clear all containers first
    scenarios.forEach(scenario => {
        const container = document.getElementById(scenario.categoryId);
        if (container) container.innerHTML = '';
    });

    scenarios.forEach(scenario => {
        const container = document.getElementById(scenario.categoryId);
        if (!container) return;

        const isUnlocked = userProgress.unlockedScenarios.includes(scenario.id);
        const isCompleted = userProgress.completedScenarios[scenario.id];

        const card = document.createElement('div');
        card.className = `scenario-card ${!isUnlocked ? 'locked' : ''}`;

        let statusText = '';
        let statusClass = '';
        if (!isUnlocked) {
            statusText = `🔒 ${translate('locked')}`;
        } else if (isCompleted) {
            statusText = `✓ ${translate('completed')} (${isCompleted.score} ${translate('points')})`;
            statusClass = 'completed';
        } else {
            statusText = translate('not_started');
        }

        const difficultyText = translate(scenario.difficulty);
        const categoryText = translate(scenario.category);

        // Get translated title if available
        const scenarioTranslation = scenarioTranslations[scenario.id]?.[currentLanguage];
        const titleText = scenarioTranslation?.title || scenario.title;

        card.innerHTML = `
            <div class="card-thumbnail">
                <img src="${scenario.thumbnail}" alt="${titleText}">
                ${!isUnlocked ? '<div class="lock-icon">🔒</div>' : ''}
            </div>
            <div class="card-info">
                <div class="card-title">${titleText}</div>
                <div class="card-meta">
                    <span class="category-tag">${categoryText}</span>
                    <span class="difficulty-badge difficulty-${scenario.difficulty}">
                        ${difficultyText}
                    </span>
                </div>
                <div class="card-status ${statusClass}">${statusText}</div>
            </div>
            <div class="card-hover-overlay">
                <button class="card-hover-btn">${translate('enter_scenario')}</button>
            </div>
        `;

        if (isUnlocked) {
            card.addEventListener('click', () => openScenario(scenario.id));
        }

        container.appendChild(card);
    });
}

// ===== SCENARIO MODAL =====
function openScenario(scenarioId) {
    currentScenario = scenarios.find(s => s.id === scenarioId);
    if (!currentScenario) return;

    // Check if unlocked
    if (!userProgress.unlockedScenarios.includes(scenarioId)) {
        const msg = currentLanguage === 'tr'
            ? 'Bu senaryo henüz kilitli! Önceki senaryoları tamamlayarak yeni senaryoları açabilirsiniz.'
            : 'This scenario is locked! Complete previous scenarios to unlock new ones.';
        alert(msg);
        return;
    }

    // Populate modal
    const scenarioTranslation = scenarioTranslations[scenarioId]?.[currentLanguage];
    document.getElementById('scenarioTitle').textContent = scenarioTranslation?.title || currentScenario.title;
    document.getElementById('scenarioCategory').textContent = translate(currentScenario.category);

    const difficultyBadge = document.getElementById('scenarioDifficulty');
    difficultyBadge.textContent = translate(currentScenario.difficulty);
    difficultyBadge.className = `difficulty-badge difficulty-${currentScenario.difficulty}`;

    const bestScore = userProgress.completedScenarios[scenarioId]?.score || '-';
    document.getElementById('scenarioBestScore').textContent = bestScore === '-' ? '-' : `${bestScore} ${translate('points')}`;

    // Set video poster
    const video = document.getElementById('scenarioVideo');
    video.poster = currentScenario.thumbnail;

    // Show modal
    document.getElementById('scenarioModal').classList.add('active');
    document.body.style.overflow = 'hidden';

    // Start scenario sequence
    startScenarioSequence();
}

function closeModal() {
    document.getElementById('scenarioModal').classList.remove('active');
    document.body.style.overflow = 'auto';

    // Reset video and overlays
    const video = document.getElementById('scenarioVideo');
    video.pause();
    video.currentTime = 0;

    document.getElementById('questionOverlay').classList.remove('active');
    document.getElementById('outcomeOverlay').classList.remove('active');

    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

function startScenarioSequence() {
    const video = document.getElementById('scenarioVideo');
    const videoLoading = document.getElementById('videoLoading');
    const loadingProgressFill = document.getElementById('loadingProgressFill');
    const loadingPercentage = document.getElementById('loadingPercentage');

    // Set video source if available
    if (currentScenario.videoUrl) {
        // Show loading overlay
        videoLoading.classList.add('active');

        // Collect all videos to preload (main video + fail videos)
        const videosToPreload = [currentScenario.videoUrl];
        currentScenario.options.forEach(option => {
            if (option.failVideo && !videosToPreload.includes(option.failVideo)) {
                videosToPreload.push(option.failVideo);
            }
        });

        // Preload all videos
        let loadedVideos = 0;
        const totalVideos = videosToPreload.length;
        const videoElements = [];

        videosToPreload.forEach((videoUrl, index) => {
            const preloadVideo = document.createElement('video');
            preloadVideo.preload = 'auto';
            preloadVideo.src = videoUrl;
            videoElements.push(preloadVideo);

            preloadVideo.addEventListener('canplaythrough', () => {
                loadedVideos++;
                const percentage = (loadedVideos / totalVideos) * 100;
                loadingProgressFill.style.width = percentage + '%';
                loadingPercentage.textContent = Math.round(percentage) + '%';

                // When all videos are loaded
                if (loadedVideos === totalVideos) {
                    // Store preloaded videos for later use
                    currentScenario.preloadedVideos = videoElements;

                    // Set main video source
                    video.src = currentScenario.videoUrl;
                    video.load();
                    
                    // Wait for video to actually start playing before hiding loading screen
                    video.onplaying = () => {
                        videoLoading.classList.remove('active');
                        video.onplaying = null; // Remove listener after first use
                    };
                    
                    // Start playing
                    video.play().catch(err => {
                        console.error('Video play error:', err);
                        // If autoplay fails, hide loading and show question immediately
                        videoLoading.classList.remove('active');
                        showQuestion();
                    });
                }
            }, { once: true });

            preloadVideo.load();
        });

        // When video ends, show question and start timer
        video.onended = () => {
            showQuestion();
        };
    } else {
        // For demo without video, just show the question after a short delay
        setTimeout(() => {
            showQuestion();
        }, 2000);
    }
}

function showQuestion() {
    // Pause video to ensure it's not playing during question
    const video = document.getElementById('scenarioVideo');
    if (video) {
        video.pause();
    }
    
    document.getElementById('questionOverlay').classList.add('active');

    // Get translation if available
    const scenarioTranslation = scenarioTranslations[currentScenario.id]?.[currentLanguage];
    const questionText = scenarioTranslation?.question || currentScenario.question;
    document.getElementById('questionText').textContent = questionText;

    // Render options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    currentScenario.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        const optionText = scenarioTranslation?.options[index]?.text || option.text;
        btn.textContent = optionText;
        btn.addEventListener('click', () => selectOption(option));
        optionsContainer.appendChild(btn);
    });

    // Start timer only after question is fully displayed
    // Add a small delay to ensure everything is rendered
    setTimeout(() => {
        startTimer();
    }, 100);
}

function startTimer() {
    remainingTime = 15;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        remainingTime--;
        updateTimerDisplay();

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            // Time's up - select wrong answer automatically
            const wrongOption = currentScenario.options.find(o => !o.correct);
            selectOption(wrongOption, true);
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timerText').textContent = remainingTime;

    // Update circular progress
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (remainingTime / 15) * circumference;
    document.getElementById('timerProgress').style.strokeDashoffset = offset;
}

function selectOption(option, timedOut = false) {
    const responseTime = 15 - remainingTime;

    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Record the attempt in user tracker
    userTracker.recordScenarioAttempt(
        currentScenario.id,
        option.correct,
        responseTime,
        timedOut
    );

    // Hide question overlay
    document.getElementById('questionOverlay').classList.remove('active');

    // If wrong option has a fail video, play it first
    if (!option.correct && option.failVideo) {
        const video = document.getElementById('scenarioVideo');

        // Video already preloaded, just set source and play (no loading needed)
        video.src = option.failVideo;
        video.load();
        video.play();

        video.onended = () => {
            processOptionResult(option, timedOut);
        };
    } else {
        processOptionResult(option, timedOut);
    }
}

function processOptionResult(option, timedOut = false) {
    // Calculate score
    const score = option.correct ? 100 : 0;

    // Update progress
    if (!userProgress.completedScenarios[currentScenario.id] ||
        userProgress.completedScenarios[currentScenario.id].score < score) {

        const previousScore = userProgress.completedScenarios[currentScenario.id]?.score || 0;
        userProgress.completedScenarios[currentScenario.id] = {
            score,
            completedAt: new Date().toISOString()
        };
        userProgress.totalScore = userProgress.totalScore - previousScore + score;

        // Unlock next scenario in same category
        unlockNextScenario();

        saveProgress();

        // Update user tracker achievements
        userTracker.updateAchievements(userProgress.totalScore, userProgress.completedScenarios);

        updateScores();

        // Auto-sync data to Google Sheets if consent given
        if (dataSharingManager.hasConsent()) {
            syncDataToSheets();
        }
    }

    // Show outcome
    showOutcome(option, score, timedOut);
}

function unlockNextScenario() {
    const currentIndex = scenarios.findIndex(s => s.id === currentScenario.id);
    const nextScenario = scenarios[currentIndex + 1];

    if (nextScenario && !userProgress.unlockedScenarios.includes(nextScenario.id)) {
        userProgress.unlockedScenarios.push(nextScenario.id);
        saveProgress();

        // Re-render scenarios to update lock states immediately
        renderScenarios();
    }
}

function showOutcome(option, score, timedOut) {
    const outcomeOverlay = document.getElementById('outcomeOverlay');
    const outcomeIcon = document.getElementById('outcomeIcon');
    const outcomeTitle = document.getElementById('outcomeTitle');
    const outcomeExplanation = document.getElementById('outcomeExplanation');
    const outcomeScoreText = document.getElementById('outcomeScoreText');

    // Get translation if available
    const scenarioTranslation = scenarioTranslations[currentScenario.id]?.[currentLanguage];
    const optionIndex = currentScenario.options.findIndex(opt => opt.id === option.id);
    const explanationText = scenarioTranslation?.options[optionIndex]?.explanation || option.explanation;

    if (timedOut) {
        outcomeIcon.textContent = '⏱️';
        outcomeTitle.textContent = translate('time_up');
        outcomeTitle.style.color = 'var(--warning-color)';
        outcomeExplanation.textContent = translate('time_up_msg') + ' ' + explanationText;
        outcomeScoreText.textContent = `0 ${translate('points')}`;
        outcomeScoreText.style.color = 'var(--danger-color)';
    } else if (option.correct) {
        outcomeIcon.textContent = '✅';
        outcomeTitle.textContent = translate('correct_choice');
        outcomeTitle.style.color = 'var(--success-color)';
        outcomeExplanation.textContent = explanationText;
        outcomeScoreText.textContent = `+${score} ${translate('points')}`;
        outcomeScoreText.style.color = 'var(--success-color)';
    } else {
        outcomeIcon.textContent = '❌';
        outcomeTitle.textContent = translate('risky_choice');
        outcomeTitle.style.color = 'var(--danger-color)';
        outcomeExplanation.textContent = explanationText;
        outcomeScoreText.textContent = `0 ${translate('points')}`;
        outcomeScoreText.style.color = 'var(--danger-color)';
    }

    outcomeOverlay.classList.add('active');
}

function retryScenario() {
    document.getElementById('outcomeOverlay').classList.remove('active');
    startScenarioSequence();
}

function nextScenario() {
    const currentIndex = scenarios.findIndex(s => s.id === currentScenario.id);
    const nextScenario = scenarios[currentIndex + 1];

    closeModal();

    if (nextScenario && userProgress.unlockedScenarios.includes(nextScenario.id)) {
        setTimeout(() => openScenario(nextScenario.id), 300);
    } else {
        // Scroll to categories to show updated cards (no reload needed)
        setTimeout(() => {
            document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
}

// ===== SCORES =====
function updateScores() {
    document.getElementById('totalScore').textContent = userProgress.totalScore;

    const completedCount = Object.keys(userProgress.completedScenarios).length;
    document.getElementById('completedCount').textContent = completedCount;

    // Render scores list
    const scoresList = document.getElementById('scoresList');
    scoresList.innerHTML = '';

    for (const [scenarioId, data] of Object.entries(userProgress.completedScenarios)) {
        const scenario = scenarios.find(s => s.id === scenarioId);
        if (!scenario) continue;

        // Get translated title
        const translation = scenarioTranslations[scenarioId]?.[currentLanguage];
        const title = translation ? translation.title : scenario.title;

        // Format completion time
        let timeText = '';
        if (data.completedAt) {
            const completedDate = new Date(data.completedAt);
            const now = new Date();
            const diffMs = now - completedDate;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            if (diffMins < 1) {
                timeText = currentLanguage === 'tr' ? 'Az önce' : 'Just now';
            } else if (diffMins < 60) {
                timeText = currentLanguage === 'tr' ? `${diffMins} dakika önce` : `${diffMins} min ago`;
            } else if (diffHours < 24) {
                timeText = currentLanguage === 'tr' ? `${diffHours} saat önce` : `${diffHours} hours ago`;
            } else if (diffDays < 7) {
                timeText = currentLanguage === 'tr' ? `${diffDays} gün önce` : `${diffDays} days ago`;
            } else {
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                timeText = completedDate.toLocaleDateString(currentLanguage === 'tr' ? 'tr-TR' : 'en-US', options);
            }
        }

        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        scoreItem.innerHTML = `
            <div class="score-item-info">
                <div class="score-item-title">${title}</div>
                ${timeText ? `<div class="score-item-time">${timeText}</div>` : ''}
            </div>
            <div class="score-item-points">${data.score} ${translate('points')}</div>
        `;
        scoresList.appendChild(scoreItem);
    }

    // Add user statistics section
    addUserStatistics();
}

function addUserStatistics() {
    const scoresSection = document.getElementById('scores');

    // Remove existing stats if any
    const existingStats = document.getElementById('userStatistics');
    if (existingStats) {
        existingStats.remove();
    }

    const stats = userTracker.getUserStats();
    const accuracy = userTracker.getAccuracyRate();
    const recentMistakes = userTracker.getRecentMistakes(5);

    const statsHTML = `
        <div id="userStatistics" class="user-statistics">
            <div class="stats-header">
                <h3>${currentLanguage === 'tr' ? '📊 Detaylı İstatistikler' : '📊 Detailed Statistics'}</h3>
                <div class="stats-header-buttons">
                    ${dataSharingManager.hasConsent() ? `
                        <button onclick="manualSyncFromScores()" class="sync-btn" id="syncBtn">
                            🔄 ${currentLanguage === 'tr' ? 'Verileri Gönder' : 'Sync Data'}
                        </button>
                    ` : ''}
                    <button onclick="showFullStats()" class="view-stats-btn">
                        ${currentLanguage === 'tr' ? 'Tüm İstatistikler' : 'View All Stats'}
                    </button>
                </div>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">🎯</div>
                    <div class="stat-value">${accuracy}%</div>
                    <div class="stat-label">${currentLanguage === 'tr' ? 'Doğruluk Oranı' : 'Accuracy Rate'}</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-value">${stats.userData.statistics.correctChoices}</div>
                    <div class="stat-label">${currentLanguage === 'tr' ? 'Doğru Cevaplar' : 'Correct Answers'}</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">❌</div>
                    <div class="stat-value">${stats.userData.statistics.wrongChoices}</div>
                    <div class="stat-label">${currentLanguage === 'tr' ? 'Yanlış Cevaplar' : 'Wrong Answers'}</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">⏱️</div>
                    <div class="stat-value">${stats.userData.statistics.averageResponseTime.toFixed(1)}s</div>
                    <div class="stat-label">${currentLanguage === 'tr' ? 'Ort. Cevap Süresi' : 'Avg. Response Time'}</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🔥</div>
                    <div class="stat-value">${stats.userData.achievements.streakDays}</div>
                    <div class="stat-label">${currentLanguage === 'tr' ? 'Günlük Seri' : 'Day Streak'}</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-value">${stats.userData.achievements.perfectScores}</div>
                    <div class="stat-label">${currentLanguage === 'tr' ? 'Mükemmel Puanlar' : 'Perfect Scores'}</div>
                </div>
            </div>
            
            ${recentMistakes.length > 0 ? `
                <div class="recent-mistakes">
                    <h4>${currentLanguage === 'tr' ? '⚠️ Son Hatalar' : '⚠️ Recent Mistakes'}</h4>
                    <div class="mistakes-list">
                        ${recentMistakes.map(mistake => {
        const scenario = scenarios.find(s => s.id === mistake.scenarioId);
        const translation = scenarioTranslations[mistake.scenarioId]?.[currentLanguage];
        const title = translation ? translation.title : mistake.scenarioTitle;
        const categoryTranslated = translate(mistake.category);

        const mistakeDate = new Date(mistake.timestamp);
        const now = new Date();
        const diffMs = now - mistakeDate;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);

        let timeAgo = '';
        if (diffMins < 1) {
            timeAgo = currentLanguage === 'tr' ? 'Az önce' : 'Just now';
        } else if (diffMins < 60) {
            timeAgo = currentLanguage === 'tr' ? `${diffMins} dk önce` : `${diffMins} min ago`;
        } else if (diffHours < 24) {
            timeAgo = currentLanguage === 'tr' ? `${diffHours} saat önce` : `${diffHours} hours ago`;
        } else {
            timeAgo = mistakeDate.toLocaleDateString(currentLanguage === 'tr' ? 'tr-TR' : 'en-US',
                { month: 'short', day: 'numeric' });
        }

        return `
                                <div class="mistake-item" onclick="openScenario('${mistake.scenarioId}')">
                                    <div class="mistake-info">
                                        <div class="mistake-title">${title}</div>
                                        <div class="mistake-meta">
                                            <span class="mistake-category">${categoryTranslated}</span>
                                            ${mistake.timedOut ?
                `<span class="mistake-timeout">${currentLanguage === 'tr' ? 'Süre Doldu' : 'Timeout'}</span>` :
                `<span class="mistake-time">${mistake.responseTime.toFixed(1)}s</span>`
            }
                                        </div>
                                    </div>
                                    <div class="mistake-time">${timeAgo}</div>
                                </div>
                            `;
    }).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="user-id-info">
                <small>${currentLanguage === 'tr' ? 'Kullanıcı ID' : 'User ID'}: ${stats.userId}</small>
            </div>
        </div>
    `;

    scoresSection.insertAdjacentHTML('beforeend', statsHTML);
}

function showFullStats() {
    const stats = userTracker.getUserStats();

    let categoryStatsHTML = '';
    for (const [category, catStats] of Object.entries(stats.userData.statistics.categoryStats)) {
        const accuracy = catStats.attempts > 0 ? (catStats.correct / catStats.attempts * 100).toFixed(1) : 0;
        const categoryTranslated = translate(category);

        categoryStatsHTML += `
            <div class="category-stat-row">
                <div class="category-stat-name">${categoryTranslated}</div>
                <div class="category-stat-values">
                    <span>${catStats.correct}/${catStats.attempts}</span>
                    <span class="category-accuracy">${accuracy}%</span>
                </div>
            </div>
        `;
    }

    let categoryCompletionHTML = '';
    for (const [category, completion] of Object.entries(stats.userData.achievements.categoriesCompleted)) {
        const categoryTranslated = translate(category);

        categoryCompletionHTML += `
            <div class="category-completion-row">
                <div class="category-completion-name">${categoryTranslated}</div>
                <div class="category-completion-bar">
                    <div class="completion-bar-fill" style="width: ${completion.percentage}%"></div>
                </div>
                <div class="category-completion-text">${completion.completed}/${completion.total} (${completion.percentage}%)</div>
            </div>
        `;
    }

    const modalHTML = `
        <div class="stats-modal-overlay" id="statsModal" onclick="closeStatsModal(event)">
            <div class="stats-modal-content" onclick="event.stopPropagation()">
                <div class="stats-modal-header">
                    <h2>${currentLanguage === 'tr' ? '📊 Tüm İstatistikler' : '📊 Full Statistics'}</h2>
                    <button onclick="closeStatsModal()" class="close-stats-btn">×</button>
                </div>
                
                <div class="stats-modal-body">
                    <div class="stats-section">
                        <h3>${currentLanguage === 'tr' ? 'Kategori Performansı' : 'Category Performance'}</h3>
                        <div class="category-stats">
                            ${categoryStatsHTML || `<p>${currentLanguage === 'tr' ? 'Henüz veri yok' : 'No data yet'}</p>`}
                        </div>
                    </div>
                    
                    <div class="stats-section">
                        <h3>${currentLanguage === 'tr' ? 'Kategori Tamamlama' : 'Category Completion'}</h3>
                        <div class="category-completion">
                            ${categoryCompletionHTML || `<p>${currentLanguage === 'tr' ? 'Henüz veri yok' : 'No data yet'}</p>`}
                        </div>
                    </div>
                    
                    <div class="stats-section">
                        <h3>${currentLanguage === 'tr' ? 'Genel Bilgiler' : 'General Info'}</h3>
                        <div class="general-info">
                            <p><strong>${currentLanguage === 'tr' ? 'Toplam Deneme:' : 'Total Attempts:'}</strong> ${stats.userData.statistics.totalAttempts}</p>
                            <p><strong>${currentLanguage === 'tr' ? 'Zaman Aşımı:' : 'Timeouts:'}</strong> ${stats.userData.statistics.timeouts}</p>
                            <p><strong>${currentLanguage === 'tr' ? 'Toplam Oturum:' : 'Total Sessions:'}</strong> ${stats.userData.sessions.length}</p>
                            <p><strong>${currentLanguage === 'tr' ? 'Hesap Oluşturma:' : 'Account Created:'}</strong> ${new Date(stats.userData.createdAt).toLocaleDateString(currentLanguage === 'tr' ? 'tr-TR' : 'en-US')}</p>
                            <p><strong>${currentLanguage === 'tr' ? 'Toplam Oyun Süresi:' : 'Total Play Time:'}</strong> ${Math.floor(stats.userData.totalPlayTime / 60000)} ${currentLanguage === 'tr' ? 'dakika' : 'minutes'}</p>
                        </div>
                    </div>
                    
                    <div class="stats-section">
                        <h3>${currentLanguage === 'tr' ? 'Veri Yönetimi' : 'Data Management'}</h3>
                        <div class="data-management">
                            <button onclick="openDataSettings()" class="data-btn primary">
                                ⚙️ ${currentLanguage === 'tr' ? 'Veri Paylaşım Ayarları' : 'Data Sharing Settings'}
                            </button>
                            <button onclick="exportUserData()" class="data-btn">
                                ${currentLanguage === 'tr' ? '📥 Verileri İndir' : '📥 Export Data'}
                            </button>
                            <button onclick="resetUserData()" class="data-btn danger">
                                ${currentLanguage === 'tr' ? '🗑️ Verileri Sıfırla' : '🗑️ Reset Data'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function closeStatsModal(event) {
    if (!event || event.target.classList.contains('stats-modal-overlay')) {
        const modal = document.getElementById('statsModal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    }
}

function exportUserData() {
    const data = userTracker.exportUserData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `traffivid_user_data_${userTracker.userId}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function resetUserData() {
    const confirmMsg = currentLanguage === 'tr'
        ? 'Tüm ilerlemeniz ve istatistikleriniz silinecek. Emin misiniz?'
        : 'All your progress and statistics will be deleted. Are you sure?';

    if (confirm(confirmMsg)) {
        localStorage.removeItem('traffiVidUserData_' + userTracker.userId);
        localStorage.removeItem('traffiVidProgress');
        localStorage.removeItem('traffiVidUserId');
        localStorage.removeItem('traffiVidDataConsent');
        localStorage.removeItem('traffiVidLastSync');

        const successMsg = currentLanguage === 'tr'
            ? 'Veriler başarıyla sıfırlandı. Sayfa yeniden yüklenecek.'
            : 'Data successfully reset. Page will reload.';

        alert(successMsg);
        location.reload();
    }
}

// ===== DATA CONSENT & SYNC =====
function showConsentBanner() {
    // Don't show if already decided
    const consentDecided = localStorage.getItem('traffiVidDataConsent');
    if (consentDecided !== null) return;

    const banner = document.createElement('div');
    banner.id = 'consentBanner';
    banner.className = 'consent-banner';
    banner.innerHTML = `
        <div class="consent-content">
            <div class="consent-icon">🔒</div>
            <div class="consent-text">
                <h4>${currentLanguage === 'tr' ? 'Veri Paylaşımı İzni' : 'Data Sharing Consent'}</h4>
                <p>${currentLanguage === 'tr'
            ? 'Oyun performansınızı ve istatistiklerinizi anonim olarak paylaşmak ister misiniz? Bu, oyunu geliştirmemize yardımcı olur.'
            : 'Would you like to anonymously share your game performance and statistics? This helps us improve the game.'}</p>
                <div class="consent-details">
                    <small>${currentLanguage === 'tr' ? '📊 Paylaşılacak: Puanlar, doğruluk oranı, kategori istatistikleri' : '📊 Shared: Scores, accuracy rate, category statistics'}</small><br>
                    <small>${currentLanguage === 'tr' ? '🔐 Paylaşılmaz: Kişisel bilgiler, IP adresi' : '🔐 Not shared: Personal information, IP address'}</small>
                </div>
            </div>
        </div>
        <div class="consent-actions">
            <button onclick="acceptConsent()" class="consent-btn accept">${currentLanguage === 'tr' ? '✓ Kabul Et' : '✓ Accept'}</button>
            <button onclick="declineConsent()" class="consent-btn decline">${currentLanguage === 'tr' ? '✗ Reddet' : '✗ Decline'}</button>
        </div>
    `;

    document.body.appendChild(banner);

    // Animate in
    setTimeout(() => {
        banner.classList.add('show');
    }, 100);
}

function acceptConsent() {
    dataSharingManager.giveConsent();
    hideConsentBanner();

    // Send initial data
    syncDataToSheets();

    const msg = currentLanguage === 'tr'
        ? '✓ Teşekkürler! Verileriniz güvenli bir şekilde paylaşılacak.'
        : '✓ Thank you! Your data will be shared securely.';
    showNotification(msg, 'success');
}

function declineConsent() {
    localStorage.setItem('traffiVidDataConsent', 'false');
    hideConsentBanner();

    const msg = currentLanguage === 'tr'
        ? 'Verileriniz paylaşılmayacak. İstediğiniz zaman ayarlardan değiştirebilirsiniz.'
        : 'Your data will not be shared. You can change this anytime in settings.';
    showNotification(msg, 'info');
}

function hideConsentBanner() {
    const banner = document.getElementById('consentBanner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 300);
    }
}

async function syncDataToSheets() {
    if (!dataSharingManager.hasConsent()) {
        console.log('Cannot sync: No consent given');
        return;
    }

    const stats = userTracker.getUserStats();
    const accuracyRate = userTracker.getAccuracyRate();

    const result = await dataSharingManager.sendDataToSheets(
        stats.userData,
        { accuracyRate: accuracyRate }
    );

    if (result.success) {
        console.log('Data synced to Google Sheets successfully');
    } else if (result.error !== 'Not configured') {
        console.error('Failed to sync data:', result.error);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function openDataSettings() {
    const hasConsent = dataSharingManager.hasConsent();
    const lastSync = dataSharingManager.getLastSyncTime();

    let lastSyncText = currentLanguage === 'tr' ? 'Hiç senkronize edilmedi' : 'Never synced';
    if (lastSync) {
        const diffMs = new Date() - lastSync;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);

        if (diffMins < 1) {
            lastSyncText = currentLanguage === 'tr' ? 'Az önce' : 'Just now';
        } else if (diffMins < 60) {
            lastSyncText = currentLanguage === 'tr' ? `${diffMins} dakika önce` : `${diffMins} min ago`;
        } else if (diffHours < 24) {
            lastSyncText = currentLanguage === 'tr' ? `${diffHours} saat önce` : `${diffHours} hours ago`;
        } else {
            lastSyncText = lastSync.toLocaleDateString(currentLanguage === 'tr' ? 'tr-TR' : 'en-US');
        }
    }

    const modalHTML = `
        <div class="stats-modal-overlay" id="dataSettingsModal" onclick="closeDataSettings(event)">
            <div class="stats-modal-content" onclick="event.stopPropagation()">
                <div class="stats-modal-header">
                    <h2>${currentLanguage === 'tr' ? '⚙️ Veri Ayarları' : '⚙️ Data Settings'}</h2>
                    <button onclick="closeDataSettings()" class="close-stats-btn">×</button>
                </div>
                
                <div class="stats-modal-body">
                    <div class="stats-section">
                        <h3>${currentLanguage === 'tr' ? 'Veri Paylaşımı' : 'Data Sharing'}</h3>
                        <div class="data-sharing-status">
                            <div class="status-row">
                                <span>${currentLanguage === 'tr' ? 'Durum:' : 'Status:'}</span>
                                <strong class="${hasConsent ? 'status-active' : 'status-inactive'}">
                                    ${hasConsent
            ? (currentLanguage === 'tr' ? '✓ Aktif' : '✓ Active')
            : (currentLanguage === 'tr' ? '✗ Pasif' : '✗ Inactive')
        }
                                </strong>
                            </div>
                            ${hasConsent ? `
                                <div class="status-row">
                                    <span>${currentLanguage === 'tr' ? 'Son Senkronizasyon:' : 'Last Sync:'}</span>
                                    <strong>${lastSyncText}</strong>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="data-actions">
                            ${hasConsent ? `
                                <button onclick="manualSync()" class="data-btn">
                                    🔄 ${currentLanguage === 'tr' ? 'Şimdi Senkronize Et' : 'Sync Now'}
                                </button>
                                <button onclick="revokeConsentConfirm()" class="data-btn danger">
                                    🚫 ${currentLanguage === 'tr' ? 'Paylaşımı Durdur' : 'Stop Sharing'}
                                </button>
                            ` : `
                                <button onclick="enableSharing()" class="data-btn">
                                    ✓ ${currentLanguage === 'tr' ? 'Paylaşımı Başlat' : 'Start Sharing'}
                                </button>
                            `}
                        </div>
                        
                        <div class="data-info">
                            <h4>${currentLanguage === 'tr' ? 'ℹ️ Paylaşılan Veriler' : 'ℹ️ Shared Data'}</h4>
                            <ul>
                                <li>${currentLanguage === 'tr' ? 'Toplam puan ve tamamlanan senaryolar' : 'Total score and completed scenarios'}</li>
                                <li>${currentLanguage === 'tr' ? 'Doğruluk oranı ve istatistikler' : 'Accuracy rate and statistics'}</li>
                                <li>${currentLanguage === 'tr' ? 'Kategori performansları' : 'Category performances'}</li>
                                <li>${currentLanguage === 'tr' ? 'Yapılan hatalar (anonim)' : 'Mistakes made (anonymous)'}</li>
                            </ul>
                            <p><small>${currentLanguage === 'tr'
            ? '🔐 Kişisel bilgileriniz asla paylaşılmaz. Tüm veriler anonim olarak saklanır.'
            : '🔐 Your personal information is never shared. All data is stored anonymously.'}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function closeDataSettings(event) {
    if (!event || event.target.id === 'dataSettingsModal') {
        const modal = document.getElementById('dataSettingsModal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    }
}

async function manualSync() {
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="spinner">⏳</span> ${currentLanguage === 'tr' ? 'Senkronize Ediliyor...' : 'Syncing...'}`;
    btn.disabled = true;

    await syncDataToSheets();

    btn.innerHTML = originalText;
    btn.disabled = false;

    showNotification(
        currentLanguage === 'tr' ? '✓ Veriler senkronize edildi!' : '✓ Data synced!',
        'success'
    );

    // Refresh modal to show updated sync time
    setTimeout(() => {
        closeDataSettings();
        openDataSettings();
    }, 1000);
}

function enableSharing() {
    acceptConsent();
    closeDataSettings();
}

function revokeConsentConfirm() {
    const confirmMsg = currentLanguage === 'tr'
        ? 'Veri paylaşımını durdurmak istediğinize emin misiniz?'
        : 'Are you sure you want to stop data sharing?';

    if (confirm(confirmMsg)) {
        dataSharingManager.revokeConsent();
        showNotification(
            currentLanguage === 'tr' ? '✓ Veri paylaşımı durduruldu' : '✓ Data sharing stopped',
            'info'
        );
        closeDataSettings();
    }
}

// Make functions globally accessible
window.acceptConsent = acceptConsent;
window.declineConsent = declineConsent;
window.openDataSettings = openDataSettings;
window.closeDataSettings = closeDataSettings;
window.manualSync = manualSync;
window.enableSharing = enableSharing;
window.revokeConsentConfirm = revokeConsentConfirm;

// Make functions globally accessible
window.showFullStats = showFullStats;
window.closeStatsModal = closeStatsModal;
window.exportUserData = exportUserData;
window.resetUserData = resetUserData;

// ===== LOCAL STORAGE =====
function saveProgress() {
    localStorage.setItem('traffiVidProgress', JSON.stringify(userProgress));
}

function loadProgress() {
    const saved = localStorage.getItem('traffiVidProgress');
    return saved ? JSON.parse(saved) : null;
}

// ===== MANUAL SYNC FROM SCORES =====
async function manualSyncFromScores() {
    const btn = document.getElementById('syncBtn');
    if (!btn) return;

    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner">⏳</span> ${currentLanguage === 'tr' ? 'Gönderiliyor...' : 'Syncing...'}`;

    await syncDataToSheets();

    btn.innerHTML = `✓ ${currentLanguage === 'tr' ? 'Gönderildi!' : 'Synced!'}`;

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    }, 2000);

    showNotification(
        currentLanguage === 'tr' ? '✓ Veriler başarıyla Google Sheets\'e gönderildi!' : '✓ Data synced to Google Sheets!',
        'success'
    );
}

// Make globally accessible
window.manualSyncFromScores = manualSyncFromScores;

// ===== UTILITY FUNCTIONS =====

// ===== LANGUAGE SYSTEM =====
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('traffiVidLanguage', lang);

    // Update toggle switch position
    const langToggle = document.getElementById('langToggle');
    langToggle.checked = (lang === 'en');

    applyLanguage(lang);

    // Re-render scenarios with new language
    renderScenarios();

    // Update scores with new language
    updateScores();
} function applyLanguage(lang) {
    const t = translations[lang];

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            element.textContent = t[key];
        }
    });

    // Update category headers
    document.querySelectorAll('.category-header h2').forEach((header, index) => {
        const categories = ['Yaya Güvenliği', 'Kavşak ve Dönüşler', 'Hız ve Fren Mesafesi', 'Kurallar ve Dikkat Dağınıklığı', 'Gece Sürüşü'];
        if (categories[index] && t[categories[index]]) {
            header.textContent = t[categories[index]];
        }
    });

    // Update dropdown menu items
    document.querySelectorAll('.dropdown-item').forEach((item, index) => {
        const categories = ['Yaya Güvenliği', 'Kavşak ve Dönüşler', 'Hız ve Fren Mesafesi', 'Kurallar ve Dikkat Dağınıklığı', 'Gece Sürüşü'];
        if (categories[index] && t[categories[index]]) {
            item.textContent = t[categories[index]];
        }
    });

    // Update "View All" links
    document.querySelectorAll('.view-all').forEach(link => {
        link.textContent = t.view_all;
    });

    // Update featured card in hero section
    updateFeaturedCard(lang);
}

function updateFeaturedCard(lang) {
    const featuredScenarioId = 'scenario-1'; // Zebra Çizgisinde Ani Karar
    const scenario = scenarios.find(s => s.id === featuredScenarioId);

    if (!scenario) return;

    // Get translation for this scenario
    const translation = scenarioTranslations[featuredScenarioId]?.[lang];
    const t = translations[lang];

    // Update title
    const featuredTitle = document.querySelector('.featured-card h3');
    if (featuredTitle && translation) {
        featuredTitle.textContent = translation.title;
    }

    // Update category tag
    const categoryTag = document.querySelector('.featured-card .category-tag');
    if (categoryTag && t[scenario.category]) {
        categoryTag.textContent = t[scenario.category];
    }

    // Update difficulty badge
    const difficultyBadge = document.querySelector('.featured-card .difficulty-badge');
    if (difficultyBadge && t[scenario.difficulty]) {
        difficultyBadge.textContent = t[scenario.difficulty];
    }
}

function translate(key) {
    return translations[currentLanguage][key] || key;
}

// ===== CATEGORY VIEW ALL MODAL =====
function openCategoryModal(categoryName) {
    const categoryScenarios = scenarios.filter(s => s.category === categoryName);
    const categoryModal = document.getElementById('categoryModal');
    const categoryModalTitle = document.getElementById('categoryModalTitle');
    const categoryModalCount = document.getElementById('categoryModalCount');
    const categoryModalGrid = document.getElementById('categoryModalGrid');

    // Set header
    categoryModalTitle.textContent = translate(categoryName);
    const totalCount = categoryScenarios.length;
    const completedCount = categoryScenarios.filter(s =>
        userProgress.completedScenarios[s.id]
    ).length;

    const countText = currentLanguage === 'tr'
        ? `${totalCount} senaryo · ${completedCount} tamamlandı`
        : `${totalCount} scenarios · ${completedCount} completed`;
    categoryModalCount.textContent = countText;

    // Render all scenarios in grid
    categoryModalGrid.innerHTML = categoryScenarios.map(scenario => {
        const isLocked = !userProgress.unlockedScenarios.includes(scenario.id);
        const isCompleted = !!userProgress.completedScenarios[scenario.id];

        let statusClass = '';
        let statusText = '';

        if (isCompleted) {
            statusClass = 'completed';
            statusText = `<div class="card-status">${translate('completed')}</div>`;
        } else if (isLocked) {
            statusClass = 'locked';
            statusText = `<div class="card-status">${translate('locked')}</div>`;
        } else {
            statusClass = 'unlocked';
            statusText = `<div class="card-status">${translate('not_started')}</div>`;
        }

        // Get translated title if available
        const scenarioTranslation = scenarioTranslations[scenario.id]?.[currentLanguage];
        const titleText = scenarioTranslation?.title || scenario.title;

        return `
            <div class="scenario-card ${statusClass}" onclick="${isLocked ? '' : `openScenario('${scenario.id}')`}">
                <div class="card-thumbnail">
                    <img src="${scenario.thumbnail}" alt="${titleText}">
                    ${isLocked ? '<div class="lock-icon">🔒</div>' : ''}
                    ${!isLocked ? '<div class="play-icon">▶</div>' : ''}
                </div>
                <div class="card-info">
                    <h3>${titleText}</h3>
                    <div class="card-meta">
                        <span class="difficulty-badge difficulty-${scenario.difficulty}">${translate(scenario.difficulty)}</span>
                        ${userProgress.completedScenarios[scenario.id] ?
                `<span class="score-badge">${userProgress.completedScenarios[scenario.id].score} ${translate('points')}</span>` :
                ''}
                    </div>
                    ${statusText}
                </div>
            </div>
        `;
    }).join('');

    // Show modal
    categoryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== USER ID DISPLAY =====
function updateUserIdDisplay() {
    const userIdElement = document.getElementById('userIdDisplay');
    if (userIdElement && userTracker) {
        userIdElement.textContent = userTracker.userId;
    }
}

// Make openScenario globally accessible for inline onclick
window.openScenario = openScenario;
window.openCategoryModal = openCategoryModal;
