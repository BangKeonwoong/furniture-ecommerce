import Link from "next/link";

const footerLinks = [
  {
    heading: "고객 지원",
    links: [
      { label: "배송 안내", href: "/policies/shipping" },
      { label: "반품 및 교환", href: "/policies/returns" },
      { label: "화이트글러브", href: "/services/white-glove" }
    ]
  },
  {
    heading: "회사",
    links: [
      { label: "브랜드 이야기", href: "/about" },
      { label: "지속가능성", href: "/sustainability" },
      { label: "채용", href: "/careers" }
    ]
  },
  {
    heading: "연결하기",
    links: [
      { label: "무드보드", href: "/stories" },
      { label: "트레이드 프로그램", href: "/trade" },
      { label: "뉴스레터", href: "/newsletter" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-slate-900">Loom & Lattice</p>
            <p className="mt-4 text-sm text-slate-600">
              정직한 소재와 투명한 배송으로 공간을 완성하는 가구를 제안합니다.
            </p>
            <p className="mt-3 text-xs text-slate-400">고객센터 1644-0000 · 평일 09:00-18:00</p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.heading} className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">{section.heading}</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-slate-900">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-slate-400">© {new Date().getFullYear()} Loom & Lattice. All rights reserved.</p>
      </div>
    </footer>
  );
}
