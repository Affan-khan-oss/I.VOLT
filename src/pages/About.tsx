import { useNav } from '../context/NavigationContext';

export function About() {
  const { navigate } = useNav();

  const milestones = [
    { year: '2009', event: 'I.VOLT founded in Chandigarh with a team of 8 power engineers' },
    { year: '2012', event: 'Launched first proprietary UPS product line; reached 10,000 units sold' },
    { year: '2015', event: 'Expanded to 15 states with authorised service centres' },
    { year: '2018', event: 'Introduced solar product range and pan-India installation network' },
    { year: '2021', event: 'Crossed 50,000 satisfied customers; ISO 9001:2015 certified' },
    { year: '2024', event: 'Present in 28 states, 500+ service centres, 100+ product SKUs' },
  ];

  const values = [
    {
      title: 'Reliability',
      desc: 'Every I.VOLT product is designed to perform when it matters most — during power failures.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Affordability',
      desc: 'Premium technology accessible to every Indian home and small business.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Innovation',
      desc: 'Continuous R&D to bring smart, IoT-enabled power solutions to market first.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Service',
      desc: 'A network of 500+ centres ensures help is always within reach, wherever you are.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
    },
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-[#0B1D3A] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#64748B] text-sm mb-2">
            <button onClick={() => navigate('home')} className="hover:text-[#F5C518] transition-colors">Home</button>
            {' '}/{'  '}About
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            About I.VOLT
          </h1>
          <p className="text-[#94A3B8] max-w-xl">
            15 years of keeping India powered — our story, mission, and commitment to you.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#F5C518]/15 text-[#B8941A] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Our Mission
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1D3A] mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Powering a Brighter India
              </h2>
              <p className="text-[#64748B] leading-relaxed mb-5">
                I.VOLT was born from a simple frustration: India's homes and businesses deserved better protection from power cuts. Founded in 2009 by a team of electrical engineers, we set out to build power solutions that were reliable, affordable, and backed by real service.
              </p>
              <p className="text-[#64748B] leading-relaxed mb-8">
                Today, we are one of India's fastest-growing power solutions brands, with over 50,000 satisfied customers across 28 states. Every product we design carries a single promise: when the power goes out, we keep you running.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {values.slice(0, 2).map((v) => (
                  <div key={v.title} className="bg-[#F7F9FC] rounded-xl p-4 border border-[#E2E8F0]">
                    <div className="flex items-center gap-2 text-[#0B1D3A] mb-2">
                      <div className="text-[#F5C518]">{v.icon}</div>
                      <span className="font-semibold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>{v.title}</span>
                    </div>
                    <p className="text-[#64748B] text-xs leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=700&h=500&fit=crop&auto=format"
                alt="I.VOLT facility"
                className="rounded-2xl w-full object-cover aspect-[4/3] bg-[#F1F5F9]"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#0B1D3A] rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-black text-[#F5C518]" style={{ fontFamily: 'Outfit, sans-serif' }}>15+</div>
                <div className="text-white text-sm font-medium">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1D3A] mb-8 text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#0B1D3A] flex items-center justify-center text-[#F5C518] mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-[#0B1D3A] mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{v.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1D3A] mb-10 text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#E2E8F0]" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex items-start gap-6 relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B1D3A] flex items-center justify-center text-[#F5C518] font-black text-xs shrink-0 relative z-10" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {m.year}
                  </div>
                  <div className="pt-3 pb-6">
                    <p className="text-[#374151] text-sm leading-relaxed">{m.event}</p>
                    {i < milestones.length - 1 && (
                      <div className="mt-6 w-full h-px bg-[#F1F5F9]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facility */}
      <section className="py-16 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1D3A] mb-10 text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Manufacturing & Quality
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: 'ISO 9001:2015 Certified',
                desc: 'Our manufacturing facilities meet international quality management standards.',
                img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=350&fit=crop&auto=format',
              },
              {
                title: 'In-House R&D Lab',
                desc: 'A dedicated team of 30+ engineers continuously improves product performance.',
                img: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500&h=350&fit=crop&auto=format',
              },
              {
                title: '100% Load-Tested',
                desc: 'Every unit is tested at full load before it leaves our factory.',
                img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=350&fit=crop&auto=format',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] hover:shadow-lg transition-all duration-300">
                <div className="aspect-video bg-[#F1F5F9] overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#0B1D3A] mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.title}</h3>
                  <p className="text-[#64748B] text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0B1D3A] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Ready to Work with I.VOLT?
          </h2>
          <p className="text-[#94A3B8] mb-8">Reach out to our team for product enquiries, bulk orders, or partnership opportunities.</p>
          <button
            onClick={() => navigate('contact')}
            className="px-8 py-4 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] font-bold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#F5C518]/20"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
