import { useState, useMemo } from 'react';
import { Phone, Clock, MapPin, MessageCircle, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Category = 'الكل' | 'مقبلات' | 'أطباق رئيسية' | 'مشاوي' | 'حلويات' | 'مشروبات';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: Exclude<Category, 'الكل'>;
  description: string;
  emoji: string;
}

// --- Data ---
const MENU_ITEMS: MenuItem[] = [
  // مقبلات
  { id: 1, name: 'سلطة خضراء', price: 35, category: 'مقبلات', description: 'خضروات طازجة متبلة', emoji: '🥗' },
  { id: 2, name: 'حمص بالطحينة', price: 45, category: 'مقبلات', description: 'حمص كريمي بزيت الزيتون', emoji: '🥣' },
  { id: 3, name: 'متبل', price: 40, category: 'مقبلات', description: 'باذنجان مشوي بالطحينة', emoji: '🍆' },
  { id: 4, name: 'ورق عنب', price: 55, category: 'مقبلات', description: 'محشي بخلطة الأرز الشهية', emoji: '🍃' },
  
  // أطباق رئيسية
  { id: 5, name: 'كشري الشيف (بورشن كبير)', price: 65, category: 'أطباق رئيسية', description: 'كشري مصري أصيل', emoji: '🍜' },
  { id: 6, name: 'ملوخية بالأرانب', price: 120, category: 'أطباق رئيسية', description: 'ملوخية خضراء مع أرانب', emoji: '🍲' },
  { id: 7, name: 'فراخ مشوية', price: 145, category: 'أطباق رئيسية', description: 'نصف دجاجة متبلة مشوية', emoji: '🍗' },
  { id: 8, name: 'لحمة بالخلطة السرية', price: 185, category: 'أطباق رئيسية', description: 'قطع لحم طرية بصوص مميز', emoji: '🥩' },
  { id: 9, name: 'سمك مشوي', price: 160, category: 'أطباق رئيسية', description: 'سمك طازج بتتبيلة الشيف', emoji: '🐟' },
  
  // مشاوي
  { id: 10, name: 'كفتة مشوية', price: 95, category: 'مشاوي', description: 'كفتة لحم بلدي مشوية', emoji: '🍢' },
  { id: 11, name: 'شيش طاووق', price: 110, category: 'مشاوي', description: 'قطع دجاج متبلة مشوية', emoji: '🍢' },
  { id: 12, name: 'كباب', price: 130, category: 'مشاوي', description: 'قطع لحم ضأن مشوية', emoji: '🍖' },
  
  // حلويات
  { id: 13, name: 'أم علي', price: 55, category: 'حلويات', description: 'بالقشطة والمكسرات', emoji: '🥣' },
  { id: 14, name: 'كنافة', price: 50, category: 'حلويات', description: 'كنافة بالسمن البلدي', emoji: '🥧' },
  { id: 15, name: 'مهلبية', price: 40, category: 'حلويات', description: 'مهلبية كريمية باردة', emoji: '🍮' },
  
  // مشروبات
  { id: 16, name: 'عصير قصب', price: 25, category: 'مشروبات', description: 'طازج وبارد', emoji: '🥤' },
  { id: 17, name: 'ليمون بالنعناع', price: 30, category: 'مشروبات', description: 'منعش ومثالي', emoji: '🍹' },
  { id: 18, name: 'مياه معدنية', price: 15, category: 'مشروبات', description: 'مياه طبيعية نقية', emoji: '💧' },
  { id: 19, name: 'شاي/قهوة', price: 20, category: 'مشروبات', description: 'مشروبات ساخنة', emoji: '☕' },
];

const CATEGORIES: Category[] = ['الكل', 'مقبلات', 'أطباق رئيسية', 'مشاوي', 'حلويات', 'مشروبات'];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('الكل');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'الكل') return MENU_ITEMS;
    return MENU_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const handleOrder = (itemName: string) => {
    const message = encodeURIComponent(`مرحباً، عايز أطلب ${itemName} من بيت الشيف`);
    window.open(`https://wa.me/201000000000?text=${message}`, '_blank');
  };

  const handleGeneralOrder = () => {
    const message = encodeURIComponent('مرحباً، عايز أطلب من بيت الشيف');
    window.open(`https://wa.me/201000000000?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-cream text-gray-800 font-tajawal selection:bg-brand-orange selection:text-white" dir="rtl">
      
      {/* 1. HEADER */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#92400E] to-[#7F1D1D] text-white py-12 px-6 shadow-xl">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
          >
            بيت الشيف | Chef's House
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-orange-200 mb-8 font-medium"
          >
            أكل بيتي بأيدي محترفة
          </motion.p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/20">
              <Clock size={18} className="text-orange-300" />
              <span>يومياً من 12 ظهراً لـ 12 منتصف الليل</span>
            </div>
            <a 
              href="tel:01000000000"
              className="bg-brand-orange hover:bg-orange-500 transition-colors px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
            >
              <Phone size={18} />
              <span>01000000000</span>
            </a>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl">🥘</div>
          <div className="absolute bottom-10 right-10 text-6xl">🥙</div>
          <div className="absolute top-1/2 right-20 text-4xl">🥗</div>
        </div>
      </header>

      {/* 2. CATEGORY FILTER BAR */}
      <nav className="sticky-nav bg-white/80 backdrop-blur-lg border-b border-orange-100 shadow-sm overflow-x-auto no-scrollbar">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-start md:justify-center gap-3 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-brand-red-dark text-white shadow-md scale-105' 
                  : 'bg-orange-50 text-brand-red-dark hover:bg-orange-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* 3. MENU GRID */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="menu-card bg-white rounded-3xl overflow-hidden border border-orange-50 flex flex-col h-full"
              >
                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-5xl" role="img" aria-label={item.name}>{item.emoji}</span>
                    <span className="bg-brand-green text-white px-4 py-1 rounded-full font-bold text-lg shadow-sm">
                      {item.price} جنيه
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-brand-red-dark">{item.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="px-8 pb-8">
                  <button 
                    onClick={() => handleOrder(item.name)}
                    className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-md active:scale-95"
                  >
                    اطلب دلوقتي
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* 4. SPECIAL OFFER BANNER */}
      <section className="px-6 mb-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-brand-orange to-orange-600 rounded-3xl p-8 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">عرض خاص! 🛵</h2>
            <p className="text-lg md:text-xl opacity-90">اطلب أكتر من 300 جنيه واحصل على توصيل مجاني!</p>
          </div>
          <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 rotate-12">🛵</div>
        </div>
      </section>

      {/* 5. ORDER VIA WHATSAPP SECTION */}
      <section className="bg-white py-16 px-6 border-t border-orange-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-brand-red-dark">اطلب عبر واتساب</h2>
          <button 
            onClick={handleGeneralOrder}
            className="inline-flex items-center gap-4 bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-5 rounded-full text-2xl font-bold transition-all shadow-xl hover:shadow-2xl active:scale-95"
          >
            <MessageCircle size={32} />
            اضغط هنا للطلب
          </button>
          <p className="mt-6 text-gray-500">سيتم تحويلك مباشرة لمحادثة الشيف</p>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-brand-red-dark text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
              <MapPin size={20} className="text-brand-orange" />
              الموقع
            </h4>
            <p className="opacity-80">المعادي، القاهرة</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
              <Phone size={20} className="text-brand-orange" />
              اتصل بنا
            </h4>
            <p className="opacity-80">01000000000</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
              <Clock size={20} className="text-brand-orange" />
              ساعات العمل
            </h4>
            <p className="opacity-80">يومياً من 12 ظهراً لـ 12 منتصف الليل</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 text-center opacity-50 text-sm">
          © {new Date().getFullYear()} بيت الشيف. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
}
