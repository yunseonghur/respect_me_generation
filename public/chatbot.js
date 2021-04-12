window.addEventListener('botcopy-events', function (e) {
    switch(e.detail.type) {
    case 'bc-chip-clicked':
          if (e.detail.payload.input== 'Take me to the Community!') {
          window.location.href='https://respect-me-generation.web.app/#/communityBoard';
          }  else if (e.detail.payload.input == 'Take on a Challenge!') {
            window.location.href='https://respect-me-generation.web.app/#/';
            }
          break;
    case 'bc-link-out-clicked':
        //   sendFeedback();
          break;
    case 'bc-webview-close':
          sendFeedback();
          break;
    }
  });

  function sendFeedback() {
    Botcopy.sendText('link out clicked', false);
  }