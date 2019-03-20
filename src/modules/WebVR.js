export default {

  async isVRCompatible() {
    if('getVRDisplays' in navigator) {

      const displays = await navigator.getVRDisplays();

      return displays.length !== 0;

    } else {
      return false;
    }
  },

  setupRenderer(renderer, options) {

    renderer.vr.enabled = true;

    if ( options && options.frameOfReferenceType ) {

      renderer.vr.setFrameOfReferenceType( options.frameOfReferenceType );

    }

  },

  createButton(renderer) {

    const button = document.createElement( 'button' );
    button.style.display = 'none';
    button.style.position = 'absolute';
    button.style.bottom = '20px';
    button.style.padding = '12px 6px';
    button.style.border = '1px solid #fff';
    button.style.borderRadius = '4px';
    button.style.background = 'rgba(0,0,0,0.1)';
    button.style.color = '#fff';
    button.style.font = 'normal 13px sans-serif';
    button.style.textAlign = 'center';
    button.style.opacity = '0.5';
    button.style.outline = 'none';
    button.style.zIndex = '999';
    button.textContent = 'ENTER VR';
    button.style.cursor = 'pointer';
    button.style.left = 'calc(50% - 50px)';
    button.style.width = '100px';

    button.onmouseenter = function () { button.style.opacity = '1.0'; };
    button.onmouseleave = function () { button.style.opacity = '0.5'; };

    function enableDevice(device) {

      button.style.display = '';

      button.onclick = function () {
        device.isPresenting ? device.exitPresent() : device.requestPresent( [ { source: renderer.domElement } ] );
      };

      renderer.vr.setDevice( device );

    }
    navigator.getVRDisplays().then(displays => {

      if(displays.length === 0) return;

      enableDevice(displays[0]);

    });

    window.addEventListener( 'vrdisplayconnect', function ( event ) {

      enableDevice( event.display );

    }, false );

    window.addEventListener( 'vrdisplaydisconnect', function () {

      button.style.display = '';
      renderer.vr.setDevice( null );

    }, false );

    window.addEventListener( 'vrdisplaypresentchange', function ( event ) {

      button.textContent = event.display.isPresenting ? 'EXIT VR' : 'ENTER VR';

    }, false );

    window.addEventListener( 'vrdisplayactivate', function ( event ) {

      event.display.requestPresent( [ { source: renderer.domElement } ] );

    }, false );

    return button;

  },

};
