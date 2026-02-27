import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/0047dde1-3e5b-4e39-bcbd-4b74807524f7/files/ed053305-4df3-455a-941d-be8a49b8f5b5.jpg";
const CHAR_IMG = "https://cdn.poehali.dev/projects/0047dde1-3e5b-4e39-bcbd-4b74807524f7/files/4d7a959a-336f-478e-94b5-c9a97174512b.jpg";
const ARENA_IMG = "https://cdn.poehali.dev/projects/0047dde1-3e5b-4e39-bcbd-4b74807524f7/files/dfb6de38-0ea6-4833-8a29-52dbc8d00b31.jpg";

function useIntersection(ref: React.RefObject<Element>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { label: "Обзор", href: "#hero" },
    { label: "Описание", href: "#description" },
    { label: "Скриншоты", href: "#screenshots" },
    { label: "О нас", href: "#about" },
    { label: "Поддержите нас", href: "#support" },
  ];

  const socials = [
    { icon: "Send", label: "Telegram", href: "#" },
    { icon: "MessageCircle", label: "Discord", href: "#" },
    { icon: "Youtube", label: "YouTube", href: "#" },
    { icon: "Music", label: "TikTok", href: "#" },
    { icon: "Globe", label: "VK", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gradient-vh text-white overflow-x-hidden">

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-white/5 py-3" : "py-5 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg animate-glow">
              🏐
            </div>
            <span className="font-display text-xl font-bold tracking-wider">
              VOLLEY<span className="text-gradient">HUB</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-body text-sm text-white/70 hover:text-white transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} title={s.label} className="text-white/40 hover:text-blue-400 transition-colors duration-200">
                  <Icon name={s.icon} size={16} fallback="Globe" />
                </a>
              ))}
            </div>
            <button className="btn-primary-vh px-5 py-2 rounded-full font-body font-medium text-sm">
              Войти
            </button>
          </div>

          <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden glass border-t border-white/5 mt-2 px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="font-body text-white/80 hover:text-white py-1">{item.label}</a>
            ))}
            <div className="flex items-center gap-4 pt-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="text-white/40 hover:text-blue-400 transition-colors">
                  <Icon name={s.icon} size={18} fallback="Globe" />
                </a>
              ))}
            </div>
            <button className="btn-primary-vh px-5 py-2 rounded-full font-body font-medium text-sm w-full">
              Войти
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="VolleyHub Hero" className="w-full h-full object-cover object-center opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050a14] via-[#050a14]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="font-display font-bold text-[18vw] leading-none text-white/[0.03] select-none whitespace-nowrap tracking-widest">
            VOLLEYHUB
          </span>
        </div>

        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 glass-blue px-4 py-2 rounded-full mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="font-body text-xs text-blue-300 tracking-widest uppercase">Открытая бета</span>
            </div>

            <h1 className="font-display font-bold leading-[0.9] mb-6 animate-fade-up delay-200">
              <span className="block text-[clamp(3rem,8vw,7rem)] text-white uppercase tracking-tight">МЫ ВЕРИМ,</span>
              <span className="block text-[clamp(3rem,8vw,7rem)] text-white uppercase tracking-tight">ЧТО СИЛА</span>
              <span className="block text-[clamp(3rem,8vw,7rem)] uppercase tracking-tight text-gradient">ИГРЫ В</span>
              <span className="block text-[clamp(3rem,8vw,7rem)] text-white uppercase tracking-tight">СООБЩЕСТВЕ</span>
            </h1>

            <p className="font-body text-white/60 text-lg leading-relaxed mb-10 max-w-lg animate-fade-up delay-400">
              Каждый игрок — это история. Каждый матч — это шанс стать легендой.
              Присоединяйся к тысячам волейболистов по всему миру.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up delay-500">
              <button className="btn-primary-vh px-8 py-3.5 rounded-full font-display font-semibold text-base tracking-wide flex items-center gap-2">
                <Icon name="Play" size={18} />
                Отслеживать
              </button>
              <button className="btn-outline-vh px-8 py-3.5 rounded-full font-display font-semibold text-base tracking-wide flex items-center gap-2">
                <Icon name="MessageCircle" size={18} />
                Связаться с нами
              </button>
            </div>

            <div className="flex flex-wrap gap-8 mt-16 animate-fade-up delay-600">
              {[
                { val: "10K+", label: "Игроков" },
                { val: "500+", label: "Матчей в день" },
                { val: "4.9★", label: "Рейтинг" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-bold text-3xl text-white">{stat.val}</div>
                  <div className="font-body text-xs text-white/40 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="font-body text-xs text-white/30 tracking-widest uppercase">Scroll</span>
          <Icon name="ChevronDown" size={20} className="text-white/30" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-white/5 py-4 overflow-hidden bg-white/[0.02]">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(8).fill("VOLLEYHUB · ИГРАЙ · ПОБЕЖДАЙ · СОРЕВНУЙСЯ · СОЗДАВАЙ КОМАНДЫ · ").map((t, i) => (
            <span key={i} className="font-display font-bold text-sm tracking-[0.3em] text-white/20 mr-8">{t}</span>
          ))}
        </div>
      </div>

      {/* DESCRIPTION */}
      <section id="description" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ARENA_IMG} alt="Arena" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050a14] via-transparent to-[#050a14]" />
        </div>
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="inline-flex items-center gap-2 glass-blue px-4 py-2 rounded-full mb-6">
                <Icon name="Gamepad2" size={14} className="text-blue-400" />
                <span className="font-body text-xs text-blue-300 tracking-widest uppercase">Игровой процесс</span>
              </div>
              <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] uppercase mb-6">
                <span className="block text-white">ЗАГЛЯНИ В МИР</span>
                <span className="block text-gradient">СПОРТА</span>
              </h2>
              <p className="font-body text-white/60 text-lg leading-relaxed mb-4">
                Играй, получай новый опыт, новых друзей. VolleyHub — многопользовательская
                волейбольная игра нового поколения.
              </p>
              <p className="font-body text-white/50 leading-relaxed mb-8">
                Создавай команды, участвуй в турнирах, прокачивай персонажа.
                Реалистичная механика, захватывающий геймплей и живое сообщество —
                всё это ждёт тебя в VolleyHub.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { icon: "Users", text: "Мультиплеер до 12 игроков" },
                  { icon: "Trophy", text: "Ежемесячные турниры" },
                  { icon: "Zap", text: "Реалистичная физика" },
                  { icon: "Star", text: "Система прокачки" },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-3 glass rounded-xl p-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={f.icon} size={16} className="text-blue-400" fallback="Star" />
                    </div>
                    <span className="font-body text-sm text-white/70">{f.text}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary-vh px-8 py-3.5 rounded-full font-display font-semibold tracking-wide flex items-center gap-2 w-fit">
                <Icon name="Download" size={18} />
                Установить
              </button>
            </AnimSection>

            <AnimSection className="relative">
              <div className="relative rounded-2xl overflow-hidden border-glow">
                <img src={ARENA_IMG} alt="Gameplay" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg">🏐</div>
                      <div>
                        <div className="font-display font-bold text-white text-sm">Матч найден!</div>
                        <div className="font-body text-white/50 text-xs">12 игроков · Арена Москва</div>
                      </div>
                      <div className="ml-auto">
                        <span className="w-2.5 h-2.5 bg-green-400 rounded-full block animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* COMMUNITY / SCREENSHOTS */}
      <section id="screenshots" className="relative py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/8 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <AnimSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass-blue px-4 py-2 rounded-full mb-6">
              <Icon name="MessageSquare" size={14} className="text-blue-400" />
              <span className="font-body text-xs text-blue-300 tracking-widest uppercase">Сообщество</span>
            </div>
            <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-tight">
              <span className="text-white">ВАШЕ СЛОВО — НАШ</span>
              <br />
              <span className="text-gradient">СЛЕДУЮЩИЙ АПДЕЙТ</span>
            </h2>
            <p className="font-body text-white/50 text-lg mt-4 max-w-lg mx-auto">
              Давайте обсудим игру! Каждый фидбэк помогает нам сделать VolleyHub лучше.
            </p>
          </AnimSection>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <AnimSection className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden h-80 border-glow group">
                <img src={CHAR_IMG} alt="Community Character" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="font-display font-bold text-2xl text-white uppercase">Играй и общайся</h3>
                  <p className="font-body text-white/60 text-sm mt-1">Живое сообщество игроков</p>
                </div>
              </div>
            </AnimSection>

            <AnimSection>
              <div className="flex flex-col gap-6 h-80">
                <div className="glass rounded-2xl p-6 flex-1 flex flex-col justify-between border-glow">
                  <div className="font-display font-bold text-5xl text-gradient">10K+</div>
                  <div>
                    <div className="font-display font-semibold text-white text-lg">Активных игроков</div>
                    <div className="font-body text-white/40 text-sm mt-1">в нашем сообществе</div>
                  </div>
                </div>
                <div className="glass-blue rounded-2xl p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Icon name="Send" size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-white">Telegram</div>
                    <div className="font-body text-white/40 text-xs">Присоединиться</div>
                  </div>
                </div>
              </div>
            </AnimSection>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "Mic", title: "Форум игроков", desc: "Обсуждай тактику, делись опытом, находи команду", badge: "Популярное" },
              { icon: "Bell", title: "Анонсы апдейтов", desc: "Первым узнавай о новых фичах и патчах", badge: "Новое" },
              { icon: "Award", title: "Турниры", desc: "Участвуй в официальных и сезонных турнирах", badge: "Скоро" },
            ].map((card) => (
              <AnimSection key={card.title}>
                <div className="glass rounded-2xl p-6 h-full hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 border border-white/5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                      <Icon name={card.icon} size={18} className="text-blue-400" fallback="Star" />
                    </div>
                    <span className="font-body text-xs text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{card.badge}</span>
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg mb-2">{card.title}</h3>
                  <p className="font-body text-white/50 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <AnimSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass-blue px-4 py-2 rounded-full mb-6">
              <Icon name="Users" size={14} className="text-blue-400" />
              <span className="font-body text-xs text-blue-300 tracking-widest uppercase">Команда</span>
            </div>
            <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-tight text-white">
              О НАС
            </h2>
          </AnimSection>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="relative">
                <div className="relative w-72 mx-auto lg:mx-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-2xl blur-xl" />
                  <img
                    src={CHAR_IMG}
                    alt="Никита Петров"
                    className="relative rounded-2xl w-full aspect-[3/4] object-cover border-glow"
                  />
                  <div className="absolute -bottom-4 -right-4 glass-blue rounded-xl px-4 py-3">
                    <div className="font-display font-bold text-white text-sm">Game Director</div>
                    <div className="font-body text-blue-300 text-xs">Singular Games</div>
                  </div>
                </div>
              </div>
            </AnimSection>

            <AnimSection>
              <h3 className="font-display font-bold text-4xl text-white uppercase mb-2">
                Никита Петров
              </h3>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="font-body text-blue-400 text-sm">Game Director</span>
                <span className="text-white/20">·</span>
                <span className="font-body text-white/50 text-sm">Singular Games</span>
              </div>

              <div className="glass rounded-2xl p-6 mb-6 border border-white/5">
                <p className="font-body text-white/70 leading-relaxed text-lg italic">
                  "Мы создаём VolleyHub, потому что верим: спортивные игры должны объединять людей,
                  а не разделять. Каждое обновление — это ваш голос."
                </p>
              </div>

              <p className="font-body text-white/50 leading-relaxed mb-6">
                <strong className="text-white">Singular Games</strong> — независимая команда разработчиков-студентов,
                влюблённых в волейбол и игровую индустрию. Мы строим VolleyHub с нуля, опираясь на
                фидбэк сообщества и реальный опыт игроков.
              </p>

              <div className="flex flex-wrap gap-3">
                {["Геймдизайн", "Backend", "3D Art", "Сообщество"].map((tag) => (
                  <span key={tag} className="glass-blue px-4 py-2 rounded-full font-body text-sm text-blue-300">
                    {tag}
                  </span>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section id="support" className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/8 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <AnimSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass-blue px-4 py-2 rounded-full mb-6">
              <Icon name="Heart" size={14} className="text-blue-400" />
              <span className="font-body text-xs text-blue-300 tracking-widest uppercase">Патронаж</span>
            </div>
            <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-tight">
              <span className="text-white">ПОДДЕРЖКА НАС —</span>
              <br />
              <span className="text-gradient">ДВИЖЕНИЕ</span>
            </h2>
            <p className="font-body text-white/50 text-lg mt-4 max-w-xl mx-auto">
              Помоги нам создать лучшую волейбольную игру. Каждый рубль идёт на развитие VolleyHub.
            </p>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Supporter Pack",
                price: "299 ₽",
                period: "/мес",
                emoji: "🎯",
                color: "from-blue-600/20 to-blue-800/10",
                border: "border-blue-500/20",
                accent: "text-blue-400",
                perks: [
                  "Роль Supporter в Discord",
                  "Доступ к закрытому каналу",
                  "Ранние анонсы",
                  "Ник в списке патронов",
                ],
                popular: false,
              },
              {
                name: "Founder Pack",
                price: "999 ₽",
                period: "/мес",
                emoji: "👑",
                color: "from-purple-600/20 to-blue-600/20",
                border: "border-purple-500/40",
                accent: "text-purple-400",
                perks: [
                  "Роль Founder в Discord",
                  "Ранний доступ к бете",
                  "Эксклюзивный скин игрока",
                  "Голос при разработке",
                  "Ежемесячный Q&A с командой",
                ],
                popular: true,
              },
              {
                name: "Любая сумма",
                price: "Сам решаю",
                period: "",
                emoji: "💫",
                color: "from-white/5 to-white/2",
                border: "border-white/10",
                accent: "text-white",
                perks: [
                  "Роль Donator в Discord",
                  "Спасибо от команды",
                  "Упоминание в патч-ноутах",
                ],
                popular: false,
              },
            ].map((pack) => (
              <AnimSection key={pack.name}>
                <div className={`relative rounded-2xl p-6 border ${pack.border} bg-gradient-to-b ${pack.color} h-full flex flex-col transition-all duration-300 hover:-translate-y-2`}>
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="font-body text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1.5 rounded-full">
                        Популярный
                      </span>
                    </div>
                  )}

                  <div className="text-4xl mb-4">{pack.emoji}</div>
                  <h3 className="font-display font-bold text-xl text-white uppercase mb-2">{pack.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`font-display font-bold text-4xl ${pack.accent}`}>{pack.price}</span>
                    <span className="font-body text-white/40 text-sm">{pack.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pack.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-3 font-body text-sm text-white/70">
                        <Icon name="Check" size={14} className={pack.accent} />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3 rounded-xl font-display font-semibold tracking-wide transition-all duration-300 ${pack.popular ? "btn-primary-vh" : "btn-outline-vh"}`}>
                    Поддержать
                  </button>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg">🏐</div>
                <span className="font-display text-xl font-bold tracking-wider">
                  VOLLEY<span className="text-gradient">HUB</span><span className="text-white/30">.FUN</span>
                </span>
              </div>
              <p className="font-body text-white/40 text-sm leading-relaxed max-w-xs mb-6">
                Многопользовательская волейбольная игра от независимой студии Singular Games.
              </p>
              <div className="flex items-center gap-4">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} title={s.label}
                    className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white/40 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200">
                    <Icon name={s.icon} size={15} fallback="Globe" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Company", links: ["О нас", "Команда", "Карьера", "Блог"] },
              { title: "Product", links: ["Обзор", "Геймплей", "Патч-ноуты", "Дорожная карта"] },
              { title: "Legal", links: ["Конфиденциальность", "Условия использования", "Cookie"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-display font-semibold text-white uppercase tracking-widest text-xs mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="font-body text-sm text-white/40 hover:text-white transition-colors duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-white/25 text-sm">© 2025 VolleyHub.Fun — Singular Games. Все права защищены.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="font-body text-white/25 text-xs hover:text-white/50 transition-colors">Политика конфиденциальности</a>
              <span className="text-white/15">·</span>
              <a href="#" className="font-body text-white/25 text-xs hover:text-white/50 transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
