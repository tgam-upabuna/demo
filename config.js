PoWaSettings.promo = {
  style: "",
  template: function (data) {
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

    let template = `
    <div class="c-video__button c-video__button--play powa-shot-image powa-shot-click powa-shot-touch powa-shot-touch-background">
      <button class="c-button c-button--dark c-button--video powa-shot-play-btn powa-shot-hover powa-shot-click powa-shot-click-play" aria-label="Play Video">
        <svg class="c-button__icon" role="img" pointer-events="none" focusable="false" aria-hidden="true" role="presentation" pointer-events="none">
          <use xlink:href="/ux-pattern-library/assets/patterns/images/sprite.svg#icon-play"></use>
        </svg>
        <div>
          <span class="c-button--video__label">Play Video</span>
          <span class="c-button--video__time">${ getTime(data.videoData) }</span>
        </div>
      </button>
    </div>`;

    return template.trim();
  }
};
