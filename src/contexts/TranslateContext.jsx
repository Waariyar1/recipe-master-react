import { createContext, useState, useEffect } from "react"

export const TranslateContext = createContext({
  isTranslateLoaded: false,
  translateRecipe: () => {}
})

export const TranslateProvider = ({ children }) => {
  const [isTranslateLoaded, setIsTranslateLoaded] = useState(false)

  // Load Google Translate script
  useEffect(() => {
    const loadGoogleTranslateScript = () => {
      if (document.getElementById("google-translate-script")) return

      const script = document.createElement("script")
      script.id = "google-translate-script"
      script.src = "https://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate"
      script.async = true
      script.onerror = () => {
        console.error("Failed to load Google Translate script.")
      }
      document.body.appendChild(script)

      // Define the callback function
      window.loadGoogleTranslate = () => {
        if (typeof window.google !== "undefined" && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "es,fr,de,zh-CN,hi",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            },
            "google_translate_element"
          )
          setIsTranslateLoaded(true)
        } else {
          console.error("Google Translate API is not loaded.")
        }
      }
    }

    loadGoogleTranslateScript()

    // Cleanup
    return () => {
      const script = document.getElementById("google-translate-script")
      if (script) {
        script.remove()
      }
      delete window.loadGoogleTranslate
    }
  }, [])

  // Function to translate recipe
  const translateRecipe = () => {
    if (!isTranslateLoaded) {
      console.error("Google Translate is not loaded yet.")
      return
    }

    const translateElement = document.getElementById("google_translate_element")
    if (!translateElement) {
      console.error("Google Translate element not found.")
      return
    }

    const combo = translateElement.querySelector(".goog-te-combo")
    if (!combo) {
      console.error("Google Translate dropdown not found.")
      return
    }

    combo.click()
  }

  return (
    <TranslateContext.Provider value={{ isTranslateLoaded, translateRecipe }}>
      {children}
    </TranslateContext.Provider>
  )
}
