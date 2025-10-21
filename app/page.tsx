import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF5EB]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="font-[family-name:var(--font-quicksand)] text-2xl font-bold text-[#FF9B50]">
                BabyVote
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-[#2D2D2D] hover:text-[#FF9B50] transition-colors font-medium">
                Home
              </Link>
              <Link href="/gallery" className="text-[#2D2D2D] hover:text-[#FF9B50] transition-colors font-medium">
                Gallery
              </Link>
              <Link href="#how-it-works" className="text-[#2D2D2D] hover:text-[#FF9B50] transition-colors font-medium">
                How It Works
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/login"
                className="text-[#2D2D2D] hover:text-[#FF9B50] transition-colors font-semibold"
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="bg-[#FF9B50] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#FF8A3D] transition-all hover:shadow-lg duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF5EB] to-[#FFE5D9] py-12 sm:py-16 lg:py-20">
        {/* Background Flower Illustrations - Add your Freepik flowers here */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {/* Top Left Flower */}
          <Image 
            src="/backgrounds/flower-1.png" 
            alt="" 
            width={300} 
            height={300} 
            className="absolute -top-10 -left-10 w-64 h-64 opacity-60"
            style={{ mixBlendMode: 'multiply' }}
          />
          {/* Top Right Flower */}
          <Image 
            src="/backgrounds/flower-2.png" 
            alt="" 
            width={250} 
            height={250} 
            className="absolute top-20 -right-5 w-56 h-56 opacity-50"
            style={{ mixBlendMode: 'multiply' }}
          />
          {/* Bottom Left Flower */}
          <Image 
            src="/backgrounds/flower-3.png" 
            alt="" 
            width={280} 
            height={280} 
            className="absolute -bottom-10 left-10 w-60 h-60 opacity-40"
            style={{ mixBlendMode: 'multiply' }}
          />
          {/* Center Right Flower */}
          <Image 
            src="/backgrounds/flower-4.png" 
            alt="" 
            width={220} 
            height={220} 
            className="absolute top-1/2 right-10 w-48 h-48 opacity-30"
            style={{ mixBlendMode: 'multiply' }}
          />
          {/* Bottom Right Small Flower */}
          <Image 
            src="/backgrounds/flower-5.png" 
            alt="" 
            width={200} 
            height={200} 
            className="absolute bottom-20 right-1/4 w-44 h-44 opacity-35"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
        
        {/* Decorative Elements */}
        <Image src="/decorations/star.svg" alt="" width={48} height={48} className="absolute top-20 left-10 opacity-60 animate-pulse z-10" />
        <Image src="/decorations/flower.svg" alt="" width={64} height={64} className="absolute top-40 right-20 opacity-50 z-10" />
        <Image src="/decorations/heart.svg" alt="" width={48} height={48} className="absolute bottom-40 left-20 opacity-40 z-10" />
        <Image src="/decorations/sparkle.svg" alt="" width={32} height={32} className="absolute top-60 left-1/4 opacity-50 z-10" />
        <Image src="/decorations/circle.svg" alt="" width={40} height={40} className="absolute bottom-20 right-1/4 opacity-30 z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 relative z-10">
              <div className="space-y-3">
                <h2 className="font-[family-name:var(--font-quicksand)] text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#2D2D2D] leading-tight">
                  Share Your Little
                  <span className="block text-[#FF9B50]">Bundle of Joy</span>
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-[#666666] leading-relaxed max-w-xl">
                  Join our community of proud parents. Upload your baby's photos and let everyone celebrate their cuteness with votes and love.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="#"
                  className="bg-[#FF9B50] text-white px-7 py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-[#FF8A3D] transition-all hover:shadow-lg duration-300 text-center"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="/gallery"
                  className="bg-white text-[#FF9B50] px-7 py-3 rounded-full font-semibold text-sm sm:text-base border-2 border-[#FF9B50] hover:bg-[#FF9B50] hover:text-white transition-all duration-300 text-center"
                >
                  Browse Babies
                </Link>
              </div>
              <div className="flex items-center gap-6 sm:gap-8">
                <div>
                  <p className="font-[family-name:var(--font-quicksand)] text-xl sm:text-2xl lg:text-3xl font-bold text-[#2D2D2D]">1,500+</p>
                  <p className="text-xs text-[#999999] mt-1">Happy Parents</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-quicksand)] text-xl sm:text-2xl lg:text-3xl font-bold text-[#2D2D2D]">5,200+</p>
                  <p className="text-xs text-[#999999] mt-1">Baby Photos</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-quicksand)] text-xl sm:text-2xl lg:text-3xl font-bold text-[#2D2D2D]">50K+</p>
                  <p className="text-xs text-[#999999] mt-1">Votes Cast</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative z-10">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-dashed border-[#FF9B50]">
                <Image
                  src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4"
                  alt="Adorable baby smiling"
                  width={600}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Babies Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <Image src="/decorations/star.svg" alt="" width={48} height={48} className="absolute top-10 right-10 opacity-40" />
        <Image src="/decorations/flower.svg" alt="" width={64} height={64} className="absolute bottom-20 left-10 opacity-30" />
        <Image src="/decorations/heart.svg" alt="" width={48} height={48} className="absolute top-1/2 right-5 opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 relative">
            <Image src="/decorations/sparkle.svg" alt="" width={32} height={32} className="absolute -top-4 left-1/2 -translate-x-20 opacity-60" />
            <Image src="/decorations/sparkle.svg" alt="" width={32} height={32} className="absolute -top-4 right-1/2 translate-x-20 opacity-60" />
            <h3 className="font-[family-name:var(--font-quicksand)] text-4xl font-bold text-[#2D2D2D] mb-4">
              Most Loved Babies
            </h3>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              Meet the adorable stars who captured hearts across our community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Emma Rose",
                age: "8 months",
                votes: 234,
                image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
                borderColor: "#FFB6C1"
              },
              {
                name: "Noah James",
                age: "6 months",
                votes: 198,
                image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
                borderColor: "#A8D8EA"
              },
              {
                name: "Sophia Grace",
                age: "10 months",
                votes: 187,
                image: "https://images.unsplash.com/photo-1500042600524-37ecb686c775",
                borderColor: "#FFE66D"
              },
              {
                name: "Liam Oliver",
                age: "7 months",
                votes: 165,
                image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368",
                borderColor: "#D4C5E8"
              }
            ].map((baby, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative"
                style={{
                  border: `3px dashed ${baby.borderColor}`,
                  borderStyle: 'dashed',
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={baby.image}
                    alt={`Photo of ${baby.name}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-[family-name:var(--font-quicksand)] text-lg font-semibold text-[#2D2D2D] mb-1">
                    {baby.name}
                  </h4>
                  <p className="text-sm text-[#999999] mb-3">{baby.age}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#666666]">{baby.votes} votes</span>
                    <button 
                      className="text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all duration-300"
                      style={{ backgroundColor: baby.borderColor }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/gallery"
              className="inline-block bg-[#FF9B50] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#FF8A3D] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Babies
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#FFF5EB] relative overflow-hidden">
        {/* Decorative Elements */}
        <Image src="/decorations/circle.svg" alt="" width={60} height={60} className="absolute top-10 left-10 opacity-30" />
        <Image src="/decorations/star.svg" alt="" width={48} height={48} className="absolute bottom-10 right-20 opacity-40 animate-pulse" />
        <Image src="/decorations/heart.svg" alt="" width={48} height={48} className="absolute top-20 right-10 opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 relative">
            <Image src="/decorations/flower.svg" alt="" width={64} height={64} className="absolute -top-8 left-1/2 -translate-x-32 opacity-40" />
            <Image src="/decorations/flower.svg" alt="" width={64} height={64} className="absolute -top-8 right-1/2 translate-x-32 opacity-40" />
            <h3 className="font-[family-name:var(--font-quicksand)] text-4xl font-bold text-[#2D2D2D] mb-4">
              How It Works
            </h3>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4 relative">
              <Image src="/decorations/sparkle.svg" alt="" width={24} height={24} className="absolute top-0 right-1/4 opacity-50" />
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-[#FFE5D9] p-6 border-4 border-dashed border-[#FFB6C1]">
                <Image
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74"
                  alt="Sign up illustration"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h4 className="font-[family-name:var(--font-quicksand)] text-2xl font-semibold text-[#2D2D2D]">
                Create Account
              </h4>
              <p className="text-[#666666] leading-relaxed">
                Sign up for free and join our growing community of proud parents and baby enthusiasts
              </p>
            </div>

            <div className="text-center space-y-4 relative">
              <Image src="/decorations/star.svg" alt="" width={24} height={24} className="absolute top-0 left-1/4 opacity-50" />
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-[#B4D7E8] p-6 border-4 border-dashed border-[#A8D8EA]">
                <Image
                  src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9"
                  alt="Upload photo illustration"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h4 className="font-[family-name:var(--font-quicksand)] text-2xl font-semibold text-[#2D2D2D]">
                Upload Photos
              </h4>
              <p className="text-[#666666] leading-relaxed">
                Share your baby's precious moments with beautiful photos and sweet descriptions
              </p>
            </div>

            <div className="text-center space-y-4 relative">
              <Image src="/decorations/heart.svg" alt="" width={24} height={24} className="absolute top-0 right-1/4 opacity-50" />
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-[#FFB6C1] p-6 border-4 border-dashed border-[#FFC0CB]">
                <Image
                  src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4"
                  alt="Get votes illustration"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h4 className="font-[family-name:var(--font-quicksand)] text-2xl font-semibold text-[#2D2D2D]">
                Get Votes
              </h4>
              <p className="text-[#666666] leading-relaxed">
                Watch as the community votes and shows love for your adorable little one
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF9B50] to-[#FF8A3D] relative overflow-hidden">
        {/* Decorative Elements */}
        <Image src="/decorations/star.svg" alt="" width={64} height={64} className="absolute top-10 left-10 opacity-20 animate-pulse" />
        <Image src="/decorations/heart.svg" alt="" width={56} height={56} className="absolute bottom-10 right-10 opacity-20" />
        <Image src="/decorations/sparkle.svg" alt="" width={40} height={40} className="absolute top-20 right-20 opacity-25" />
        <Image src="/decorations/circle.svg" alt="" width={50} height={50} className="absolute bottom-20 left-20 opacity-15" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="font-[family-name:var(--font-quicksand)] text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Share Your Baby's Smile?
          </h3>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of parents showcasing their little ones. Create your free account today and start collecting votes!
          </p>
          <Link 
            href="#"
            className="inline-block bg-white text-[#FF9B50] px-10 py-5 rounded-full font-bold text-lg hover:bg-[#FFF8F0] transition-all hover:shadow-2xl duration-300"
          >
            Start Now - It's Free
          </Link>
        </div>
      </section>

      {/* Recent Uploads Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <Image src="/decorations/flower.svg" alt="" width={64} height={64} className="absolute top-10 left-10 opacity-30" />
        <Image src="/decorations/star.svg" alt="" width={48} height={48} className="absolute bottom-10 right-10 opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="font-[family-name:var(--font-quicksand)] text-4xl font-bold text-[#2D2D2D] mb-4">
              Recently Added
            </h3>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              Fresh faces that just joined our community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { url: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9", color: "#FFB6C1" },
              { url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4", color: "#A8D8EA" },
              { url: "https://images.unsplash.com/photo-1519689373023-dd07c7988603", color: "#FFE66D" },
              { url: "https://images.unsplash.com/photo-1520467259351-30dceb1b8ab1", color: "#D4C5E8" },
              { url: "https://images.unsplash.com/photo-1542180149-d26a4ff8758a", color: "#FFC0CB" },
              { url: "https://images.unsplash.com/photo-1564061170517-d3907caa96ea", color: "#B8E6D5" }
            ].map((item, index) => (
              <div 
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={{
                  border: `3px dashed ${item.color}`,
                  borderStyle: 'dashed',
                }}
              >
                <Image
                  src={item.url}
                  alt={`Recently uploaded baby photo ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D2D2D] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-[family-name:var(--font-quicksand)] text-xl font-bold text-[#FF9B50] mb-4">
                BabyVote
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Celebrating the joy and cuteness of babies from around the world.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">Home</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">Gallery</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">Facebook</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">Instagram</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-[#FF9B50] transition-colors">Twitter</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
            <p>2025 BabyVote. All rights reserved. Made with love for babies everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
