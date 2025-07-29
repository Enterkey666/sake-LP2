
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "特選純米酒 山田錦", price: 3200, quantity: 1, image: "sake-1" },
    { id: 3, name: "クラフトビール IPA", price: 680, quantity: 2, image: "beer-1" }
  ]);

  const products = [
    { id: 1, name: "特選純米酒 山田錦", price: 3200, category: "日本酒", image: "sake-1" },
    { id: 2, name: "季節限定 桜酒", price: 2800, category: "日本酒", image: "sake-2" },
    { id: 3, name: "クラフトビール IPA", price: 680, category: "ビール", image: "beer-1" },
    { id: 4, name: "プレミアム大吟醸", price: 5800, category: "日本酒", image: "sake-3" },
    { id: 5, name: "季節の地ビール", price: 720, category: "ビール", image: "beer-2" },
    { id: 6, name: "限定醸造 純米吟醸", price: 4200, category: "日本酒", image: "sake-4" },
    { id: 7, name: "フルーツビール", price: 780, category: "ビール", image: "beer-3" },
    { id: 8, name: "古酒 特別純米", price: 6500, category: "日本酒", image: "sake-5" }
  ];

  const categories = [
    { name: "日本酒", subcategories: ["純米酒", "大吟醸", "吟醸酒", "本醸造", "特別純米", "古酒"] },
    { name: "ビール", subcategories: ["クラフトビール", "地ビール", "季節限定", "フルーツビール"] },
    { name: "ギフト", subcategories: ["季節ギフト", "お中元", "お歳暮", "内祝い", "法事用"] },
    { name: "アクセサリー", subcategories: ["酒器", "グラス", "保存用品", "ギフト包装"] }
  ];

  const news = [
    { date: "2024-01-15", title: "新春キャンペーン開始のお知らせ", category: "お知らせ" },
    { date: "2024-01-10", title: "冬季限定商品の販売開始", category: "新商品" },
    { date: "2024-01-05", title: "年始営業時間変更のご案内", category: "営業" },
    { date: "2023-12-28", title: "年末年始休業のお知らせ", category: "お知らせ" },
    { date: "2023-12-20", title: "テレビ番組で当店が紹介されました", category: "メディア" }
  ];

  const slides = [
    {
      image: "https://readdy.ai/api/search-image?query=Japanese%20seasonal%20gift%20collection%20with%20traditional%20sake%20bottles%20and%20craft%20beer%2C%20warm%20ivory%20background%20with%20washi%20paper%20texture%2C%201960s%20aesthetic%2C%20elegant%20product%20display%2C%20seasonal%20flowers%20and%20decorations%2C%20professional%20product%20photography%2C%20warm%20lighting%2C%20nostalgic%20atmosphere&width=1200&height=600&seq=banner-1&orientation=landscape",
      title: "季節のギフト",
      subtitle: "心を込めたおもてなし"
    },
    {
      image: "https://readdy.ai/api/search-image?query=New%20Japanese%20sake%20product%20launch%20banner%20with%20traditional%20bottles%2C%20modern%20minimal%20design%2C%20warm%20ivory%20and%20coral%20colors%2C%201960s%20Showa%20era%20aesthetic%2C%20premium%20product%20photography%2C%20elegant%20typography%2C%20sophisticated%20presentation&width=1200&height=600&seq=banner-2&orientation=landscape",
      title: "新商品入荷",
      subtitle: "伝統の新しい味わい"
    },
    {
      image: "https://readdy.ai/api/search-image?query=Japanese%20craft%20beer%20festival%20banner%20with%20artisanal%20bottles%2C%20vintage%201960s%20style%2C%20warm%20lighting%2C%20traditional%20Japanese%20elements%2C%20celebratory%20atmosphere%2C%20premium%20product%20display%2C%20nostalgic%20warm%20colors&width=1200&height=600&seq=banner-3&orientation=landscape",
      title: "クラフトビールフェア",
      subtitle: "職人の技が光る逸品"
    }
  ];

  const addToCart = (product: { id: number; name: string; price: number; image: string }) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const openSearchModal = () => {
    setIsSearchOpen(true);
    setSearchQuery('');
    setFilteredProducts([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Rice grain pattern overlay */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A574' fill-opacity='0.3'%3E%3Cellipse cx='11' cy='11' rx='2' ry='4' transform='rotate(45 11 11)'/%3E%3Cellipse cx='35' cy='20' rx='2' ry='4' transform='rotate(135 35 20)'/%3E%3Cellipse cx='50' cy='45' rx='2' ry='4' transform='rotate(90 50 45)'/%3E%3C/g%3E%3C/g%3E%3Csvg%3E")`,
        }}
      />

      {/* Header */}
      <header id="header" className="relative z-20 bg-white shadow-md">
        {/* Top Info Bar */}
        <div className="bg-gray-800 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <i className="ri-phone-line w-4 h-4 flex items-center justify-center"></i>
                <span>086-272-5594</span>
              </div>
              <span>営業時間：9:00-18:00（土日祝休）</span>
            </div>
            <div className="text-coral-300">
              新春キャンペーン実施中！送料無料対象商品多数
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="font-pacifico text-3xl text-orange-800 cursor-pointer">
                logo
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                <div className="relative">
                  <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>カテゴリー</span>
                    <i className={`ri-arrow-down-s-line w-4 h-4 flex items-center justify-center transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}></i>
                  </button>

                  {/* Category Dropdown */}
                  {isCategoryOpen && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-30">
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          {categories.map((category, index) => (
                            <div key={index} className="space-y-2">
                              <h4 className="font-semibold text-gray-800 border-b pb-2">
                                {category.name}
                              </h4>
                              <ul className="space-y-1">
                                {category.subcategories.map((sub, subIndex) => (
                                  <li key={subIndex}>
                                    <Link
                                      href={`/category/${sub}`}
                                      className="text-gray-600 hover:text-orange-600 transition-colors cursor-pointer text-sm block py-1"
                                      onClick={() => setIsCategoryOpen(false)}
                                    >
                                      {sub}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Link href="/about" className="text-gray-700 hover:text-orange-600 transition-colors cursor-pointer whitespace-nowrap">
                  会社概要
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-orange-600 transition-colors cursor-pointer whitespace-nowrap">
                  お問い合わせ
                </Link>

                {/* Search Form */}
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <input
                    type="text"
                    placeholder="商品を検索..."
                    className="bg-transparent outline-none text-sm w-48"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      handleSearch(e.target.value);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                  />
                  <button
                    onClick={openSearchModal}
                    className="w-5 h-5 flex items-center justify-center cursor-pointer"
                  >
                    <i className="ri-search-line text-gray-600"></i>
                  </button>
                </div>
              </nav>

              {/* Right Side Icons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-user-line w-5 h-5 flex items-center justify-center"></i>
                  <span className="hidden md:block">ログイン</span>
                </button>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors cursor-pointer whitespace-nowrap relative"
                >
                  <i className="ri-shopping-cart-line w-5 h-5 flex items-center justify-center"></i>
                  <span className="hidden md:block">カート</span>
                  {getCartItemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getCartItemCount()}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  className="lg:hidden w-6 h-6 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <i className="ri-menu-line text-gray-700"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-4">
              <Link href="/categories" className="block text-gray-700 hover:text-orange-600 transition-colors cursor-pointer">
                カテゴリー
              </Link>
              <Link href="/about" className="block text-gray-700 hover:text-orange-600 transition-colors cursor-pointer">
                会社概要
              </Link>
              <Link href="/contact" className="block text-gray-700 hover:text-orange-600 transition-colors cursor-pointer">
                お問い合わせ
              </Link>
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="商品を検索..."
                  className="bg-transparent outline-none text-sm flex-1"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                />
                <button
                  onClick={openSearchModal}
                  className="w-5 h-5 flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-search-line text-gray-600"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-20">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">商品検索</h2>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
                <i className="ri-search-line w-5 h-5 flex items-center justify-center text-gray-600 mr-3"></i>
                <input
                  type="text"
                  placeholder="商品名またはカテゴリーを入力..."
                  className="bg-transparent outline-none flex-1 text-sm"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilteredProducts([]);
                    }}
                    className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    <i className="ri-close-line"></i>
                  </button>
                )}
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {!searchQuery.trim() ? (
                <div className="text-center py-8">
                  <i className="ri-search-line text-gray-300 text-4xl mb-4"></i>
                  <p className="text-gray-500">商品名またはカテゴリーを入力してください</p>
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">人気の検索キーワード</h3>
                    <div className="flex flex-wrap gap-2">
                      {['日本酒', 'クラフトビール', '純米酒', '季節限定', 'ギフト', 'IPA'].map((keyword) => (
                        <button
                          key={keyword}
                          onClick={() => {
                            setSearchQuery(keyword);
                            handleSearch(keyword);
                          }}
                          className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm hover:bg-orange-200 transition-colors cursor-pointer"
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <i className="ri-search-line text-gray-300 text-4xl mb-4"></i>
                  <p className="text-gray-500">「{searchQuery}」に一致する商品が見つかりませんでした</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    {filteredProducts.length}件の商品が見つかりました
                  </p>
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                        setFilteredProducts([]);
                      }}
                    >
                      <img
                        src={`https://readdy.ai/api/search-image?query=Premium Japanese ${product.category === '日本酒' ? 'sake' : 'craft beer'} bottle ${product.name} with elegant label, clean white background, warm lighting, professional product photography, 1960s aesthetic, high quality&width=60&height=60&seq=${product.image}-search&orientation=squarish`}
                        alt={product.name}
                        className="w-12 h-12 object-cover object-top rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm">{product.name}</h4>
                        <p className="text-xs text-gray-500">{product.category}</p>
                        <p className="text-orange-600 font-bold text-sm">¥{product.price.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                          setFilteredProducts([]);
                        }}
                        className="w-8 h-8 flex items-center justify-center bg-orange-100 rounded-full hover:bg-orange-200 transition-colors cursor-pointer"
                      >
                        <i className="ri-shopping-cart-line text-orange-600"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">ログイン</h2>
              <button
                onClick={() => setIsLoginOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  パスワード
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="パスワードを入力"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">ログイン状態を保持</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                  パスワードを忘れた方
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                ログイン
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                アカウントをお持ちでない方は
                <Link href="/register" className="text-orange-600 hover:text-orange-700 cursor-pointer ml-1">
                  新規登録
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close modals */}
      {(isCategoryOpen || isLoginOpen || isCartOpen || isSearchOpen) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => {
            setIsCategoryOpen(false);
            setIsLoginOpen(false);
            setIsCartOpen(false);
            setIsSearchOpen(false);
          }}
        />
      )}

      {/* Hero Carousel */}
      <section className="relative">
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-center">
                  <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl md:text-2xl">{slide.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">カテゴリー</h3>
              <ul className="side-cat space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <div className="flex items-center justify-between cursor-pointer hover:text-orange-600 transition-colors">
                      <span className="font-medium">{category.name}</span>
                      <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
                    </div>
                    <ul className="ml-4 mt-2 space-y-1">
                      {category.subcategories.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <Link href={`/category/${sub}`} className="text-gray-600 hover:text-orange-600 transition-colors cursor-pointer text-sm">
                            {sub}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Search */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">価格で絞り込み</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="最低価格"
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                  <span className="text-gray-500">円</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="最高価格"
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                  <span className="text-gray-500">円</span>
                </div>
                <button className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap">
                  検索
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Pickup Products */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">おすすめ商品</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={`https://readdy.ai/api/search-image?query=Premium Japanese ${product.category === '日本酒' ? 'sake' : 'craft beer'} bottle ${product.name} with elegant label, clean white background, warm lighting, professional product photography, 1960s aesthetic, high quality&width=250&height=250&seq=${product.image}&orientation=squarish`}
                        alt={product.name}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                      <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-orange-600">¥{product.price.toLocaleString()}</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-8 h-8 flex items-center justify-center bg-orange-100 rounded-full hover:bg-orange-200 transition-colors cursor-pointer"
                        >
                          <i className="ri-shopping-cart-line text-orange-600"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* News Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">更新情報</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ul className="news-list space-y-4">
                  {news.map((item, index) => (
                    <li key={index} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                      <time className="text-gray-500 text-sm min-w-[100px]">{item.date}</time>
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs min-w-[60px] text-center">
                        {item.category}
                      </span>
                      <Link href={`/news/${index}`} className="text-gray-800 hover:text-orange-600 transition-colors cursor-pointer">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Topics/Media/Events */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">トピックス・メディア・イベント</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Japanese%20sake%20tasting%20event%20with%20traditional%20setting%2C%20warm%20lighting%2C%20people%20enjoying%20sake%2C%20cultural%20atmosphere%2C%201960s%20aesthetic%2C%20community%20gathering%2C%20warm%20ivory%20and%20coral%20colors&width=300&height=200&seq=event-1&orientation=landscape"
                    alt="試飲イベント"
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-2">2024.01.20</div>
                    <h3 className="font-semibold text-gray-800 mb-2">春の試飲イベント開催</h3>
                    <p className="text-gray-600 text-sm">季節の新商品を実際にお試しいただけるイベントを開催いたします。</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Japanese%20television%20studio%20with%20sake%20bottles%20display%2C%20media%20interview%20setting%2C%20professional%20lighting%2C%20traditional%20Japanese%20elements%2C%20warm%20atmosphere%2C%20broadcasting%20equipment&width=300&height=200&seq=media-1&orientation=landscape"
                    alt="テレビ取材"
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-2">2024.01.15</div>
                    <h3 className="font-semibold text-gray-800 mb-2">テレビ番組で紹介</h3>
                    <p className="text-gray-600 text-sm">地元テレビ局の番組で当店の伝統的な日本酒が紹介されました。</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=Japanese%20sake%20brewery%20collaboration%20event%2C%20traditional%20wooden%20barrels%2C%20craftsmen%20working%2C%20warm%20lighting%2C%20authentic%20atmosphere%2C%201960s%20aesthetic%2C%20cultural%20heritage&width=300&height=200&seq=event-2&orientation=landscape"
                    alt="蔵元コラボ"
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-2">2024.01.10</div>
                    <h3 className="font-semibold text-gray-800 mb-2">蔵元コラボレーション</h3>
                    <p className="text-gray-600 text-sm">地元の老舗蔵元との特別コラボレーション商品が完成しました。</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer id="footer" className="bg-gray-800 text-white mt-20">
        {/* Footer Navigation */}
        <div className="px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="font-pacifico text-2xl mb-6">logo</div>
                <p className="text-gray-400 leading-relaxed">
                  昭和の温かい思い出と共に、伝統的な日本の味わいをお届けします。
                </p>
              </div>

              <div>
                <h5 className="font-semibold mb-4">商品カテゴリー</h5>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/sake" className="hover:text-white transition-colors cursor-pointer">日本酒</Link></li>
                  <li><Link href="/beer" className="hover:text-white transition-colors cursor-pointer">クラフトビール</Link></li>
                  <li><Link href="/seasonal" className="hover:text-white transition-colors cursor-pointer">季節限定</Link></li>
                  <li><Link href="/gift" className="hover:text-white transition-colors cursor-pointer">ギフトセット</Link></li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold mb-4">サポート</h5>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/delivery" className="hover:text-white transition-colors cursor-pointer">配送・送料について</Link></li>
                  <li><Link href="/payment" className="hover:text-white transition-colors cursor-pointer">お支払い方法</Link></li>
                  <li><Link href="/returns" className="hover:text-white transition-colors cursor-pointer">返品・交換</Link></li>
                  <li><Link href="/faq" className="hover:text-white transition-colors cursor-pointer">よくある質問</Link></li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold mb-4">営業カレンダー</h5>
                <table className="text-sm text-gray-400 mb-4">
                  <thead>
                    <tr>
                      <th className="w-8 h-8 text-center">月</th>
                      <th className="w-8 h-8 text-center">火</th>
                      <th className="w-8 h-8 text-center">水</th>
                      <th className="w-8 h-8 text-center">木</th>
                      <th className="w-8 h-8 text-center">金</th>
                      <th className="w-8 h-8 text-center text-red-400">土</th>
                      <th className="w-8 h-8 text-center text-red-400">日</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="w-8 h-8 text-center">1</td>
                      <td className="w-8 h-8 text-center">2</td>
                      <td className="w-8 h-8 text-center">3</td>
                      <td className="w-8 h-8 text-center">4</td>
                      <td className="w-8 h-8 text-center">5</td>
                      <td className="w-8 h-8 text-center text-red-400">6</td>
                      <td className="w-8 h-8 text-center text-red-400">7</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-400">
                  営業時間：9:00-18:00<br />
                  定休日：土・日・祝日
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 px-4 py-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <i className="ri-phone-line w-4 h-4 flex items-center justify-center"></i>
                <span className="text-sm text-gray-400">086-272-5594</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="ri-mail-line w-4 h-4 flex items-center justify-center"></i>
                <span className="text-sm text-gray-400">info@example.com</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer">
                <i className="ri-twitter-fill"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer">
                <i className="ri-instagram-line"></i>
              </button>
            </div>

            <p className="text-gray-400 text-sm"> 2024 昭和の味わい. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                ショッピングカート ({getCartItemCount()})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>

            <div className="p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <i className="ri-shopping-cart-line text-gray-300 text-6xl mb-4"></i>
                  <p className="text-gray-500">カートは空です</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    ショッピングを続ける
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                        <img
                          src={`https://readdy.ai/api/search-image?query=Premium%20Japanese%20${item.name.includes('ビール') ? 'craft%20beer' : 'sake'}%20bottle%20${item.name}%20with%20elegant%20label%2C%20clean%20white%20background%2C%20warm%20lighting%2C%20professional%20product%20photography%2C%201960s%20aesthetic%2C%20high%20quality&width=80&height=80&seq=${item.image}-cart&orientation=squarish`}
                          alt={item.name}
                          className="w-16 h-16 object-cover object-top rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                          <p className="text-orange-600 font-bold">¥{item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <i className="ri-subtract-line"></i>
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <i className="ri-add-line"></i>
                          </button>
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, 0)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-gray-800">合計金額:</span>
                      <span className="font-bold text-xl text-orange-600">
                        ¥{getCartTotal().toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap">
                        レジに進む
                      </button>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        ショッピングを続ける
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}