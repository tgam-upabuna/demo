window.adv = window.adv || {};
let mobile = /(android|iPad|iPhone|iPod)/g.test(navigator.platform) ? '_mweb' : '';
let iu = mobile ? '/58/mob.tgam.mobi/video/article' : '/58/test.theglobeandmail.com/video/article';
window.adv.gpt_goldfish = window.adv.gpt_goldfish || `//pubads.g.doubleclick.net/gampad/ads?env=vp&gdfp_req=1&impl=s&output=vast&iu=${ iu }&sz=576x324&unviewed_position_start=1&url=${ encodeURIComponent(window.location.href) }&description_url=${ encodeURIComponent(window.location.href) }&ciu_szs=300x250,300x600&cust_params=ptf%3Dbca%26pv8%3Dn%26pv7%3Dn%26pv6%3Dn%26pv5%3Dn%26pv4%3Dn%26pv3%3Dn%26pv2%3D22201103%26pv1%3Dn%26pv0%3Dn%26ekw%3Dn%26mode%3Darcvideo%26loc%3Dart%26atpc%3Dn%26adpg%3Dvideo%26pp1%3Darticle%26pp0%3Dvideo%26arena%3Dgnrl%2Cvideo%26rgdv%3Dn%26rgcg%3Dn%26asite%3Dtgam%26cp0%3Dhomepage%26ops%3Dn%26pos%3Dvideo%26kuid%3Dn%26ksg%3Dn%26mcmid%3D88796812287077565522746655136244522664&correlator=${ Date.now() }`;

PoWaSettings.promo = {
	size: 'medium',

	// it is recommended to use a hosted CSS file instead of this object
	// if this object, 'style', is defined it is applied inline to the element
	// using inline style does not support pseudo-selectors such as 'hover'
	style: {
		backgroundColor: 'black',
		zIndex: 1,
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: '0px',
		left: '0px',

		// inline style can be applied to child elements by specifying the class or id of the child
		'.powa-shot-image': {
			width: '100%',
			height: '100%',
			overflow: 'hidden',
			backgroundSize: 'cover',
			backgroundPosition: 'center'
		},

		'.powa-shot-title': {
			fontSize: 'xx-large',
			color: '#EEE',
			textShadow: '2px 2px 3px rgba(0,0,0, 0.8), -1px -1px 0 rgba(0,0,0, 0.3), 1px -1px 0 rgba(0,0,0, 0.3), -1px 1px 0 rgba(0,0,0, 0.3), 1px 1px 0 rgba(0,0,0, 0.3)',
			position: 'absolute',
			top: '30px',
			left: '30px'
		},

		'.powa-shot-play-btn': {
			cursor: 'pointer',
			fontSize: 'xx-large',
			color: '#EEE',
			padding: '20px 25px',
			backgroundClip: 'padding-box',
			border: '3px solid rgba(255,255,255, 0.5)',
			borderRadius: '50%',
			backgroundColor: '#111',
			position: 'absolute',
			top: 'calc(50% - 20px)',
			left: 'calc(50% - 25px)'
		},

		'.powa-shot-duration': {
			fontSize: 'x-large',
			color: '#EEE',
			textShadow: '2px 2px 3px rgba(0,0,0, 0.8), -1px -1px 0 rgba(0,0,0, 0.3), 1px -1px 0 rgba(0,0,0, 0.3), -1px 1px 0 rgba(0,0,0, 0.3), 1px 1px 0 rgba(0,0,0, 0.3)',
			position: 'absolute',
			bottom: '30px',
			left: '30px'
		}
	},

	// receives 'data' object...
	// data = {
	//     image: <url>,
	//     title: <string>,
	//     videoData: <video JSON>
	// }
	// returns string of HTML
	template: function (data) {
		function getImage (videoData) {
			let resized = videoData.additional_properties.imageResizerUrls.find(image => image && image.size && image.size === PoWaSettings.promo.size)

			return videoData.contentConfig.type === 'live' ? videoData.promoImage.image :
				resized && resized.url ? resized.url :
				videoData.promo_image.url;
		}

		function getTitle (videoData) {
			return videoData.contentConfig.type === 'live' ? videoData.contentConfig.blurb : videoData.headlines.basic;
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

		let template = `
			<div class="powa-shot-image powa-shot-click powa-shot-touch powa-shot-touch-background" style="background-image: url('${ getImage(data.videoData) }')">
				<div class="powa-shot-title powa-shot-click powa-shot-click-test">${ getTitle(data.videoData) }</div>
				<div class="powa-shot-play-btn powa-shot-hover powa-shot-click powa-shot-click-play">â–¶</div>
				<div class="powa-shot-duration powa-shot-hover powa-shot-hover-duration">${ getTime(data.videoData) }</div>
			</div>`;

		return template.trim();
	}
};
