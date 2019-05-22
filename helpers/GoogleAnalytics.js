import { isInStandaloneMode } from 'helpers/Envirmonment'

export const initializeGA = () => {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-60724303-7', 'auto')
  ga('send', 'pageview')

  if(isInStandaloneMode()){
    ga('send', 'event', 'start', 'PWA')
  }
  else if(window.matchMedia( '(min-width: 1012px)' ).matches){
    ga('send', 'event', 'start', 'Desktop')
  }
  else{
    ga('send', 'event', 'start', 'Mobile not PWA')
  }


  window.addEventListener('beforeinstallprompt', e => {
    ga('send', 'event', 'installPromptShowBefore')
    e.userChoice.then(choiceResult => {
      ga('send', 'event', 'installPromptShow', choiceResult.outcome)
    })
  })
}
