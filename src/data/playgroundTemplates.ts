export interface Template {
  name: string;
  description: string;
  code: string;
}

export const playgroundTemplates: Template[] = [
  {
    name: "Card de Perfil",
    description: "Card moderno com gradiente e foto de perfil",
    code: `<div class="p-8 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl max-w-sm text-center transform hover:scale-105 transition-transform duration-300">
  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop" alt="Foto de Perfil" class="w-24 h-24 rounded-full mx-auto border-4 border-white/40 shadow-lg" />
  <h3 class="text-2xl font-extrabold mt-4">Mariana Silva</h3>
  <p class="text-white/80 text-sm font-medium">Desenvolvedora Front-End</p>
  <p class="mt-3 text-white/90 text-xs leading-relaxed">Apaixonada por criar interfaces interativas, limpas e acessíveis usando HTML5, CSS3 e Tailwind.</p>
  <div class="mt-6 flex justify-center gap-3">
    <a href="#" class="px-4 py-2 bg-white text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors">Seguir</a>
    <a href="#" class="px-4 py-2 bg-white/20 text-white rounded-xl text-xs font-bold hover:bg-white/30 transition-colors">Mensagem</a>
  </div>
</div>`
  },
  {
    name: "Formulário de Login",
    description: "Formulário de login limpo e responsivo",
    code: `<form class="w-full max-w-sm p-8 bg-white rounded-3xl border border-slate-100 shadow-xl space-y-5" onsubmit="alert('Login efetuado!'); return false;">
  <div class="text-center space-y-1">
    <h3 class="text-2xl font-bold text-slate-800">Bem-vindo de volta</h3>
    <p class="text-xs text-slate-400">Insira suas credenciais para acessar sua conta</p>
  </div>
  <div class="space-y-4">
    <div>
      <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">E-mail</label>
      <input type="email" placeholder="seu-email@exemplo.com" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
    </div>
    <div>
      <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Senha</label>
      <input type="password" placeholder="••••••••" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
    </div>
  </div>
  <button type="submit" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm">
    Entrar na Conta
  </button>
</form>`
  },
  {
    name: "Tabela de Preços",
    description: "Card de precificação de plano profissional",
    code: `<div class="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl max-w-sm space-y-6 relative overflow-hidden">
  <div class="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">Popular</div>
  <div class="space-y-2">
    <h4 class="text-lg font-bold text-slate-800">Plano Pro</h4>
    <p class="text-xs text-slate-400">Ideal para desenvolvedores e criadores individuais</p>
  </div>
  <div class="flex items-baseline gap-1">
    <span class="text-4xl font-black text-slate-800">R$ 49</span>
    <span class="text-xs text-slate-400">/mês</span>
  </div>
  <ul class="space-y-3 text-sm text-slate-600">
    <li class="flex items-center gap-2">
      <span class="text-emerald-500 font-bold">✓</span> Acesso ilimitado a todas as tags
    </li>
    <li class="flex items-center gap-2">
      <span class="text-emerald-500 font-bold">✓</span> Assistente de IA avançado
    </li>
    <li class="flex items-center gap-2">
      <span class="text-emerald-500 font-bold">✓</span> Suporte prioritário 24/7
    </li>
  </ul>
  <button class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm">
    Assinar Agora
  </button>
</div>`
  }
];