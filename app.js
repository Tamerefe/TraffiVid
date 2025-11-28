// ===== DATA STRUCTURE =====

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
        'Dikkat Dağınıklığı': 'Dikkat Dağınıklığı',
        'Gece Sürüşü': 'Gece Sürüşü',

        // Outcomes
        correct_choice: 'Doğru Tercih!',
        risky_choice: 'Riskli Tercih!',
        time_up: 'Süre Doldu!',
        time_up_msg: 'Karar vermek için zamanınız doldu.'
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
        'Dikkat Dağınıklığı': 'Distracted Driving',
        'Gece Sürüşü': 'Night Driving',

        // Outcomes
        correct_choice: 'Correct Choice!',
        risky_choice: 'Risky Choice!',
        time_up: 'Time\'s Up!',
        time_up_msg: 'Your time to make a decision has expired.'
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
                { text: 'B) Hız kesmeden devam edip korna çalmak', explanation: 'Riskli tercih! Bu davranış hem trafik kurallarına aykırıdır hem de yayaya çarpma riski taşır. Yaya geçidinde yayanın geçiş hakkı vardır ve sürücü durmalıdır.' },
                { text: 'C) Şerit değiştirerek yayadan kaçınmak', explanation: 'Riskli tercih! Ani şerit değiştirmek diğer araçlarla çarpışma riskini artırır. Doğru olan yaya geçidinin önünde durmaktır.' }
            ]
        },
        en: {
            title: 'Sudden Decision at Crosswalk',
            question: 'A pedestrian suddenly stepped onto the road while you were approaching a crosswalk. What is the safest option as a driver?',
            options: [
                { text: 'A) Make an emergency stop before the crosswalk', explanation: 'Correct choice! According to traffic rules, drivers must yield to pedestrians at or near crosswalks. Emergency braking prevents hitting the pedestrian.' },
                { text: 'B) Continue without slowing down and honk', explanation: 'Risky choice! This behavior violates traffic rules and risks hitting the pedestrian. Pedestrians have the right of way at crosswalks and drivers must stop.' },
                { text: 'C) Change lanes to avoid the pedestrian', explanation: 'Risky choice! Sudden lane changes increase the risk of collision with other vehicles. The correct action is to stop before the crosswalk.' }
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
        videoUrl: '',
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
                text: 'B) Hız kesmeden devam edip korna çalmak',
                correct: false,
                explanation: 'Riskli tercih! Bu davranış hem trafik kurallarına aykırıdır hem de yayaya çarpma riski taşır. Yaya geçidinde yayanın geçiş hakkı vardır ve sürücü durmalıdır.'
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
        thumbnail: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Okul bölgesinde hız sınırı 30 km/s olan bir yolda sürüyorsunuz. Çocuklar kaldırımda oyun oynuyor. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Hızı azaltmak ve dikkatli ilerlemek',
                correct: true,
                explanation: 'Doğru tercih! Okul bölgelerinde hız sınırına uymak ve ekstra dikkatli olmak çocukların güvenliği için kritik öneme sahiptir.'
            },
            {
                id: 'b',
                text: 'B) Hız sınırında gitmek yeterlidir',
                correct: false,
                explanation: 'Riskli tercih! Hız sınırına uymak önemli olsa da çocukların öngörülemez davranışları nedeniyle daha da yavaşlamak güvenliği artırır.'
            }
        ]
    },
    {
        id: 'scenario-3',
        title: 'Park Halindeki Araçlar Arasından Çıkan Yaya',
        category: 'Yaya Güvenliği',
        categoryId: 'yaya-guvenlik',
        difficulty: 'orta',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Dar bir sokakta park halindeki araçlar arasından aniden bir yaya çıktı. En doğru hareket nedir?',
        options: [
            {
                id: 'a',
                text: 'A) Frene basarak durmaya çalışmak',
                correct: true,
                explanation: 'Doğru tercih! Park halindeki araçların olduğu bölgelerde her zaman yaya çıkabileceği ihtimaline karşı hazırlıklı olmalı ve hızınızı ona göre ayarlamalısınız.'
            },
            {
                id: 'b',
                text: 'B) Direksiyon kırarak kaçınmaya çalışmak',
                correct: false,
                explanation: 'Riskli tercih! Ani direksiyon hareketleri karşı şeride geçmenize veya park halindeki araçlara çarpmanıza neden olabilir.'
            }
        ]
    },

    // Kavşak ve Dönüşler
    {
        id: 'scenario-4',
        title: 'Işıksız Kavşakta Öncelik',
        category: 'Kavşak ve Dönüşler',
        categoryId: 'kavsak-donusler',
        difficulty: 'orta',
        locked: false,
        thumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Işıksız bir kavşağa yaklaşıyorsunuz ve sağdan bir araç geliyor. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Sağdan gelen araca yol vermek',
                correct: true,
                explanation: 'Doğru tercih! Türkiye\'de sağdan gelen araç önceliklidir. Bu kuralı bilmek ve uygulamak kaza riskini azaltır.'
            },
            {
                id: 'b',
                text: 'B) Hızlıca geçmeye çalışmak',
                correct: false,
                explanation: 'Riskli tercih! Öncelik kuralını ihlal etmek ciddi kazalara yol açabilir. Sağdan gelen araca her zaman yol verilmelidir.'
            }
        ]
    },
    {
        id: 'scenario-5',
        title: 'Sola Dönüşte Karşıdan Gelen Araç',
        category: 'Kavşak ve Dönüşler',
        categoryId: 'kavsak-donusler',
        difficulty: 'orta',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Yeşil ışıkta sola dönmek istiyorsunuz ancak karşıdan düz giden araçlar var. Nasıl hareket etmelisiniz?',
        options: [
            {
                id: 'a',
                text: 'A) Karşıdan gelen araçların geçmesini beklemek',
                correct: true,
                explanation: 'Doğru tercih! Sola dönerken karşıdan düz gelen veya sağa dönen araçlara yol vermek zorundasınız. Bu kural çarpışmaları önler.'
            },
            {
                id: 'b',
                text: 'B) Hızlıca dönüş yapmak',
                correct: false,
                explanation: 'Riskli tercih! Bu hareket karşıdan gelen araçla çarpışmaya neden olabilir ve sizin hatanız sayılır.'
            }
        ]
    },

    // Hız ve Fren Mesafesi
    {
        id: 'scenario-6',
        title: 'Yağmurlu Havada Fren',
        category: 'Hız ve Fren Mesafesi',
        categoryId: 'hiz-fren',
        difficulty: 'orta',
        locked: false,
        thumbnail: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Yağmurlu havada yolculuk yaparken önünüzdeki araç aniden fren yaptı. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Kademeli olarak fren yapmak',
                correct: true,
                explanation: 'Doğru tercih! Yağmurlu havada yol tutuşu azaldığı için kademeli fren yapmak aracın kontrolünü kaybetmemenizi sağlar ve kayma riskini azaltır.'
            },
            {
                id: 'b',
                text: 'B) Ani ve sert fren yapmak',
                correct: false,
                explanation: 'Riskli tercih! Ani fren yapmak ıslak zeminde tekerlek kilidine ve kaymalara neden olur. Bu durum kazaya yol açabilir.'
            }
        ]
    },
    {
        id: 'scenario-7',
        title: 'Takip Mesafesi İhlali',
        category: 'Hız ve Fren Mesafesi',
        categoryId: 'hiz-fren',
        difficulty: 'kolay',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Otobanda 120 km/s hızla giderken önünüzdeki araç ile aranızda 1 araç boyu mesafe var. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Takip mesafesini artırmak için yavaşlamak',
                correct: true,
                explanation: 'Doğru tercih! Yüksek hızlarda takip mesafesi çok önemlidir. Güvenli mesafe minimum 2-3 saniye olmalıdır.'
            },
            {
                id: 'b',
                text: 'B) Mevcut hızda devam etmek',
                correct: false,
                explanation: 'Riskli tercih! Yetersiz takip mesafesi önünüzdeki araç fren yaptığında size tepki süresi bırakmaz ve zincirleme kazalara yol açabilir.'
            }
        ]
    },
    {
        id: 'scenario-8',
        title: 'Aşırı Hız Virajda',
        category: 'Hız ve Fren Mesafesi',
        categoryId: 'hiz-fren',
        difficulty: 'zor',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Dağ yolunda keskin bir viraja hızlı yaklaştığınızı fark ettiniz. En güvenli hareket nedir?',
        options: [
            {
                id: 'a',
                text: 'A) Virajdan önce yavaşlamak',
                correct: true,
                explanation: 'Doğru tercih! Viraj içinde fren yapmak aracın dengesini bozar. Doğru olan virajdan önce hızı düşürmektir.'
            },
            {
                id: 'b',
                text: 'B) Viraj içinde fren yapmak',
                correct: false,
                explanation: 'Riskli tercih! Viraj içinde fren yapmak ağırlık transferi nedeniyle aracın kontrolünü kaybetmenize ve yoldan çıkmanıza neden olabilir.'
            }
        ]
    },

    // Dikkat Dağınıklığı
    {
        id: 'scenario-9',
        title: 'Telefon Kullanımı',
        category: 'Dikkat Dağınıklığı',
        categoryId: 'dikkat-daginiklik',
        difficulty: 'kolay',
        locked: false,
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Şehir içinde sürüş yaparken telefonunuz çalıyor. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Güvenli bir yere çekip telefonu açmak',
                correct: true,
                explanation: 'Doğru tercih! Sürüş sırasında telefon kullanımı hem yasaktır hem de kazalara neden olur. Güvenli bir yere çekmek en doğru davranıştır.'
            },
            {
                id: 'b',
                text: 'B) Sürüş yaparken ahizesiz telefonu açmak',
                correct: false,
                explanation: 'Riskli tercih! Ahizesiz de olsa telefon konuşması dikkatinizi dağıtır ve kaza riskini artırır.'
            }
        ]
    },
    {
        id: 'scenario-10',
        title: 'Yorgun Sürücü',
        category: 'Dikkat Dağınıklığı',
        categoryId: 'dikkat-daginiklik',
        difficulty: 'orta',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Uzun bir yolculuk sırasında uykulu hissetmeye başladınız. En güvenli hareket nedir?',
        options: [
            {
                id: 'a',
                text: 'A) Dinlenmek için bir molaya çekmek',
                correct: true,
                explanation: 'Doğru tercih! Yorgunluk kazaların en önemli nedenlerinden biridir. Düzenli molalar vermek hayat kurtarır.'
            },
            {
                id: 'b',
                text: 'B) Müzik açarak uyanık kalmaya çalışmak',
                correct: false,
                explanation: 'Riskli tercih! Müzik veya enerji içeceği gibi çözümler geçicidir. Yorgunluğun tek çözümü dinlenmektir.'
            }
        ]
    },

    // Gece Sürüşü
    {
        id: 'scenario-11',
        title: 'Karşıdan Gelen Araç Farları',
        category: 'Gece Sürüşü',
        categoryId: 'gece-surus',
        difficulty: 'kolay',
        locked: false,
        thumbnail: 'https://images.unsplash.com/photo-1519003300449-424ad0405076?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Gece sürüşü sırasında karşıdan gelen araç uzun farla gelmeye devam ediyor ve gözleriniz kamaşıyor. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Yol kenarındaki beyaz çizgiyi takip ederek dikkatli ilerlemek',
                correct: true,
                explanation: 'Doğru tercih! Kamaşma durumunda yol kenarı çizgisini referans almak ve gerekirse yavaşlamak güvenli sürüşün anahtarıdır.'
            },
            {
                id: 'b',
                text: 'B) Karşılık vermek için kendi farlarınızı uzun yakmak',
                correct: false,
                explanation: 'Riskli tercih! Karşılık vermek her iki sürücünün de görüşünü bozar ve kaza riskini artırır. Asla uzun far ile karşılık verilmemelidir.'
            }
        ]
    },
    {
        id: 'scenario-12',
        title: 'Yaban Hayvanı Riski',
        category: 'Gece Sürüşü',
        categoryId: 'gece-surus',
        difficulty: 'zor',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Gece kırsalda sürüş yaparken bir geyik yola atladı. En güvenli hareket nedir?',
        options: [
            {
                id: 'a',
                text: 'A) Düz fren yapıp şeritte kalmaya çalışmak',
                correct: true,
                explanation: 'Doğru tercih! Hayvan çarpması ciddi olsa da şeritten çıkmak veya karşı şeride geçmek çok daha tehlikelidir. Düz fren en güvenli seçenektir.'
            },
            {
                id: 'b',
                text: 'B) Ani direksiyon ile kaçınmaya çalışmak',
                correct: false,
                explanation: 'Riskli tercih! Ani manevra yoldan çıkmanıza veya karşı şeritten gelen araçla çarpışmanıza neden olabilir.'
            }
        ]
    },
    {
        id: 'scenario-13',
        title: 'Çocuk Güvenliği',
        category: 'Yaya Güvenliği',
        categoryId: 'yaya-guvenlik',
        difficulty: 'orta',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Okul çıkışı saatinde okul önünden geçiyorsunuz. Kaldırımda birçok çocuk var. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Hızı azaltıp her an durmaya hazır olmak',
                correct: true,
                explanation: 'Doğru tercih! Çocuklar öngörülemez davranışlar sergileyebilir. Okul bölgelerinde ekstra dikkatli olmak ve hızı düşürmek şarttır.'
            },
            {
                id: 'b',
                text: 'B) Normal hızda devam etmek',
                correct: false,
                explanation: 'Riskli tercih! Çocukların ani hareketlerine karşı tepki süreniz yetersiz kalabilir.'
            }
        ]
    },
    {
        id: 'scenario-14',
        title: 'Yaşlı Yaya Geçişi',
        category: 'Yaya Güvenliği',
        categoryId: 'yaya-guvenlik',
        difficulty: 'kolay',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Yaşlı bir yaya yaya geçidinde yavaş yavaş karşıya geçiyor. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Sabırla beklemek ve acele ettirmemek',
                correct: true,
                explanation: 'Doğru tercih! Yaşlı yayalar daha yavaş hareket eder. Onları acele ettirmek veya stres yaratmak tehlikelidir.'
            },
            {
                id: 'b',
                text: 'B) Korna çalarak acele etmesini sağlamak',
                correct: false,
                explanation: 'Riskli tercih! Korna çalmak yaşlı yayayı korkutabilir ve düşmesine neden olabilir.'
            }
        ]
    },
    {
        id: 'scenario-15',
        title: 'Dönel Kavşak Girişi',
        category: 'Kavşak ve Dönüşler',
        categoryId: 'kavsak-donusler',
        difficulty: 'orta',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Dönel kavşağa girmek istiyorsunuz. Sağdan araç yaklaşıyor. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Dönel kavşaktaki araca yol vermek',
                correct: true,
                explanation: 'Doğru tercih! Dönel kavşaklarda içerideki araçlar önceliklidir. Girmeden önce mutlaka yol vermelisiniz.'
            },
            {
                id: 'b',
                text: 'B) Hızla kavşağa girmek',
                correct: false,
                explanation: 'Riskli tercih! Öncelik kuralını ihlal etmek ciddi çarpışmalara yol açar.'
            }
        ]
    },
    {
        id: 'scenario-16',
        title: 'U Dönüşü Yapma',
        category: 'Kavşak ve Dönüşler',
        categoryId: 'kavsak-donusler',
        difficulty: 'zor',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Yoğun trafikte U dönüşü yapmak istiyorsunuz. En güvenli yöntem nedir?',
        options: [
            {
                id: 'a',
                text: 'A) Her iki yönden de yol açık olduğunda dönüş yapmak',
                correct: true,
                explanation: 'Doğru tercih! U dönüşü riskli bir manevrадыr. Tüm yönlerden gelen trafiği kontrol etmek şarttır.'
            },
            {
                id: 'b',
                text: 'B) Sadece kendi şeridinizdeki trafiği kontrol etmek',
                correct: false,
                explanation: 'Riskli tercih! Karşı şeritten gelen araçları görmezden gelmek ciddi kazalara neden olur.'
            }
        ]
    },
    {
        id: 'scenario-17',
        title: 'Buzlu Yolda Fren',
        category: 'Hız ve Fren Mesafesi',
        categoryId: 'hiz-fren',
        difficulty: 'zor',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Buzlu yolda sürüş yaparken önünüzdeki araç durdu. Nasıl fren yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Kısa kısa fren yaparak (pompalama tekniği)',
                correct: true,
                explanation: 'Doğru tercih! Buzlu yolda pompalama tekniği tekerleklerin kilitlenmesini önler ve kontrolü sürdürmenizi sağlar.'
            },
            {
                id: 'b',
                text: 'B) Ani ve sert fren yaparak',
                correct: false,
                explanation: 'Riskli tercih! Ani fren buzlu yolda tekerlekleri kilitler ve kontrolü tamamen kaybedersiniz.'
            }
        ]
    },
    {
        id: 'scenario-18',
        title: 'Hız Limitinin Üzerinde',
        category: 'Hız ve Fren Mesafesi',
        categoryId: 'hiz-fren',
        difficulty: 'kolay',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Otobanda hız limiti 120 km/s. Arkadan gelen araç farla sinyal veriyor. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Güvenli bir şekilde sağ şeride geçmek',
                correct: true,
                explanation: 'Doğru tercih! Sol şerit sollama şerididir. Sollama yapmıyorsanız sağ şeride geçmelisiniz.'
            },
            {
                id: 'b',
                text: 'B) Hızınızı daha da düşürerek öğüt vermek',
                correct: false,
                explanation: 'Riskli tercih! Bu davranış trafik akışını bozar ve saldırgan sürücü davranışlarını tetikler.'
            }
        ]
    },
    {
        id: 'scenario-19',
        title: 'Yemek Yerken Sürüş',
        category: 'Dikkat Dağınıklığı',
        categoryId: 'dikkat-daginiklik',
        difficulty: 'kolay',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Acele bir toplantıya giderken arabada kahvaltı yapmaya karar verdiniz. Doğru olan nedir?',
        options: [
            {
                id: 'a',
                text: 'A) Güvenli bir yere çekip yemek yemek',
                correct: true,
                explanation: 'Doğru tercih! Sürüş sırasında yemek yemek dikkatinizi önemli ölçüde dağıtır ve kaza riskini artırır.'
            },
            {
                id: 'b',
                text: 'B) Düz yolda dikkatli bir şekilde yemek',
                correct: false,
                explanation: 'Riskli tercih! Düz yol bile olsa elleriniz direksiyonda değildir ve dikkatiniz bölünmüştür.'
            }
        ]
    },
    {
        id: 'scenario-20',
        title: 'Navigasyon Ayarı',
        category: 'Dikkat Dağınıklığı',
        categoryId: 'dikkat-daginiklik',
        difficulty: 'orta',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Sürüş sırasında navigasyon cihazınızın ayarını değiştirmeniz gerekiyor. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Güvenli bir yere çekip ayarları değiştirmek',
                correct: true,
                explanation: 'Doğru tercih! Navigasyon ile uğraşmak gözlerinizin yoldan kaymasına neden olur. Durmak en güvenli seçenektir.'
            },
            {
                id: 'b',
                text: 'B) Kırmızı ışıkta beklerken ayarlamak',
                correct: false,
                explanation: 'Riskli tercih! Işık değiştiğinde hazır olmayabilirsiniz ve arkadan gelebilecek çarpmalara karşı savunmasız kalırsınız.'
            }
        ]
    },
    {
        id: 'scenario-21',
        title: 'Sis Lambası Kullanımı',
        category: 'Gece Sürüşü',
        categoryId: 'gece-surus',
        difficulty: 'orta',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Yoğun siste sürüş yapıyorsunuz. Hangi farları kullanmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Sis farları ve kısa farları',
                correct: true,
                explanation: 'Doğru tercih! Uzun farlar siste yansıma yapar ve görüşü daha da kötüleştirir. Sis farları ve kısa farlar en iyisidir.'
            },
            {
                id: 'b',
                text: 'B) Uzun farları',
                correct: false,
                explanation: 'Riskli tercih! Uzun farlar siste parlak bir perde oluşturur ve hiçbir şey görmezsiniz.'
            }
        ]
    },
    {
        id: 'scenario-22',
        title: 'Kırsal Alanda Gece Sürüşü',
        category: 'Gece Sürüşü',
        categoryId: 'gece-surus',
        difficulty: 'orta',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Aydınlatması olmayan kırsal yolda gece sürüşü yapıyorsunuz. Hızınız ne olmalı?',
        options: [
            {
                id: 'a',
                text: 'A) Farların aydınlattığı mesafede durabilecek hızda',
                correct: true,
                explanation: 'Doğru tercih! Gece görüş mesafeniz sınırlıdır. Farlarınızın aydınlattığı mesafede durabilecek hızda gitmelisiniz.'
            },
            {
                id: 'b',
                text: 'B) Gündüz gittiğiniz hızda',
                correct: false,
                explanation: 'Riskli tercih! Gece görüş mesafeniz çok daha kısadır. Gündüz hızıyla gitmek tehlike algılama sürenizi azaltır.'
            }
        ]
    },
    {
        id: 'scenario-23',
        title: 'Bisikletli ile Yan Yana',
        category: 'Yaya Güvenliği',
        categoryId: 'yaya-guvenlik',
        difficulty: 'orta',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Dar bir yolda önünüzde bisiklet sürücüsü var. Nasıl sollama yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) En az 1.5 metre mesafe bırakarak güvenli sollama yapmak',
                correct: true,
                explanation: 'Doğru tercih! Bisikletliler savunmasızdır. Güvenli mesafe bırakmak ve yavaş sollama yapmak şarttır.'
            },
            {
                id: 'b',
                text: 'B) Yan tarafından hızlıca geçmek',
                correct: false,
                explanation: 'Riskli tercih! Hızlı geçiş bisikletliyi dengesini kaybettirebilir veya çarpabilirsiniz.'
            }
        ]
    },
    {
        id: 'scenario-24',
        title: 'Yeşil Işıkta Yaya',
        category: 'Kavşak ve Dönüşler',
        categoryId: 'kavsak-donusler',
        difficulty: 'kolay',
        locked: true,
        thumbnail: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&h=400&fit=crop',
        videoUrl: '',
        question: 'Yeşil ışıkta sağa dönüyorsunuz ama yaya geçidinde yayalar var. Ne yapmalısınız?',
        options: [
            {
                id: 'a',
                text: 'A) Yayaların geçmesini beklemek',
                correct: true,
                explanation: 'Doğru tercih! Yeşil ışığınız olsa bile yaya geçidindeki yayalara yol vermek zorundasınız.'
            },
            {
                id: 'b',
                text: 'B) Yavaşça arayı bulup geçmek',
                correct: false,
                explanation: 'Riskli tercih! Yayaların güvenliği her zaman önceliktir. Geçişlerini tamamlamalarını beklemelisiniz.'
            }
        ]
    }
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
        const categories = ['Yaya Güvenliği', 'Kavşak ve Dönüşler', 'Hız ve Fren Mesafesi', 'Dikkat Dağınıklığı', 'Gece Sürüşü'];
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

        card.innerHTML = `
            <div class="card-thumbnail">
                <img src="${scenario.thumbnail}" alt="${scenario.title}">
                ${!isUnlocked ? '<div class="lock-icon">🔒</div>' : ''}
            </div>
            <div class="card-info">
                <div class="card-title">${scenario.title}</div>
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
    document.getElementById('scenarioTitle').textContent = currentScenario.title;
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

    // Simulate playing video for 5 seconds
    // In real implementation, you would use actual video
    setTimeout(() => {
        video.pause();
        showQuestion();
    }, 5000);

    // For demo, we'll just show the question after a short delay
    setTimeout(() => {
        showQuestion();
    }, 2000);
}

function showQuestion() {
    document.getElementById('questionOverlay').classList.add('active');
    document.getElementById('questionText').textContent = currentScenario.question;

    // Render options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    currentScenario.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option.text;
        btn.addEventListener('click', () => selectOption(option));
        optionsContainer.appendChild(btn);
    });

    // Start timer
    startTimer();
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
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Hide question overlay
    document.getElementById('questionOverlay').classList.remove('active');

    // Calculate score
    const score = option.correct ? 100 : 0;

    // Update progress
    if (!userProgress.completedScenarios[currentScenario.id] ||
        userProgress.completedScenarios[currentScenario.id].score < score) {

        const previousScore = userProgress.completedScenarios[currentScenario.id]?.score || 0;
        userProgress.completedScenarios[currentScenario.id] = { score };
        userProgress.totalScore = userProgress.totalScore - previousScore + score;

        // Unlock next scenario in same category
        unlockNextScenario();

        saveProgress();
        updateScores();
    }

    // Show outcome
    showOutcome(option, score, timedOut);
}

function unlockNextScenario() {
    const currentIndex = scenarios.findIndex(s => s.id === currentScenario.id);
    const nextScenario = scenarios[currentIndex + 1];

    if (nextScenario && !userProgress.unlockedScenarios.includes(nextScenario.id)) {
        userProgress.unlockedScenarios.push(nextScenario.id);
    }
}

function showOutcome(option, score, timedOut) {
    const outcomeOverlay = document.getElementById('outcomeOverlay');
    const outcomeIcon = document.getElementById('outcomeIcon');
    const outcomeTitle = document.getElementById('outcomeTitle');
    const outcomeExplanation = document.getElementById('outcomeExplanation');
    const outcomeScoreText = document.getElementById('outcomeScoreText');

    if (timedOut) {
        outcomeIcon.textContent = '⏱️';
        outcomeTitle.textContent = translate('time_up');
        outcomeTitle.style.color = 'var(--warning-color)';
        outcomeExplanation.textContent = translate('time_up_msg') + ' ' + option.explanation;
        outcomeScoreText.textContent = `0 ${translate('points')}`;
        outcomeScoreText.style.color = 'var(--danger-color)';
    } else if (option.correct) {
        outcomeIcon.textContent = '✅';
        outcomeTitle.textContent = translate('correct_choice');
        outcomeTitle.style.color = 'var(--success-color)';
        outcomeExplanation.textContent = option.explanation;
        outcomeScoreText.textContent = `+${score} ${translate('points')}`;
        outcomeScoreText.style.color = 'var(--success-color)';
    } else {
        outcomeIcon.textContent = '❌';
        outcomeTitle.textContent = translate('risky_choice');
        outcomeTitle.style.color = 'var(--danger-color)';
        outcomeExplanation.textContent = option.explanation;
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
        // Refresh the page to show updated cards
        location.reload();
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

        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        scoreItem.innerHTML = `
            <div class="score-item-title">${scenario.title}</div>
            <div class="score-item-points">${data.score} ${translate('points')}</div>
        `;
        scoresList.appendChild(scoreItem);
    }
}

// ===== LOCAL STORAGE =====
function saveProgress() {
    localStorage.setItem('traffiVidProgress', JSON.stringify(userProgress));
}

function loadProgress() {
    const saved = localStorage.getItem('traffiVidProgress');
    return saved ? JSON.parse(saved) : null;
}

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
        const categories = ['Yaya Güvenliği', 'Kavşak ve Dönüşler', 'Hız ve Fren Mesafesi', 'Dikkat Dağınıklığı', 'Gece Sürüşü'];
        if (categories[index] && t[categories[index]]) {
            header.textContent = t[categories[index]];
        }
    });

    // Update dropdown menu items
    document.querySelectorAll('.dropdown-item').forEach((item, index) => {
        const categories = ['Yaya Güvenliği', 'Kavşak ve Dönüşler', 'Hız ve Fren Mesafesi', 'Dikkat Dağınıklığı', 'Gece Sürüşü'];
        if (categories[index] && t[categories[index]]) {
            item.textContent = t[categories[index]];
        }
    });

    // Update "View All" links
    document.querySelectorAll('.view-all').forEach(link => {
        link.textContent = t.view_all;
    });
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

        return `
            <div class="scenario-card ${statusClass}" onclick="${isLocked ? '' : `openScenario('${scenario.id}')`}">
                <div class="card-thumbnail">
                    <img src="${scenario.thumbnail}" alt="${scenario.title}">
                    ${isLocked ? '<div class="lock-icon">🔒</div>' : ''}
                    ${!isLocked ? '<div class="play-icon">▶</div>' : ''}
                </div>
                <div class="card-info">
                    <h3>${scenario.title}</h3>
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

// Make openScenario globally accessible for inline onclick
window.openScenario = openScenario;
window.openCategoryModal = openCategoryModal;
