PoWaSettings.promo = {
  size: "large",
  style: {},
  template: function (data) {
    function getImage (videoData) {
			let resized = videoData.additional_properties.imageResizerUrls.find(image => image && image.size && image.size === PoWaSettings.promo.size)

			return videoData.contentConfig.type === 'live' ? videoData.promoImage.image :
				resized && resized.url ? resized.url :
				videoData.promo_image.url;
		}

    function getTime (videoData) {
      if (!videoData.duration) return '';

      let duration = videoData.duration / 1000;

      let hours = Math.floor(duration / 3600);
      let minutes = Math.floor(duration / 60);
      let seconds = Math.floor(duration % 60);

      let hourDisplay = hours ? `${ hours }:` : '';
      let minuteDisplay = hours && (minutes < 10) ? `0${ minutes }:` : `${ minutes }:`;
      let secondDisplay = seconds < 10 ? `0${ seconds }` : seconds;

      return `${ hourDisplay }${ minuteDisplay }${ secondDisplay }`;
    }

    /*
     powa-shot-image
     powa-shot-touch
     powa-shot-touch-background
     */
    let template = `
    <div class="c-video--image powa-shot-image powa-shot-click-play" style="background-image: url('${ getImage(data.videoData) }')">
      <div class="c-video__button c-video__button--play">
        <button class="c-button c-button--dark c-button--video" aria-label="Play Video">
          <svg class="c-button__icon" role="img" pointer-events="none" focusable="false" aria-hidden="true" role="presentation" pointer-events="none">
            <use xlink:href="/pb/resources/assets/img/tgam-patterns/sprite.svg?token=776659#icon-play"></use>
          </svg>
          <div>
            <span class="c-button--video__label">Play Video</span>
            <span class="c-button--video__time">${ getTime(data.videoData) }</span>
          </div>
        </button>
      </div>
    </div>`;

    return template.trim();
  }
};
