"use client"

import { useState, useEffect } from "react"
import {
  User,
  Camera,
  Globe,
  Shield,
  Bell,
  Lock,
  Eye,
  Key,
  Trash2,
  LogOut,
  Check,
  Settings,
  HelpCircle,
  Download,
  Moon,
  Sun,
  ArrowLeft,
} from "lucide-react"

const LightTravelSettings = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [darkMode, setDarkMode] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isAnimating, setIsAnimating] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Digital nomad and travel photographer. Exploring the world one destination at a time ✈️",
    website: "https://johndoe.com",
    location: "New York, NY",
    birthDate: "1990-05-15",
  })

  const [settings, setSettings] = useState({
    notifications: {
      likes: true,
      comments: true,
      follows: true,
      messages: true,
      posts: false,
      stories: true,
      sounds: true,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
      allowTagging: true,
      allowComments: "everyone",
      showOnlineStatus: true,
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      passwordChanged: "2023-10-15",
    },
  })

  const [verificationRequest, setVerificationRequest] = useState({
    submitted: false,
    status: "pending",
    reason: "",
  })

  // Language translations
  const translations = {
    en: {
      settings: "Settings",
      profile: "Profile",
      language: "Language",
      verification: "Verification",
      notifications: "Notifications",
      privacy: "Privacy",
      security: "Security",
      account: "Account",
      logout: "Logout",
      editProfile: "Edit Profile",
      firstName: "First Name",
      lastName: "Last Name",
      username: "Username",
      email: "Email",
      phone: "Phone",
      website: "Website",
      location: "Location",
      bio: "Bio",
      saveChanges: "Save Changes",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      backToApp: "Back to App",
    },
    es: {
      settings: "Configuración",
      profile: "Perfil",
      language: "Idioma",
      verification: "Verificación",
      notifications: "Notificaciones",
      privacy: "Privacidad",
      security: "Seguridad",
      account: "Cuenta",
      logout: "Cerrar Sesión",
      editProfile: "Editar Perfil",
      firstName: "Nombre",
      lastName: "Apellido",
      username: "Usuario",
      email: "Correo",
      phone: "Teléfono",
      website: "Sitio Web",
      location: "Ubicación",
      bio: "Biografía",
      saveChanges: "Guardar Cambios",
      darkMode: "Modo Oscuro",
      lightMode: "Modo Claro",
      backToApp: "Volver a la App",
    },
    fr: {
      settings: "Paramètres",
      profile: "Profil",
      language: "Langue",
      verification: "Vérification",
      notifications: "Notifications",
      privacy: "Confidentialité",
      security: "Sécurité",
      account: "Compte",
      logout: "Déconnexion",
      editProfile: "Modifier le Profil",
      firstName: "Prénom",
      lastName: "Nom",
      username: "Nom d'utilisateur",
      email: "Email",
      phone: "Téléphone",
      website: "Site Web",
      location: "Localisation",
      bio: "Biographie",
      saveChanges: "Sauvegarder",
      darkMode: "Mode Sombre",
      lightMode: "Mode Clair",
      backToApp: "Retour à l'App",
    },
  }

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ]

  // Get current translation
  const t = translations[currentLanguage] || translations.en

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleTabChange = (tabId) => {
    setIsAnimating(true)
    setTimeout(() => {
      setActiveTab(tabId)
      setIsAnimating(false)
    }, 150)
  }

  const handleProfileUpdate = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSettingUpdate = (category, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }))
  }

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode)
    console.log(`Language changed to: ${langCode}`)
  }

  const handleThemeToggle = () => {
    setDarkMode(!darkMode)
    console.log(`Theme changed to: ${!darkMode ? "dark" : "light"}`)
  }

  const handleVerificationSubmit = () => {
    setVerificationRequest((prev) => ({ ...prev, submitted: true, status: "pending" }))
    alert("Verification request submitted!")
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      console.log("Logging out...")
    }
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Account deletion initiated...")
    }
  }

  const handleBack = () => {
    console.log("Navigating back to app...")
  }

  const tabs = [
    { id: "profile", name: t.profile, icon: User },
    { id: "language", name: t.language, icon: Globe },
    { id: "verification", name: t.verification, icon: Shield },
    { id: "notifications", name: t.notifications, icon: Bell },
    { id: "privacy", name: t.privacy, icon: Lock },
    { id: "security", name: t.security, icon: Key },
    { id: "account", name: t.account, icon: Settings },
  ]

  const Toggle = ({ enabled, onChange, size = "default" }) => {
    return (
      <button
        onClick={onChange}
        className={`relative inline-flex items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#52b788]/30 focus:ring-offset-2 ${
          size === "large" ? "h-6 w-11" : "h-5 w-9"
        } ${enabled ? "bg-[#52b788]" : "bg-gray-200 dark:bg-gray-600"}`}
      >
        <span
          className={`inline-block transform rounded-full bg-white shadow transition-all duration-300 ${
            size === "large" ? "h-4 w-4" : "h-3 w-3"
          } ${enabled ? (size === "large" ? "translate-x-6" : "translate-x-5") : "translate-x-1"}`}
        />
      </button>
    )
  }

  return (
    <div className={`h-screen flex flex-col transition-all duration-500 ${darkMode ? "dark bg-gray-50" : "bg-white"}`}>
      {/* Fixed Header */}
      <div className="flex-none bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium"></span>
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{t.settings}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your preferences</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleThemeToggle}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{darkMode ? t.lightMode : t.darkMode}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>{t.logout}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area with sidebar and scrollable content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="max-w-6xl mx-auto w-full flex">
          <div className="px-6 py-12 w-full flex gap-12">
            {/* Fixed Sidebar */}
            <div className="flex-none w-64">
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800 p-2 sticky top-6">
                <nav className="space-y-1">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-gray-50 dark:bg-gray-800 text-[#2d6a4f] dark:text-[#52b788]"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-25 dark:hover:bg-gray-800/50"
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: "fadeIn 0.4s ease-out forwards",
                      }}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Scrollable Main Content */}
            <div className="flex-1 overflow-y-auto max-h-screen">
              <div className="pr-6">
                <div
                  className={`bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800 transition-all duration-300 ${
                    isAnimating ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {/* Profile Tab */}
                  {activeTab === "profile" && (
                    <div className="p-8 animate-fadeIn">
                      <div className="mb-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.editProfile}</h2>
                        <p className="text-gray-500 dark:text-gray-400">Update your personal information</p>
                      </div>

                      {/* Simple Profile Picture */}
                      <div className="flex items-start space-x-6 mb-12 pb-8 border-b border-gray-100 dark:border-gray-800">
                        <div className="relative">
                          <div className="w-16 h-16 bg-[#52b788] rounded-full flex items-center justify-center">
                            <span className="text-lg font-medium text-white">
                              {profileData.firstName.charAt(0)}
                              {profileData.lastName.charAt(0)}
                            </span>
                          </div>
                          <button className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-900 p-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:border-[#52b788] transition-colors">
                            <Camera className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                          </button>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-1">Profile Photo</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">JPG, GIF or PNG. 1MB max.</p>
                          <div className="flex space-x-3">
                            <button className="bg-[#52b788] text-white px-4 py-2 rounded-lg hover:bg-[#2d6a4f] transition-colors text-sm font-medium">
                              Upload
                            </button>
                            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 px-4 py-2 text-sm font-medium transition-colors">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Clean Form */}
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {[
                            { key: "firstName", label: t.firstName, type: "text" },
                            { key: "lastName", label: t.lastName, type: "text" },
                            { key: "username", label: t.username, type: "text" },
                            { key: "email", label: t.email, type: "email" },
                            { key: "phone", label: t.phone, type: "tel" },
                            { key: "website", label: t.website, type: "url" },
                            { key: "location", label: t.location, type: "text" },
                            { key: "birthDate", label: "Birth Date", type: "date" },
                          ].map((field, index) => (
                            <div
                              key={field.key}
                              className="animate-slideUp"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {field.label}
                              </label>
                              <input
                                type={field.type}
                                value={profileData[field.key]}
                                onChange={(e) => handleProfileUpdate(field.key, e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#52b788]/20 focus:border-[#52b788] transition-all duration-200"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="animate-slideUp" style={{ animationDelay: "400ms" }}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.bio}
                          </label>
                          <textarea
                            value={profileData.bio}
                            onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#52b788]/20 focus:border-[#52b788] transition-all duration-200 resize-none"
                            placeholder="Tell us about yourself..."
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{profileData.bio.length}/150</p>
                        </div>
                      </div>

                      <div className="flex justify-end mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                        <button className="bg-[#52b788] text-white px-6 py-3 rounded-lg hover:bg-[#2d6a4f] transition-colors font-medium">
                          {t.saveChanges}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Language Tab */}
                  {activeTab === "language" && (
                    <div className="p-8 animate-fadeIn">
                      <div className="mb-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.language}</h2>
                        <p className="text-gray-500 dark:text-gray-400">Choose your preferred language</p>
                      </div>

                      <div className="space-y-12">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-6">Display Language</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {languages.map((lang, index) => (
                              <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 animate-slideUp ${
                                  currentLanguage === lang.code
                                    ? "border-[#52b788] bg-[#52b788]/5"
                                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                                }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <span className="text-xl">{lang.flag}</span>
                                <div className="text-left flex-1">
                                  <p className="font-medium text-gray-900 dark:text-white">{lang.name}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{lang.code.toUpperCase()}</p>
                                </div>
                                {currentLanguage === lang.code && <Check className="w-4 h-4 text-[#52b788]" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="animate-slideUp" style={{ animationDelay: "400ms" }}>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-6">Appearance</h3>
                          <div className="flex items-center justify-between p-6 border border-gray-100 dark:border-gray-800 rounded-lg">
                            <div className="flex items-center space-x-4">
                              {darkMode ? (
                                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              ) : (
                                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              )}
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {darkMode ? t.darkMode : t.lightMode}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {darkMode ? "Dark theme is active" : "Light theme is active"}
                                </p>
                              </div>
                            </div>
                            <Toggle enabled={darkMode} onChange={handleThemeToggle} size="large" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Verification Tab */}
                  {activeTab === "verification" && (
                    <div className="p-8 animate-fadeIn">
                      <div className="mb-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Account Verification
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">Get verified to increase your credibility</p>
                      </div>

                      {!verificationRequest.submitted ? (
                        <div className="space-y-12">
                          <div className="bg-[#52b788]/5 border border-[#52b788]/20 rounded-lg p-6 animate-slideUp">
                            <div className="flex items-start space-x-4">
                              <Shield className="w-6 h-6 text-[#52b788] mt-1" />
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Get Verified Badge</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                  Verified accounts get a blue checkmark and increased visibility across the platform.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="animate-slideUp" style={{ animationDelay: "100ms" }}>
                            <h3 className="font-medium text-gray-900 dark:text-white mb-6">Requirements</h3>
                            <div className="space-y-3">
                              {[
                                { text: "Complete profile with real name and photo", completed: true },
                                { text: "Active account for at least 30 days", completed: true },
                                { text: "Minimum 1,000 followers", completed: true },
                                { text: "Government-issued ID verification", completed: false },
                                { text: "Notable presence in your field", completed: true },
                              ].map((req, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800"
                                >
                                  <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                      req.completed ? "bg-[#52b788]" : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                                  >
                                    {req.completed && <Check className="w-3 h-3 text-white" />}
                                  </div>
                                  <span className="text-sm text-gray-700 dark:text-gray-300">{req.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="animate-slideUp" style={{ animationDelay: "200ms" }}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                              Why should you be verified?
                            </label>
                            <textarea
                              value={verificationRequest.reason}
                              onChange={(e) => setVerificationRequest((prev) => ({ ...prev, reason: e.target.value }))}
                              rows={4}
                              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#52b788]/20 focus:border-[#52b788] transition-all duration-200 resize-none"
                              placeholder="Explain why your account should be verified..."
                            />
                          </div>

                          <button
                            onClick={handleVerificationSubmit}
                            className="w-full bg-[#52b788] text-white py-3 rounded-lg hover:bg-[#2d6a4f] transition-colors font-medium animate-slideUp"
                            style={{ animationDelay: "300ms" }}
                          >
                            Submit Verification Request
                          </button>
                        </div>
                      ) : (
                        <div className="text-center py-16 animate-fadeIn">
                          <div className="w-16 h-16 bg-[#52b788]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-8 h-8 text-[#52b788]" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Request Submitted</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                            Your verification request is being reviewed. We'll notify you within 3-5 business days.
                          </p>
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800">
                            Status: Under Review
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === "notifications" && (
                    <div className="p-8 animate-fadeIn">
                      <div className="mb-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.notifications}</h2>
                        <p className="text-gray-500 dark:text-gray-400">Manage your notification preferences</p>
                      </div>

                      <div className="space-y-12">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-6">Push Notifications</h3>
                          <div className="space-y-4">
                            {[
                              { key: "likes", label: "Likes on your posts", desc: "When someone likes your content" },
                              { key: "comments", label: "Comments", desc: "New comments on your posts" },
                              { key: "follows", label: "New followers", desc: "When someone follows you" },
                              { key: "messages", label: "Direct messages", desc: "New private messages" },
                              { key: "posts", label: "Posts from following", desc: "New posts from people you follow" },
                              { key: "stories", label: "Story updates", desc: "New stories from friends" },
                            ].map((notification, index) => (
                              <div
                                key={notification.key}
                                className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg animate-slideUp"
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">{notification.label}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{notification.desc}</p>
                                </div>
                                <Toggle
                                  enabled={settings.notifications[notification.key]}
                                  onChange={() =>
                                    handleSettingUpdate(
                                      "notifications",
                                      notification.key,
                                      !settings.notifications[notification.key],
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="animate-slideUp" style={{ animationDelay: "300ms" }}>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-6">Sound</h3>
                          <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Notification Sounds</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Play sounds for notifications</p>
                            </div>
                            <Toggle
                              enabled={settings.notifications.sounds}
                              onChange={() =>
                                handleSettingUpdate("notifications", "sounds", !settings.notifications.sounds)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy Tab */}
                  {activeTab === "privacy" && (
                    <div className="p-8 animate-fadeIn">
                      <div className="mb-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.privacy}</h2>
                        <p className="text-gray-500 dark:text-gray-400">Control who can see your content</p>
                      </div>

                      <div className="space-y-12">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-6">Account Privacy</h3>
                          <div className="space-y-6">
                            <div className="animate-slideUp">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Profile Visibility
                              </label>
                              <select
                                value={settings.privacy.profileVisibility}
                                onChange={(e) => handleSettingUpdate("privacy", "profileVisibility", e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#52b788]/20 focus:border-[#52b788] transition-all duration-200"
                              >
                                <option value="public">Public - Anyone can see your profile</option>
                                <option value="private">Private - Only followers can see your posts</option>
                                <option value="friends">Friends Only - Only friends can see everything</option>
                              </select>
                            </div>

                            <div className="animate-slideUp" style={{ animationDelay: "100ms" }}>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Who can comment
                              </label>
                              <select
                                value={settings.privacy.allowComments}
                                onChange={(e) => handleSettingUpdate("privacy", "allowComments", e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#52b788]/20 focus:border-[#52b788] transition-all duration-200"
                              >
                                <option value="everyone">Everyone</option>
                                <option value="followers">People you follow</option>
                                <option value="friends">Friends only</option>
                                <option value="none">No one</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-6">Contact Information</h3>
                          <div className="space-y-4">
                            {[
                              { key: "showEmail", label: "Show email address on profile" },
                              { key: "showPhone", label: "Show phone number on profile" },
                              { key: "allowTagging", label: "Allow others to tag you in posts" },
                              { key: "showOnlineStatus", label: "Show when you're online" },
                            ].map((setting, index) => (
                              <div
                                key={setting.key}
                                className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg animate-slideUp"
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <span className="font-medium text-gray-900 dark:text-white">{setting.label}</span>
                                <Toggle
                                  enabled={settings.privacy[setting.key]}
                                  onChange={() =>
                                    handleSettingUpdate("privacy", setting.key, !settings.privacy[setting.key])
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Tab */}
                  {activeTab === "security" && (
                    <div className="p-8 animate-fadeIn">
                      <div className="mb-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.security}</h2>
                        <p className="text-gray-500 dark:text-gray-400">Keep your account secure</p>
                      </div>

                      <div className="space-y-12">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-6">Authentication</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-6 border border-gray-100 dark:border-gray-800 rounded-lg animate-slideUp">
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Password</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Last changed: {settings.security.passwordChanged}
                                </p>
                              </div>
                              <button className="bg-[#52b788] text-white px-4 py-2 rounded-lg hover:bg-[#2d6a4f] transition-colors text-sm font-medium">
                                Change
                              </button>
                            </div>

                            <div
                              className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg animate-slideUp"
                              style={{ animationDelay: "100ms" }}
                            >
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Add extra security to your account
                                </p>
                              </div>
                              <Toggle
                                enabled={settings.security.twoFactorAuth}
                                onChange={() =>
                                  handleSettingUpdate("security", "twoFactorAuth", !settings.security.twoFactorAuth)
                                }
                              />
                            </div>

                            <div
                              className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg animate-slideUp"
                              style={{ animationDelay: "200ms" }}
                            >
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Login Alerts</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Get notified of new login attempts
                                </p>
                              </div>
                              <Toggle
                                enabled={settings.security.loginAlerts}
                                onChange={() =>
                                  handleSettingUpdate("security", "loginAlerts", !settings.security.loginAlerts)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-6">Active Sessions</h3>
                          <div className="space-y-3">
                            {[
                              { device: "iPhone 14 Pro", location: "New York, NY", current: true },
                              { device: "MacBook Pro", location: "New York, NY", current: false },
                              { device: "Chrome Browser", location: "Los Angeles, CA", current: false },
                            ].map((session, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg animate-slideUp"
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">{session.device}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{session.location}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                  {session.current && (
                                    <span className="bg-[#52b788]/10 text-[#52b788] text-xs px-2 py-1 rounded-full font-medium">
                                      Current
                                    </span>
                                  )}
                                  {!session.current && (
                                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">End</button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Account Tab */}
                  {activeTab === "account" && (
                    <div className="p-8 animate-fadeIn">
                      <div className="mb-12">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.account}</h2>
                        <p className="text-gray-500 dark:text-gray-400">Manage your account settings</p>
                      </div>

                      <div className="space-y-12">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white mb-6">Data & Privacy</h3>
                          <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-25 dark:hover:bg-gray-800/50 transition-colors animate-slideUp">
                              <div className="flex items-center space-x-3">
                                <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                <div className="text-left">
                                  <p className="font-medium text-gray-900 dark:text-white">Download Your Data</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Get a copy of all your data
                                  </p>
                                </div>
                              </div>
                            </button>

                            <button
                              className="w-full flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-25 dark:hover:bg-gray-800/50 transition-colors animate-slideUp"
                              style={{ animationDelay: "100ms" }}
                            >
                              <div className="flex items-center space-x-3">
                                <HelpCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                <div className="text-left">
                                  <p className="font-medium text-gray-900 dark:text-white">Help & Support</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Get help with your account</p>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-red-600 dark:text-red-400 mb-6">Danger Zone</h3>
                          <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-4 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-25 dark:hover:bg-orange-900/10 transition-colors animate-slideUp">
                              <div className="flex items-center space-x-3">
                                <Eye className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                <div className="text-left">
                                  <p className="font-medium text-orange-900 dark:text-orange-100">Deactivate Account</p>
                                  <p className="text-sm text-orange-700 dark:text-orange-300">
                                    Temporarily disable your account
                                  </p>
                                </div>
                              </div>
                            </button>

                            <button
                              onClick={handleDeleteAccount}
                              className="w-full flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-25 dark:hover:bg-red-900/10 transition-colors animate-slideUp"
                              style={{ animationDelay: "100ms" }}
                            >
                              <div className="flex items-center space-x-3">
                                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                <div className="text-left">
                                  <p className="font-medium text-red-900 dark:text-red-100">Delete Account</p>
                                  <p className="text-sm text-red-700 dark:text-red-300">
                                    Permanently delete your account
                                  </p>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default LightTravelSettings
