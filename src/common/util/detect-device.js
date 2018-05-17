// Created by jobo15 2018-05-03

/**
 * Check if media queries matches particular devices.
 * Assumes that anything IE/Edge is a Desktop device
 * Assumes that anything that can hover is a desktop device (or, in case of Firefox that touch isn't enabled)
 * (Firefox will soon support hover:hover)
 *
 * - This also works for Desktops with touch screens (Except for FireFox on touchscreen Desktops)
 *
 * NOTE! This does NOT update if the screen size changes and that's by design.
 * Which means that if you're testing using an emulator you will need to reload as you change device.
 * This will not be an issue on real devices...
 *
 * @returns {{isDesktop: boolean, isTablet: boolean, isMobile: boolean}}
 */

const detectDevice = () => {
    const isDesktop = window.matchMedia(
        `all and (hover: hover),
   not all and (-moz-touch-enabled: 1),
   (-ms-high-contrast: active),
   (-ms-high-contrast: none)`
    ).matches;

    const isMobile = window.matchMedia(
        `all and (hover: none) and (max-width: 767px) and (max-height: 823px) and (orientation: portrait), 
        all and (-moz-touch-enabled: 1) and (max-width: 767px) and (max-height: 823px) and (orientation: portrait),
        all and (hover: none) and (max-width: 823px) and (orientation: landscape),
        all and (-moz-touch-enabled: 1) and (max-width: 823px) and (orientation: landscape)`
    ).matches;

    const isTablet = window.matchMedia(
        `all and (hover: none) and (min-width: 824px) and (max-width: 1366px) and (orientation: landscape),
   all and (-moz-touch-enabled: 1) and (min-width: 824px) and (max-width: 1366px) and (orientation: landscape),
   all and (hover: none) and (min-width: 600px) and (max-width: 1024px) and (orientation: portrait),
   all and (-moz-touch-enabled: 1) and (min-width: 600px) and (max-width: 1024px) and (orientation: portrait)`
    ).matches;

    return {
        isDesktop,
        isTablet,
        isMobile,
    };
};

export default detectDevice;
