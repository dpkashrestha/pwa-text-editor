const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Added an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;
  butInstall.style.visibility = 'visible';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async (event) => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }

  promptEvent.prompt();
  
  window.deferredPrompt = null;

  butInstall.setAttribute('disabled', true);
  butInstall.textContent = 'Installed!';
});

// Added an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  event.preventDefault();
  console.log('👍', 'appinstalled', event);
});


