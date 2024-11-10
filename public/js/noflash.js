;(function () {
  // Change these if you use something different in your hook.
  var storageKey = 'vite-ui-theme'
  var classNameDark = 'dark'
  var classNameLight = 'light'

  function setClassOnDocumentBody(darkMode) {
    document.documentElement.classList.add(darkMode ? classNameDark : classNameLight)
    document.documentElement.classList.remove(darkMode ? classNameLight : classNameDark)
  }

  var localStorageTheme = null
  try {
    localStorageTheme = localStorage.getItem(storageKey)
  } catch (err) {}
  var localStorageExists = localStorageTheme !== null

  // Determine the source of truth
  if (localStorageExists) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageTheme === 'dark')
  } else {
    // source of truth from document.body
    var isDarkMode = document.documentElement.classList.contains(classNameDark)
    localStorage.setItem(storageKey, isDarkMode ? 'dark' : 'light')
  }
})()
