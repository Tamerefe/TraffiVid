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
        'Kurallar ve Dikkat Dağınıklığı': 'Kurallar ve Dikkat Dağınıklığı',
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
        'Kurallar ve Dikkat Dağınıklığı': 'Rules & Distracted Driving',
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
    {
        id: 'scenario-25',
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

    // Kurallar ve Dikkat Dağınıklığı
    {
        id: 'scenario-9',
        title: 'Telefon Kullanımı',
        category: 'Kurallar ve Dikkat Dağınıklığı',
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
        category: 'Kurallar ve Dikkat Dağınıklığı',
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
        category: 'Kurallar ve Dikkat Dağınıklığı',
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
        category: 'Kurallar ve Dikkat Dağınıklığı',
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

    // Set video source if available
    if (currentScenario.videoUrl) {
        video.src = currentScenario.videoUrl;
        video.load();
        video.play();

        // When video ends, show question
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

    // If wrong option has a fail video, play it first
    if (!option.correct && option.failVideo) {
        const video = document.getElementById('scenarioVideo');
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
